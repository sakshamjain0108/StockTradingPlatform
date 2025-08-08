import React,{useEffect,useState} from "react";
// import { positions } from "../data/data.js";
import { BuyContext } from "./GeneralContext.js";
import BuyCard from "./BuyCard.js";
import { useContext } from "react";

const Positions = () => {
  const {buy,ToggleBuyCard} = useContext(BuyContext);
  let [positions,setPositions] = useState([]);
  let url = "http://localhost:3002/allPositions";
  let fetchPositions = async()=>{
    let response = await fetch(url);
    let data = await response.json();
    setPositions(data);
  }

  useEffect(()=>{
    fetchPositions();
  },[]);
  return (
    <>
      <h3 className="title">Positions (2)</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positions.map((stock,index)=>{
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >=0.0;
            const profitClass = isProfit ? "profit":"loss"; //to show diff colors for loss and prof
            const dayClass = stock.isLoss?"loss":"profit";//to show diff colors for loss and prof

            return(
              <tr>
                <th key={index}>{stock.product}</th>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profitClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;