// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\Funds.js

import React from "react";
import { Link } from "react-router-dom"; // Link is no longer needed for the button
import { useFunds } from "./FundsContext.js";
import axios from "axios";

const Funds = () => {
  const { funds, refetchFunds } = useFunds();

  const handleAddFunds = async () => {
    const amount = prompt("How much would you like to add?", "1000");
    if (!amount || isNaN(amount) || amount <= 0) return;

    try {
      const response = await axios.post(
        "http://localhost:3002/api/funds/add",
        { amount: Number(amount) },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert(`Successfully added ₹${amount}.`);
        refetchFunds(); // Refresh the balance
      }
    } catch (error) {
      alert(`Error: ${error.response.data.message || "Server error"}`);
    }
  };

  const handleWithdraw = async () => {
    const amount = prompt("How much would you like to withdraw?", "500");
    if (!amount || isNaN(amount) || amount <= 0) return;

    try {
      const response = await axios.post(
        "http://localhost:3002/api/funds/withdraw",
        { amount: Number(amount) },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert(`Successfully withdrew ₹${amount}.`);
        refetchFunds(); // Refresh the balance
      }
    } catch (error) {
      alert(`Error: ${error.response.data.message || "Server error"}`);
    }
  };

  // 1. Add the handler for the placeholder button
  const handleOpenAccount = () => {
    alert("This feature is not yet available.");
  };

  const totalValue = funds.availableCash + funds.usedMargin;

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green" onClick={handleAddFunds}>
          Add funds
        </button>
        <button className="btn btn-blue" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>
          <div className="table">
            <div className="data">
              <p>Available cash</p>
              <p className="imp colored">{funds.availableCash.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{funds.usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available margin</p>
              <p className="imp">{funds.availableCash.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            
            {/* 2. Change <Link> to <button> and add onClick */}
            <button className="btn btn-blue" onClick={handleOpenAccount}>
              Open Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;