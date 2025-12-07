// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\SellCard.js

import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./BuyCard.css"; // We can reuse the same CSS
import { BuyContext } from "./GeneralContext.js";
import axios from 'axios';
import { io } from "socket.io-client";
// 👇 Import the portfolio hook
import { usePortfolio } from './PortfolioContext.js'; 

const SellCard = ({ uid }) => {
  const { closeSellCard } = useContext(BuyContext);
  // 👇 1. Get BOTH holdings and positions from the context
  const { positions, holdings } = usePortfolio(); 

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [livePrice, setLivePrice] = useState(0.0);

  // 👇 --- THIS IS THE NEW LOGIC ---
  // Find the user's current position and holding for this stock
  const currentPosition = positions.find(p => p.name === uid);
  const currentHolding = holdings.find(h => h.name === uid);

  // Get the quantity from each, defaulting to 0
  const positionQty = currentPosition ? currentPosition.qty : 0;
  const holdingQty = currentHolding ? currentHolding.qty : 0;
  
  // The total available quantity is the sum of both
  const availableQty = positionQty + holdingQty;
  // --- END OF NEW LOGIC ---

  // Socket.io useEffect to get live price (remains the same)
  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on('stockUpdates', (liveData) => {
      const currentStock = liveData.find(s => s.symbol === uid);
      if (currentStock) {
        setLivePrice(currentStock.lastPrice);
      }
    });
    return () => socket.disconnect();
  }, [uid]);

  // Auto-fill price useEffect (remains the same)
  useEffect(() => {
    if (stockPrice === 0.0 && livePrice > 0) {
      setStockPrice(livePrice);
    }
  }, [livePrice]);

  const handlePlaceOrder = async () => {
    // 👇 2. This check now uses the correct total quantity
    if (stockQuantity > availableQty) {
      alert(`You only have ${availableQty} shares to sell.`);
      return;
    }
    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Please enter a valid quantity and price.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3002/orders/sell', 
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL" 
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Sell order placed successfully!");
        closeSellCard(); 
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      const errorMsg = error.response?.data?.message || "An error occurred.";
      alert(`Order failed: ${errorMsg}`);
      closeSellCard(); 
    }
  };

  return (
    <div className="buy-card">
      <div className="buy-card-header">
        <h3>Sell {uid}</h3>
        <span className="live-price-display">
          Live: <span style={{ color: '#4caf50' }}>₹{livePrice.toFixed(2)}</span>
        </span>
      </div>

      {/* 👇 3. This helper text now shows the correct total */}
      <p className="available-qty">Available: {availableQty} Qty</p>

      <div className="input-group">
        <TextField
          label="Qty."
          variant="outlined"
          fullWidth
          type="number"
          onChange={(e) => setStockQuantity(e.target.value)}
          value={stockQuantity}
        />
        <TextField
          label="Limit Price"
          variant="outlined"
          fullWidth
          type="number"
          onChange={(e) => setStockPrice(e.target.value)}
          value={stockPrice}
          helperText={`Market Price: ${livePrice.toFixed(2)}`} 
        />
      </div>

      <p className="margin-text">Total Value ₹{(stockQuantity * stockPrice).toFixed(2)}</p>

      <div className="button-group">
        <Button variant="contained" color="error" onClick={handlePlaceOrder}>Sell</Button>
        <Button variant="contained" color="inherit" onClick={closeSellCard}>Cancel</Button>
      </div>
    </div>
  );
};

export default SellCard;