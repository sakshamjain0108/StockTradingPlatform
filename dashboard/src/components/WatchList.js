import React, {useState,createContext} from "react";
import {Tooltip, Grow} from "@mui/material";
import { watchlist } from "../data/data.js";
import { BarChartOutlined, KeyboardArrowDown,KeyboardArrowUp, MoreHoriz} from "@mui/icons-material"
import BuyCard from "./BuyCard.js";
import Summary from "./Summary.js";
import Holdings from "./Holdings.js";
import Orders from "./Orders.js";
import Positions from "./Positions.js";
import Funds from "./Funds.js";
import { useContext } from "react";
import Apps from "./Apps.js";
import GeneralContext, { BuyContext } from "./GeneralContext.js";



const WatchList = () => {
  const {buy,ToggleBuyCard,UID} = useContext(BuyContext);
  console.log(useContext(BuyContext));
  
  console.log("WatchList ki UID",UID);
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
            />
            <span className="counts"> {watchlist.length} / 50</span>
          </div>

          <ul className="list">
            {watchlist.map((stock,index)=>{
              return(
                <WatchListItem stock = {stock} key={index}/>
              )
            })}
          </ul>
        </div>
        <div>
          {buy?<BuyCard uid={UID}/>:null}
        </div>
      </div> 
  );
};

function WatchListItem({stock,index}){
  const [showWatchListActions,setShowWatchListActions] = useState(false);
  const handleMouseEnter=((e)=>{
    setShowWatchListActions(true);
  });

  const handleMouseLeave=((e)=>{
    setShowWatchListActions(false);
  })

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down":"up"}>{stock.name}</p>
        <div className="itemInfo"></div>
        <span>
          <span className="percent">{stock.percent}</span>
          {stock.isDown?(
            <KeyboardArrowDown className="down"/>):
            (<KeyboardArrowUp className="up"/>
          )}
          <span className="price">{stock.price}</span>
        </span>
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name}/>}
    </li>
  )
}

function WatchListActions({uid}){
  const {buy,ToggleBuyCard} = useContext(BuyContext);
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
         title="Sell (B)"
         placement="top"
         arrow
         TransitionComponent={Grow}>
          <button className="sell">S</button>
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