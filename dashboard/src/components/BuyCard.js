// BuyCard.js
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./BuyCard.css";
import { BuyContext } from "./GeneralContext.js";
import { useContext } from "react";
import { useState } from "react";
import axios from 'axios';

const BuyCard = ({uid}) => {
    const {buy,ToggleBuyCard,closeBuyCard} = useContext(BuyContext);
    const [stockQuantity,setStockQuantity] =  useState(1);
    const [stockPrice,setStockPrice] = useState(0.0);

    const handleBuyClick = ()=>{
        console.log("UID being sent:", uid);
        axios.post('http://localhost:3002/newOrder',{
            name : uid,
            qty : stockQuantity,
            price : stockPrice,
            mode : "BUY" //buy or sell
        });
        
    }

  return (
    <div className="buy-card">
      <div className="input-group">
        <TextField
          label="Qty."
          variant="outlined"
          fullWidth
          type="number"
          onChange={(e)=>{setStockQuantity(e.target.value)}}
          value={stockQuantity}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          onChange={(e)=>{setStockPrice(e.target.value)}}
          value={stockPrice}
        />
      </div>

      <p className="margin-text">Margin required ₹140.65</p>

      <div className="button-group">
        <Button variant="contained" color="primary" onClick={() => {handleBuyClick();
                                                                        closeBuyCard();
                                                                    }}>Buy</Button>
        <Button variant="contained" color="inherit" onClick={closeBuyCard}>Cancel</Button>
      </div>
    </div>
  );
};

export default BuyCard;
