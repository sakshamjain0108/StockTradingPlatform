// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\Summary.js

import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link
import { BuyContext } from "./GeneralContext.js";
import { useFunds } from "./FundsContext.js";
import { usePortfolio } from "./PortfolioContext.js";

const Summary = () => {
  // 1. Get data from all our contexts
  const { username } = useContext(BuyContext);
  const { funds } = useFunds();
  const { holdings, positions } = usePortfolio();

  // 2. Create a helper function to format currency
  // This will format 10000 to "₹10,000.00"
  const formatToINR = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num);
  };

  // 3. Calculate Holdings data
  const totalInvestment = holdings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );
  const holdingsCurrentValue = holdings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );
  const totalHoldingsPnL = holdingsCurrentValue - totalInvestment;
  const pnlPercentage =
    totalInvestment > 0 ? (totalHoldingsPnL / totalInvestment) * 100 : 0;
  const holdingsPnlClass = totalHoldingsPnL >= 0 ? "profit" : "loss";

  // 4. Calculate Positions (Intraday) P&L
  const totalPositionsPnL = positions.reduce(
    (acc, stock) => acc + (stock.price - stock.avg) * stock.qty,
    0
  );
  const positionsPnlClass = totalPositionsPnL >= 0 ? "profit" : "loss";

  return (
    <>
      <div className="username">
        {/* Use the dynamic username */}
        <h6>Hi, {username || "User"}!</h6>
        <hr className="divider" />
      </div>

      {/* --- Equity Section --- */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>
        <div className="data">
          <div className="first">
            {/* Use dynamic funds */}
            <h3>{formatToINR(funds.availableCash)}</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>{formatToINR(0)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{formatToINR(funds.availableCash)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* --- Holdings Section --- */}
      <div className="section">
        <span>
          <Link to="/holdings" className="section-link">
            Holdings ({holdings.length})
          </Link>
        </span>
        <div className="data">
          <div className="first">
            {/* Use dynamic P&L */}
            <h3 className={holdingsPnlClass}>
              {formatToINR(totalHoldingsPnL)}{" "}
              <small>{pnlPercentage.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current Value{" "}
              <span>{formatToINR(holdingsCurrentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatToINR(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* --- NEW: Positions Section --- */}
      <div className="section">
        <span>
          <Link to="/positions" className="section-link">
            Positions ({positions.length})
          </Link>
        </span>
        <div className="data">
          <div className="first">
            {/* Use dynamic P&L */}
            <h3 className={positionsPnlClass}>
              {formatToINR(totalPositionsPnL)}
            </h3>
            <p>Today's P&L</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;