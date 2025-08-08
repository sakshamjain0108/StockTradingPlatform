import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { holdings } from "../dashboard/src/data/data.js";
import { positions } from "../dashboard/src/data/data.js";
import { HoldingsModel } from "./model/HoldingsModel.js";
import { PositionsModel } from "./model/PositionsModel.js";
import cors from "cors";
import {OrdersModel } from "./model/OrdersModel.js";

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();


app.listen(3002,()=>{
    console.log("app started");
    mongoose.connect(uri);
    console.log("DBconnected")
});


// app.get("/addHoldings",async(req,res)=>{
//     res.send("")
// })

// holdings.forEach((items)=>{
//     let newHolding = new HoldingsModel({
//         name : items.name,
//         qty : items.qty,
//         avg : items.avg,
//         price : items.price,
//         net : items.net,
//         day : items.day,
//         isLoss : items.isLoss
//     })

//     newHolding.save()
//     .then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     });
// })


// positions.forEach((items)=>{
//     let newPosition = new PositionsModel({
//         product: items.product,
//         name: items.name,
//         qty: items.qty,
//         avg: items.avg,
//         price: items.price,
//         net: items.net,
//         day: items.day,
//         isLoss : items.isLoss
//     })

//     newPosition.save()
//     .then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     });
// })

//instead of posting above like this we can use insertMany as well

//fetch data from dashboard
app.use(cors());
app.use(express.json())
app.get("/allHoldings",async(req,res)=>{
    let allHoldings = await HoldingsModel.find({});
    // res.send(allHoldings);//ye bhi kr skte hain
    res.json(allHoldings);
})

app.get("/allPositions",async(req,res)=>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
})

app.post("/newOrder",async(req,res)=>{
    let newOrder = new OrdersModel({
        name : req.body.name,
        qty : req.body.qty,
        price : req.body.price,
        mode : req.body.mode //buy or sell
    })
    newOrder.save();
    res.send("order saved");
})