import React,{useEffect,useState,useContext} from "react";
// import { holdings } from "../data/data.js";
import { BuyContext } from "./WatchList.js";
import BuyCard from "./BuyCard.js";

const Holdings = () => {
  const {buy,ToggleBuyCard} = useContext(BuyContext);
  let [holdings,addHoldings] = useState([]);
  let url = "http://localhost:3002/allHoldings";
  const fetchHoldings = async()=>{
    let response = await fetch(url);
    let data = await response.json();
    addHoldings(data);
  }
  
  useEffect(() => {
    fetchHoldings();
  }, []);

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {holdings.map((stock,index)=>{
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >=0.0;
            const profitClass = isProfit ? "profit":"loss"; //to show diff colors for loss and prof
            const dayClass = stock.isLoss?"loss":"profit";//to show diff colors for loss and prof

            return(
              <tr>
                <th key={index}>{stock.name}</th>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue}</td>
                <td className={profitClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                <td className={profitClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            )
          })}
          {/* {for (let i = 0; i < holdings.length; i++) {
  const stock = holdings[i];
  rows.push(<tr key={i}><td>{stock.name}</td>...</tr>);
}} */}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      {/* {state?<BuyCard/>:null} */}
    </>
  );
};

export default Holdings;