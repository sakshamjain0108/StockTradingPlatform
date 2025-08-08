import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps.js";
import Funds from "./Funds.js";
import Holdings from "./Holdings.js";

import Orders from "./Orders.js";
import Positions from "./Positions.js";
import Summary from "./Summary.js";
import WatchList from "./WatchList.js";

// Dashboard.js
import GeneralContext from './GeneralContext.js';

const Dashboard = () => {
  return (
    <GeneralContext> {/* ✅ wrap the whole tree that needs context */}
      <div className="dashboard-container">
        <WatchList />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/buyStock" />
          </Routes>
        </div>
      </div>
    </GeneralContext>
  );
};



export default Dashboard;