// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\BuyCard.js

import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./BuyCard.css";
import { BuyContext } from "./GeneralContext.js";
import { useFunds } from './FundsContext.js'; // 👈 1. Import the useFunds hook
import axios from 'axios';
import { io } from "socket.io-client";

const BuyCard = ({ uid }) => {
    const { closeBuyCard } = useContext(BuyContext);
    const { funds } = useFunds(); // 👈 2. Get the user's funds

    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);
    const [livePrice, setLivePrice] = useState(0.0);

    // Connect to Socket to get real-time price
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

    // Auto-fill the input price ONCE when the live price first loads
    useEffect(() => {
        if (stockPrice === 0.0 && livePrice > 0) {
            setStockPrice(livePrice);
        }
    }, [livePrice]);

    const handlePlaceOrder = async () => {
        if (stockQuantity <= 0 || stockPrice <= 0) {
            alert("Please enter a valid quantity and price.");
            return;
        }

        // --- THIS IS THE NEW CHECK ---
        const orderCost = Number(stockQuantity) * Number(stockPrice);
        
        if (orderCost > funds.availableCash) {
            const difference = orderCost - funds.availableCash;
            alert(`Insufficient funds. You need ₹${difference.toFixed(2)} more to place this order.`);
            return; // Stop the order from being placed
        }
        // --- END OF NEW CHECK ---

        try {
            const response = await axios.post(
                'http://localhost:3002/orders/buy',
                {
                    name: uid,
                    qty: Number(stockQuantity),
                    price: Number(stockPrice),
                    mode: "BUY"
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                alert("Order placed successfully! It will execute when the price matches.");
                closeBuyCard();
            }
        } catch (error) {
            console.error("Order placement failed:", error);
            const errorMsg = error.response?.data?.message || "An error occurred.";
            alert(`Order failed: ${errorMsg}`);
            closeBuyCard();
        }
    };

    return (
        <div className="buy-card">
            <div className="buy-card-header">
                <h3>Buy {uid}</h3>
                <span className="live-price-display">
                    Live: <span style={{ color: '#4caf50' }}>₹{livePrice.toFixed(2)}</span>
                </span>
            </div>

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

            <p className="margin-text">Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</p>

            <div className="button-group">
                <Button variant="contained" color="primary" onClick={handlePlaceOrder}>Buy</Button>
                <Button variant="contained" color="inherit" onClick={closeBuyCard}>Cancel</Button>
            </div>
        </div>
    );
};

export default BuyCard;