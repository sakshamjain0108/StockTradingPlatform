// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\TopBar.js

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Menu from "./Menu.js";

// Helper function to process the index data
const processIndexData = (data) => {
  if (!data) {
    return { lastPrice: "0.00", change: "0.00", percent: "0.00", isUp: true };
  }
  const change = (data.lastPrice - data.prevClose).toFixed(2);
  const percent = data.prevClose ? ((change / data.prevClose) * 100).toFixed(2) : 0;
  const isUp = change >= 0;
  return {
    lastPrice: data.lastPrice.toFixed(2),
    change: change,
    percent: percent,
    isUp: isUp,
  };
};

const TopBar = () => {
  // Add state to hold index data
  const [indices, setIndices] = useState({
    nifty: { lastPrice: "0.00", change: "0.00", percent: "0.00", isUp: true },
    sensex: { lastPrice: "0.00", change: "0.00", percent: "0.00", isUp: true },
  });

  // Connect to socket
  useEffect(() => {
    const socket = io("http://localhost:3002");

    // Listen for 'stockUpdates'
    socket.on('stockUpdates', (liveData) => {
      const niftyData = liveData.find(s => s.symbol === "NIFTY 50");
      const sensexData = liveData.find(s => s.symbol === "SENSEX");

      setIndices({
        nifty: processIndexData(niftyData),
        sensex: processIndexData(sensexData),
      });
    });

    // Disconnect on unmount
    return () => socket.disconnect();
  }, []); // Runs once on mount

  const { nifty, sensex } = indices;
  const niftyColor = nifty.isUp ? "profit" : "loss";
  const sensexColor = sensex.isUp ? "profit" : "loss";

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          {/* Use dynamic data */}
          <p className={`index-points ${niftyColor}`}>{nifty.lastPrice}</p>
          <p className={`percent ${niftyColor}`}>
            {nifty.change} ({nifty.percent}%)
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          {/* Use dynamic data */}
          <p className={`index-points ${sensexColor}`}>{sensex.lastPrice}</p>
          <p className={`percent ${sensexColor}`}>
            {sensex.change} ({sensex.percent}%)
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;