import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,   // The stock symbol, e.g., "RELIANCE"
  qty: Number,
  price: Number,  // The limit price the user set
  mode: String,   // "BUY" or "SELL"
  status: {
    type: String,
    enum: ['Pending', 'Executed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export { OrdersSchema };