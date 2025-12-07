import React, { useState, useEffect, useContext } from 'react';
import { io } from "socket.io-client";
import { BuyContext } from "./GeneralContext.js";
import { useWatchlist } from './WatchlistContext.js'; // Import the new hook

const Market = () => {
  const [allStocks, setAllStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { ToggleBuyCard } = useContext(BuyContext);
  const { refetchWatchlist } = useWatchlist(); // Get the refetch function

  useEffect(() => {
    let socket;
    const fetchAllStocks = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/stocks/all");
        if (response.ok) {
          const data = await response.json();
          setAllStocks(data);
        }
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      }
    };
    
    fetchAllStocks();
    socket = io("http://localhost:3002");

    socket.on('stockUpdates', (liveData) => {
      setAllStocks(prevStocks => {
        // Check if prevStocks is an array before mapping
        if (!Array.isArray(prevStocks) || prevStocks.length === 0) {
           return liveData.map(liveStock => {
                // Find a matching stock in the (potentially empty) previous state
                const prev = Array.isArray(prevStocks) ? prevStocks.find(s => s.symbol === liveStock.symbol) : {};
                return prev ? { ...prev, ...liveStock } : liveStock;
            });
        }
        return prevStocks.map(stock => {
          const liveUpdate = liveData.find(s => s.symbol === stock.symbol);
          return liveUpdate ? { ...stock, ...liveUpdate } : stock;
        });
      });
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const handleAddToWatchlist = async (symbol) => {
    try {
      const response = await fetch("http://localhost:3002/api/watchlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ symbol: symbol }),
      });
      if (response.ok) {
        alert(`${symbol} has been added to your watchlist!`);
        refetchWatchlist(); // Trigger the watchlist to refetch
      } else {
        const result = await response.json();
        alert(`Failed to add: ${result.message || 'Already in watchlist'}`);
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      alert("An error occurred while adding to the watchlist.");
    }
  };

  const filteredStocks = allStocks.filter(stock =>
    (stock.symbol && stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (stock.name && stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="market-container">
      <h3 className="title">Market Overview</h3>
      <input
        type="text"
        placeholder="Search e.g. INFY, Reliance, etc..."
        className="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Day's Change</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map(stock => {
              const priceChange = (stock.lastPrice - stock.prevClose).toFixed(2);
              const percentChange = stock.prevClose ? ((priceChange / stock.prevClose) * 100).toFixed(2) : 0;
              const colorClass = priceChange >= 0 ? 'profit' : 'loss';

              return (
                <tr key={stock.symbol}>
                  <td>
                    <div className={colorClass}>{stock.symbol}</div>
                    <div className="company-name">{stock.name}</div>
                  </td>
                  <td className={colorClass}>₹{stock.lastPrice?.toFixed(2)}</td>
                  <td className={colorClass}>
                    {priceChange} ({percentChange}%)
                  </td>
                  <td>
                    <button className="buy" onClick={() => ToggleBuyCard(stock.symbol)}>Buy</button>
                    <button onClick={() => handleAddToWatchlist(stock.symbol)}>
                      + Watchlist
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Market;