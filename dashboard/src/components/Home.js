// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\Home.js

import React from "react";
import Dashboard from "./Dashboard.js";
import TopBar from "./TopBar.js";
import GeneralContext from "./GeneralContext.js"; // 👈 1. Import this

const Home = () => {
  return (
    <GeneralContext> {/* 👈 2. Wrap your components */}
      <TopBar />
      <Dashboard />
    </GeneralContext>
  );
};

export default Home;