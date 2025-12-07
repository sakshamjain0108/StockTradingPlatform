// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\Positions.js

import React, { useContext } from "react";
import { BuyContext } from "./GeneralContext.js";
import { usePortfolio } from './PortfolioContext.js'; 

const Positions = () => {
  const { buy, ToggleBuyCard, ToggleSellCard } = useContext(BuyContext);
  const { positions } = usePortfolio(); 

  return (
    <>
      <div className="title-container">
        <h3 className="title">Positions ({positions.length})</h3>
      </div>

      <div className="order-table">
        {positions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg. (%)</th> {/* <-- Changed header */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((stock, index) => {
                const pnl = (stock.price - stock.avg) * stock.qty;
                const isProfit = pnl >= 0.0;
                const profitClass = isProfit ? "profit" : "loss";
                
                // --- THIS IS THE FIX ---
                // Calculate P&L Percentage. Avoid dividing by zero.
                const pnlPercent = stock.avg > 0 
                  ? ((stock.price - stock.avg) / stock.avg) * 100 
                  : 0;
                // --- END OF FIX ---
                
                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td className={profitClass}>{pnl.toFixed(2)}</td>
                    
                    {/* Display the new P&L Percentage */}
                    <td className={profitClass}>{pnlPercent.toFixed(2)}%</td>
                    
                    <td>
                      <button 
                        className="sell" 
                        onClick={() => ToggleSellCard(stock.name)}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="empty-message">You have no open positions today.</p>
        )}
      </div>
    </>
  );
};

export default Positions;