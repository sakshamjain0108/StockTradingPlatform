// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\Dashboard.js

import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps.js";
import Funds from "./Funds.js";
import Holdings from "./Holdings.js";
import Orders from "./Orders.js";
import Positions from "./Positions.js";
import Summary from "./Summary.js";
import WatchList from "./WatchList.js";
import Market from "./Market.js";
import BuyCard from "./BuyCard.js";
import SellCard from "./SellCard.js"; // 👈 1. IMPORT SELLCARD

// Import all context providers
// GeneralContext is removed from here and placed in Home.js
import { BuyContext } from './GeneralContext.js';
import { PortfolioProvider } from './PortfolioContext.js';
import { WatchlistProvider } from './WatchlistContext.js';
import { FundsProvider } from './FundsContext.js';

// A new component to manage the layout
// This allows us to use the BuyContext
const DashboardLayout = () => {
  // 👇 2. GET 'sell' FROM CONTEXT
  const { buy, sell, UID } = useContext(BuyContext); // For Buy/Sell Card state

  return (
    <div className="dashboard-container">
      {/* WatchList is now inside all providers */}
      <WatchList />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
{/*           <Route path="/apps" element={<Apps />} /> */}
          <Route path="/market" element={<Market />} />
        </Routes>
      </div>
      {/* Render BuyCard here, ensuring it's inside all contexts */}
      {buy && <BuyCard uid={UID} />}
      {/* 👇 3. RENDER SELLCARD */}
      {sell && <SellCard uid={UID} />}
    </div>
  );
}

// The Dashboard component now wraps all providers
const Dashboard = () => {
  return (
    // GeneralContext was moved to Home.js
    <WatchlistProvider>
      <PortfolioProvider>
        <FundsProvider>
          <DashboardLayout />
        </FundsProvider>
      </PortfolioProvider>
    </WatchlistProvider>
  );
};


export default Dashboard;