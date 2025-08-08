import React from "react";
import { Link } from "react-router-dom";
import { BuyContext } from "./GeneralContext.js";
import BuyCard from "./BuyCard.js";
import { useContext } from "react";

const Orders = () => {
  const {buy,ToggleBuyCard} = useContext(BuyContext);
  return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Orders;