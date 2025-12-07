// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\Holdings.js

import React,{useEffect,useState,useContext} from "react";
import { BuyContext } from "./GeneralContext.js"; 
import BuyCard from "./BuyCard.js";
import { io } from "socket.io-client";


const Holdings = () => {
  const {buy, ToggleBuyCard, ToggleSellCard} = useContext(BuyContext);
  let [holdings,addHoldings] = useState([]);
  let url = "http://localhost:3002/allHoldings";

  useEffect(() => {
    const fetchHoldings = async () => {
      let response = await fetch("http://localhost:3002/allHoldings", {
        credentials: "include",
      });
      if (response.ok) {
        let data = await response.json();
        addHoldings(data);
      }
    };
    fetchHoldings();

    const socket = io("http://localhost:3002");
    socket.on('stockUpdates', (liveData) => {
      addHoldings(prevHoldings => 
        prevHoldings.map(holding => {
          const liveUpdate = liveData.find(s => s.symbol === holding.name);
          return liveUpdate ? { ...holding, price: liveUpdate.lastPrice } : holding;
        })
      );
    });

    return () => socket.disconnect();
  }, []);
    
  // --- New Calculations ---
  const formatToINR = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const totalInvestment = holdings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );
  const currentValue = holdings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );
  const totalPnL = currentValue - totalInvestment;
  const pnlPercentage =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  
  const pnlClass = totalPnL >= 0 ? "profit" : "loss";
  
  // --- End of New Calculations ---

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        {holdings.length>0?(
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg. (%)</th> {/* <-- Changed header */}
                {/* <th>Day chg.</th> <-- REMOVED */}
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock,index)=>{
                const curValue = (stock.price * stock.qty);
                const investment = stock.avg * stock.qty;
                const pnl = curValue - investment;
                const isProfit = pnl >= 0.0;
                const profitClass = isProfit ? "profit":"loss"; 

                // --- THIS IS THE FIX ---
                const pnlPercent = investment > 0 
                  ? (pnl / investment) * 100 
                  : 0;
                // --- END OF FIX ---

                return(
                  <tr key={index}>
                    <th>{stock.name}</th>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profitClass}>{pnl.toFixed(2)}</td>

                    {/* Display the new P&L Percentage */}
                    <td className={profitClass}>{pnlPercent.toFixed(2)}%</td>
                    
                    {/* Removed the 'Day chg.' cell */}
                    
                    <td>
                      <button 
                        className="sell" 
                        onClick={() => ToggleSellCard(stock.name)}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ):<p className="empty-message">You have no holdings yet.</p>}
      </div>

      <div className="row">
        <div className="col">
          <h5>{formatToINR(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{formatToINR(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnlClass}>
            {formatToINR(totalPnL)} ({pnlPercentage.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;