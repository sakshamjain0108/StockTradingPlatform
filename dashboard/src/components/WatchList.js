// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\WatchList.js

import React, {useState,createContext} from "react";
import {Tooltip, Grow} from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown,KeyboardArrowUp, MoreHoriz} from "@mui/icons-material"
import BuyCard from "./BuyCard.js";
import { useContext } from "react";
import { BuyContext } from "./GeneralContext.js";

import { io } from "socket.io-client";
import { useEffect } from "react";


const WatchList = () => {
  const { buy, ToggleBuyCard ,UID} = useContext(BuyContext);
  const [userSymbols, setUserSymbols] = useState([]);
  const [liveWatchlist, setLiveWatchlist] = useState([]);
  // 1. Add state for the search term
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // ... (this useEffect remains unchanged)
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
    fetchUserWatchlist();
  }, []); 

  useEffect(() => {
    // ... (this useEffect remains unchanged)
    const socket = io("http://localhost:3002");
    
    socket.on('stockUpdates', (liveData) => {
      if (userSymbols.length > 0) {
        const filteredData = liveData.filter(stock => userSymbols.includes(stock.symbol));
        setLiveWatchlist(filteredData);
      } else {
        setLiveWatchlist([]);
      }
    });

    return () => socket.disconnect();
  }, [userSymbols]); 

  // 2. Filter the list based on the search term
  const filteredList = liveWatchlist.filter(stock =>
    (stock.symbol && stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (stock.name && stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="outer-watchlist-container">
      <div className="watchlist-container">
        <div className="search-container">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
              className="search"
              // 3. Add the onChange handler
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* 4. Use the filtered list length for the count */}
            <span className="counts"> {filteredList.length} / 50</span>
         </div>
      </div>
      <ul className="list">
        {/* 5. Map over the new 'filteredList' */}
        {filteredList.length > 0 ? (
          filteredList.map((stock) => (
            <WatchListItem stock={stock} key={stock.symbol} />
          ))
        ) : (
          <p className="empty-message">Your watchlist is empty. Add stocks from the Market tab.</p>
        )}
      </ul>
    </div>
  );
};


// ... (The WatchListItem and WatchListActions functions remain unchanged)
// ... (Make sure they are still here)

function WatchListItem({ stock }) {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const currentPrice = stock.lastPrice ?? stock.price;
  const symbol = stock.symbol || stock.name;
  const prevClose = stock.prevClose || 0;
  const isDown = currentPrice < prevClose;
  const priceChange = currentPrice - prevClose;
  const percentChange = prevClose ? ((priceChange / prevClose) * 100).toFixed(2) : 0;
  const colorClass = isDown ? "down" : "up";

  const handleMouseEnter = () => setShowWatchListActions(true);
  const handleMouseLeave = () => setShowWatchListActions(false);

  if (!symbol || currentPrice === undefined) {
    return null; 
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={colorClass}>{symbol}</p>
        <div className="item-info">
          <span className={`percent ${colorClass}`}>{percentChange}%</span>
          {isDown ? (
            <KeyboardArrowDown className="down" />
           ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{currentPrice.toFixed(2)}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={symbol} />}
    </li>
  );
}

export { WatchListItem };

function WatchListActions({uid}){
  const {buy, ToggleBuyCard, ToggleSellCard} = useContext(BuyContext);
  return(
    <span className="actions">
      <span>
        <Tooltip
         title="Buy (B)"
         placement="top"
         arrow
         TransitionComponent={Grow}>
          <button className="buy" onClick={()=>ToggleBuyCard(uid)}>B</button>
        </Tooltip>
        <Tooltip
         title="Sell (S)"
         placement="top"
         arrow
         TransitionComponent={Grow}>
          <button className="sell" onClick={() => ToggleSellCard(uid)}>S</button>
        </Tooltip>
        <Tooltip
         title="Analytics (A)"
         placement="top"
         arrow
         TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon"/>
          </button>
        </Tooltip>
        <Tooltip
         title="More (M)"
         placement="top"
         arrow
         TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon"/>
          </button>
        </Tooltip>
      </span>
    </span>
  )
}
export default WatchList;
export {BuyContext};