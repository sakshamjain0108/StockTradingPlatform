import React, { createContext, useState, useEffect, useContext } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [userSymbols, setUserSymbols] = useState([]);

  // Function to fetch (or refetch) the user's watchlist
  const fetchUserWatchlist = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/watchlist", {
        credentials: "include",
      });
      if (response.ok) {
        const symbols = await response.json();
        setUserSymbols(symbols);
      }
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  // Fetch the watchlist when the provider first loads
  useEffect(() => {
    fetchUserWatchlist();
  }, []);

  return (
    <WatchlistContext.Provider value={{ userSymbols, refetchWatchlist: fetchUserWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);