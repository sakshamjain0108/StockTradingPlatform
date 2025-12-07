// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\backend\Routes\TicketRoute.js

import express from "express";
import { CreateTicket } from "../Controllers/TicketController.js";
// 1. We no longer need userVerification for this
// import { userVerification } from "../Middlewares/AuthMiddleWare.js"; 

const router = express.Router();

// 2. REMOVED 'userVerification' from the route
router.post("/create", CreateTicket);

export default router;