import React, { createContext, useState, useEffect, useContext } from 'react';

const FundsContext = createContext();

export const FundsProvider = ({ children }) => {
  // Update the default state to include usedMargin
  const [funds, setFunds] = useState({ availableCash: 0, usedMargin: 0 });

  const fetchFunds = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/funds", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        // This will now receive { availableCash: ..., usedMargin: ... }
        setFunds(data.funds);
      }
    } catch (error) {
      console.error("Failed to fetch funds:", error);
    }
  };

  useEffect(() => {
    fetchFunds(); // Fetch on initial load
  }, []);

  return (
    <FundsContext.Provider value={{ funds, refetchFunds: fetchFunds }}>
      {children}
    </FundsContext.Provider>
  );
};

export const useFunds = () => useContext(FundsContext);