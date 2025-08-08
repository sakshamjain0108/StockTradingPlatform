import React from "react";
import { BuyContext } from "./GeneralContext.js";
import BuyCard from "./BuyCard.js";
import { useContext } from "react";

const Apps = () => {
  const {buy,ToggleBuyCard} = useContext(BuyContext);
  return (
    <div>
      <h1>Apps</h1>
    </div>
  );
};

export default Apps;