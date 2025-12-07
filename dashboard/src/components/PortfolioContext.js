import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from "socket.io-client";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);

  // This function fetches (or re-fetches) all portfolio data
  const fetchPortfolio = async () => {
    try {
      const [holdingsRes, positionsRes] = await Promise.all([
        fetch("http://localhost:3002/allHoldings", { credentials: "include" }),
        fetch("http://localhost:3002/allPositions", { credentials: "include" })
      ]);
      if (holdingsRes.ok) setHoldings(await holdingsRes.json());
      if (positionsRes.ok) setPositions(await positionsRes.json());
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
    }
  };

  // 1. Fetch initial data on mount
  useEffect(() => {
    fetchPortfolio();
  }, []);

  // 2. Connect to WebSocket for live price updates
  useEffect(() => {
    const socket = io("http://localhost:3002");

    socket.on('stockUpdates', (liveData) => {
      setHoldings(prevHoldings => 
        prevHoldings.map(holding => {
          const liveUpdate = liveData.find(s => s.symbol === holding.name);
          return liveUpdate ? { ...holding, price: liveUpdate.lastPrice } : holding;
        })
      );
      setPositions(prevPositions =>
        prevPositions.map(position => {
          const liveUpdate = liveData.find(s => s.symbol === position.name);
          return liveUpdate ? { ...position, price: liveUpdate.lastPrice } : position;
        })
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <PortfolioContext.Provider value={{ holdings, positions, refetchPortfolio: fetchPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);