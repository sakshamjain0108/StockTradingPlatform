// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\GeneralContext.js

import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios'; // Import axios for the request

export const BuyContext = createContext();

export default function GeneralContext({ children }) {
  const [buy, setBuy] = useState(false);
  const [sell, setSell] = useState(false); // 👈 ADDED
  const [UID, setUID] = useState(null);
  const [username, setUsername] = useState(null); 

  // This effect runs once when the app loads
  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Your backend AuthRoute has a POST route at "/" to get user status
        const { data } = await axios.post(
          "http://localhost:3002/", 
          {}, // Send empty data
          { withCredentials: true } // Send the auth cookie
        );
        
        if (data.status) {
          setUsername(data.user); // 👈 Save the username from the backend
        }
      } catch (error) {
        console.log("User verification failed:", error);
      }
    };
    verifyUser();
  }, []); // Empty array means this runs only once on load

  const ToggleBuyCard = (uid) => {
    setUID(uid);
    setBuy(true);
    setSell(false); // Ensure sell card is closed
  };

  const closeBuyCard = () => {
    setBuy(false);
    setUID(null);
  };

  // 👇 ADDED THESE FUNCTIONS
  const ToggleSellCard = (uid) => {
    setUID(uid);
    setSell(true);
    setBuy(false); // Ensure buy card is closed
  };

  const closeSellCard = () => {
    setSell(false);
    setUID(null);
  };

  return (
    // 👇 UPDATED THE PROVIDER VALUE
    <BuyContext.Provider 
      value={{ 
        buy, 
        ToggleBuyCard, 
        closeBuyCard, 
        sell, 
        ToggleSellCard, 
        closeSellCard, 
        UID, 
        username 
      }}
    >
      {children}
    </BuyContext.Provider>
  );
}