import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { HoldingsModel } from "./model/HoldingsModel.js";
import { PositionsModel } from "./model/PositionsModel.js";
import cors from "cors";
import { OrdersModel } from "./model/OrdersModel.js";
import { StockModel } from "./model/StockModel.js";
import { WatchlistModel } from "./model/WatchlistModel.js";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute.js";
import ticketRoute from "./Routes/TicketRoute.js"; // 1. IMPORT THE NEW ROUTE

import http from "http";
import { Server } from "socket.io";
import { userVerification } from "./Middlewares/AuthMiddleWare.js";

import User from "./Models/UserModel.js"; // Make sure UserModel is imported

const PORT = process.env.PORT || 3002;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5000"],
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", authRoute);
app.use("/api/tickets", ticketRoute); // 2. ADD THE NEW ROUTE

// --- User-Specific Data Routes ---

app.get("/allHoldings", userVerification, async (req, res) => {
    const allHoldings = await HoldingsModel.find({ userId: req.user.id });
    res.json(allHoldings);
});

app.get("/allPositions", userVerification, async (req, res) => {
    const allPositions = await PositionsModel.find({ userId: req.user.id });
    res.json(allPositions);
});

// --- NEW: Route to fetch all of a user's orders ---
// This is the updated route
app.get("/orders", userVerification, async (req, res) => {
  try {
    // The only change is adding "status: 'Pending'" to the query
    const userOrders = await OrdersModel.find({ 
      userId: req.user.id,
      status: 'Pending' // 👈 THIS IS THE FIX
    }).sort({ createdAt: -1 });
    
    res.json(userOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// --- MODIFIED: This route now PLACES a pending order ---
app.post("/orders/buy", userVerification, async (req, res) => {
  try {
    const { name, qty, price } = req.body;
    const userId = req.user.id;

    if (!name || !qty || !price || qty <= 0 || price <= 0) {
      return res.status(400).json({ success: false, message: "Invalid order details." });
    }

    // Create a new order with "Pending" status
    const newOrder = new OrdersModel({
      userId,
      name,
      qty,
      price,
      mode: "BUY",
      status: "Pending" 
    });
    await newOrder.save();

    res.status(201).json({ success: true, message: "Order placed successfully." });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ... (after /orders/buy route)

// --- NEW: This route PLACES a pending SELL order ---
// ... (inside backend/index.js)

// --- MODIFIED: This route PLACES a pending SELL order ---
app.post("/orders/sell", userVerification, async (req, res) => {
  try {
    const { name, qty, price } = req.body;
    const userId = req.user.id;

    if (!name || !qty || !price || qty <= 0 || price <= 0) {
      return res.status(400).json({ success: false, message: "Invalid order details." });
    }

    // --- THIS IS THE UPDATED CHECK ---
    // 1. Find shares in positions
    const position = await PositionsModel.findOne({ userId: userId, name: name });
    const positionQty = position ? position.qty : 0;

    // 2. Find shares in holdings
    const holding = await HoldingsModel.findOne({ userId: userId, name: name });
    const holdingQty = holding ? holding.qty : 0;

    // 3. Get total shares
    const totalAvailableQty = positionQty + holdingQty;

    // 4. Validate
    if (totalAvailableQty < qty) {
      return res.status(400).json({ 
        success: false, 
        message: `Insufficient shares. You only have ${totalAvailableQty}.` 
      });
    }
    // --- END OF UPDATED CHECK ---

    // Create a new order with "Pending" status
    const newOrder = new OrdersModel({
      userId,
      name,
      qty,
      price,
      mode: "SELL", 
      status: "Pending" 
    });
    await newOrder.save();

    res.status(201).json({ success: true, message: "Sell order placed successfully." });

  } catch (error) {
    console.error("Error placing sell order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ... (rest of index.js)

// ... (rest of the file)

// --- /api/settle route (unchanged) ---
app.post("/api/settle", userVerification, async (req, res) => {
  // ... your existing settle logic ...
});

// --- Public & Watchlist Routes (unchanged) ---
// --- Public & Watchlist Routes (unchanged) ---
app.get("/api/stocks/all", async (req, res) => {
  // ... your existing code ...
});

// 👇 REPLACE THE '/* ... */' LINE WITH THIS
app.post("/api/watchlist/add", userVerification, async (req, res) => {
  try {
    const { symbol } = req.body;
    const userId = req.user.id; // From userVerification middleware

    if (!symbol) {
      return res.status(400).json({ success: false, message: "Symbol is required" });
    }

    // Find the user's watchlist
    let watchlist = await WatchlistModel.findOne({ userId: userId });

    if (watchlist) {
      // User already has a watchlist, check if symbol exists
      if (watchlist.symbols.includes(symbol)) {
        return res.status(400).json({ success: false, message: "Symbol already in watchlist" });
      }
      // Add new symbol and save
      watchlist.symbols.push(symbol);
      await watchlist.save();
      res.json({ success: true, message: "Symbol added successfully", symbols: watchlist.symbols });
    } else {
      // No watchlist found, create a new one
      const newWatchlist = await WatchlistModel.create({
        userId: userId,
        symbols: [symbol]
      });
      res.status(201).json({ success: true, message: "Watchlist created and symbol added", symbols: newWatchlist.symbols });
    }

  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// 👇 REPLACE THE OTHER '/* ... */' LINE WITH THIS
app.get("/api/watchlist", userVerification, async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlist = await WatchlistModel.findOne({ userId: userId });

    if (!watchlist) {
      // No watchlist found, return an empty array (which is valid)
      return res.json([]);
    }

    // User has a watchlist, return just the array of symbols
    res.json(watchlist.symbols);

  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// --- Socket.IO & NEW Matching Engine ---
// ... (rest of your file) ...


// --- Socket.IO & NEW Matching Engine ---

let liveStockData = []; 

// This helper function will execute a matched order
// This helper function will execute a matched order
const executeBuyOrder = async (order) => {
  try {
    const orderCost = order.qty * order.price;

    // 1. Find the user
    const user = await User.findById(order.userId);

    // 2. 🚨 CRITICAL CHECK: Does the user have enough cash?
    if (user.availableCash < orderCost) {
      console.error(`❌ Order ${order._id} failed: Insufficient funds.`);
      order.status = "Failed"; // Mark the order as Failed
      await order.save();
      return; // Stop execution
    }

    // 3. Move the money
    user.availableCash -= orderCost;
    user.usedMargin += orderCost;
    await user.save(); // Save the user's new balance

    // 4. Mark order as executed
    order.status = "Executed";
    await order.save();

    // 5. Add to or update Positions (this logic is unchanged)
    const existingPosition = await PositionsModel.findOne({ userId: order.userId, name: order.name });

    if (existingPosition) {
      const totalQty = existingPosition.qty + order.qty;
      const newAvg = ((existingPosition.avg * existingPosition.qty) + (order.price * order.qty)) / totalQty;
      existingPosition.qty = totalQty;
      existingPosition.avg = newAvg;
      existingPosition.price = order.price; 
      await existingPosition.save();
    } else {
      await PositionsModel.create({
        userId: order.userId,
        product: "CNC",
        name: order.name,
        qty: order.qty,
        avg: order.price,
        price: order.price
      });
    }
    console.log(`✅ Order ${order._id} for ${order.name} executed at ${order.price}`);
  } catch (error) {
    console.error(`❌ Error executing order ${order._id}:`, error);
  }
};


// ... (after executeBuyOrder function)

// This helper function will execute a matched SELL order
// This helper function will execute a matched SELL order
const executeSellOrder = async (order) => {
  try {
    let qtyToSell = order.qty;
    const executionPrice = order.price;
    const orderValue = qtyToSell * executionPrice;

    // Find user's position and holding
    const existingPosition = await PositionsModel.findOne({ userId: order.userId, name: order.name });
    const existingHolding = await HoldingsModel.findOne({ userId: order.userId, name: order.name });
    const positionQty = existingPosition ? existingPosition.qty : 0;
    const holdingQty = existingHolding ? existingHolding.qty : 0;

    // Safety check
    if ((positionQty + holdingQty) < qtyToSell) {
      console.error(`❌ Order ${order._id} failed: Not enough shares at execution.`);
      order.status = "Failed"; // Mark as Failed
      await order.save();
      return;
    }

    // 1. Mark order as executed
    order.status = "Executed";
    await order.save();

    // 2. Find the user and give them their money back
    const user = await User.findById(order.userId);
    user.availableCash += orderValue; // Add sales proceeds
    user.usedMargin -= orderValue;   // Release the margin
    
    // Ensure margin never goes below zero
    if (user.usedMargin < 0) {
        user.usedMargin = 0;
    }
    await user.save();
    
    // 3. Sell from POSITIONS first
    if (existingPosition && positionQty > 0) {
      const qtyFromPosition = Math.min(qtyToSell, positionQty);
      existingPosition.qty -= qtyFromPosition;
      qtyToSell -= qtyFromPosition; 
      if (existingPosition.qty === 0) {
        await PositionsModel.findByIdAndDelete(existingPosition._id);
      } else {
        existingPosition.price = executionPrice;
        await existingPosition.save();
      }
    }

    // 4. If shares still need to be sold, sell from HOLDINGS
    if (qtyToSell > 0 && existingHolding && holdingQty > 0) {
      const qtyFromHolding = Math.min(qtyToSell, holdingQty);
      existingHolding.qty -= qtyFromHolding;
      qtyToSell -= qtyFromHolding; 
      if (existingHolding.qty === 0) {
        await HoldingsModel.findByIdAndDelete(existingHolding._id);
      } else {
        existingHolding.price = executionPrice;
        await existingHolding.save();
      }
    }

    console.log(`✅ Sell Order ${order._id} for ${order.name} executed at ${executionPrice}`);
  } catch (error) {
    console.error(`❌ Error executing sell order ${order._id}:`, error);
  }
};


// This is the new "Order Matching Engine"
const checkPendingOrders = async (liveData) => {
  try {
    // 1. Get all pending orders (both types)
    const pendingBuyOrders = await OrdersModel.find({ status: "Pending", mode: "BUY" });
    const pendingSellOrders = await OrdersModel.find({ status: "Pending", mode: "SELL" });

    if (pendingBuyOrders.length === 0 && pendingSellOrders.length === 0) return;

    // 2. Create a price map for fast lookups
    const priceMap = new Map();
    for (const stock of liveData) {
      priceMap.set(stock.symbol, stock.lastPrice);
    }

    // 3. Check each pending BUY order
    for (const order of pendingBuyOrders) {
      const livePrice = priceMap.get(order.name);
      
      // Execute if live price is AT or BELOW the user's buy price
      if (livePrice && livePrice <= order.price) { 
        await executeBuyOrder(order);
      }
    }

    // 4. Check each pending SELL order
    for (const order of pendingSellOrders) {
      const livePrice = priceMap.get(order.name);
      
      // Execute if live price is AT or ABOVE the user's sell price
      if (livePrice && livePrice >= order.price) { 
        await executeSellOrder(order); // 👈 Call the new function
      }
    }
  } catch (error) {
    console.error("❌ Error in matching engine:", error);
  }
};

// This is your main simulation loop
const initializeAndSimulate = async () => {
  try {
    const stocksFromDB = await StockModel.find({}, 'symbol name lastPrice prevClose');
    liveStockData = stocksFromDB.map(stock => stock.toObject());

    // Manually add NIFTY and SENSEX to the live data simulation
    liveStockData.push({
      symbol: "NIFTY 50",
      name: "NIFTY 50",
      lastPrice: 19500.00, // Starting price
      prevClose: 19450.00, // Yesterday's close
    });
    liveStockData.push({
      symbol: "SENSEX",
      name: "SENSEX",
      lastPrice: 65000.00, // Starting price
      prevClose: 64900.00, // Yesterday's close
    });

    console.log(`📈 Initialized simulation with ${liveStockData.length} stocks from DB.`);
  } catch (error) {
    console.error("❌ Could not initialize stock data from DB:", error);
    return;
  }
  
  // This is the main server loop
  setInterval(async () => {
    // 1. Simulate new prices
    liveStockData = liveStockData.map(stock => {
      const change = (Math.random() * 2 - 1) * (stock.lastPrice * 0.001);
      const newPrice = Math.max(0, stock.lastPrice + change);
      return { ...stock, lastPrice: parseFloat(newPrice.toFixed(2)) };
    });
    
    // 2. Broadcast new prices to all clients
    io.emit('stockUpdates', liveStockData);
    
    // 3. Check pending orders against new prices
    await checkPendingOrders(liveStockData);

  }, 2000); // Runs every 2 seconds
};

// --- Automated Daily Settlement (Unchanged) ---
const runDailySettlement = async () => {
  try {
    console.log("Settlement: 1. Finding all positions...");
    const allPositions = await PositionsModel.find({});
    if (allPositions.length === 0) {
      console.log("Settlement: 2. No positions to settle.");
      return;
    }
    console.log(`Settlement: 2. Found ${allPositions.length} positions to settle.`);

    for (const position of allPositions) {
      const existingHolding = await HoldingsModel.findOne({ userId: position.userId, name: position.name });
      if (existingHolding) {
        const totalQty = existingHolding.qty + position.qty;
        const newAvg = ((existingHolding.avg * existingHolding.qty) + (position.avg * position.qty)) / totalQty;
        existingHolding.qty = totalQty;
        existingHolding.avg = newAvg;
        await existingHolding.save();
      } else {
        await HoldingsModel.create({
          userId: position.userId, name: position.name, qty: position.qty, avg: position.avg, price: position.price,
        });
      }
      await PositionsModel.findByIdAndDelete(position._id);
    }
    console.log("Settlement: 3. All positions have been settled.");
  } catch (error) {
    console.error("❌ Error during automated settlement:", error);
  }
};


// In backend/index.js

// ... (your existing routes) ...

// --- NEW FUNDS ROUTES ---

// 1. GET route to fetch the user's current funds
app.get("/api/funds", userVerification, async (req, res) => {
  try {
    // req.user is attached by the userVerification middleware
    // 👇 NEW: Get both fields
    const { availableCash, usedMargin } = req.user; 
    // 👇 NEW: Send both fields
    res.json({ success: true, funds: { availableCash, usedMargin } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 2. POST route to add funds
app.post("/api/funds/add", userVerification, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);
    user.availableCash += Number(amount);
    await user.save();

    res.json({ success: true, newBalance: user.availableCash });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 3. POST route to withdraw funds
app.post("/api/funds/withdraw", userVerification, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);
    if (user.availableCash < amount) {
      return res.status(400).json({ success: false, message: "Insufficient funds" });
    }
    
    user.availableCash -= Number(amount);
    await user.save();

    res.json({ success: true, newBalance: user.availableCash });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


io.on('connection', (socket) => {
    console.log('🟢 A user connected');
    socket.emit('stockUpdates', liveStockData);
    socket.on('disconnect', () => {
        console.log('🔴 User disconnected');
    });
});

// --- Server Start ---
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      initializeAndSimulate();
      
      runDailySettlement(); 
      setInterval(runDailySettlement, 24 * 60 * 60 * 1000); 
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });