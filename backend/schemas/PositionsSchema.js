import mongoose from "mongoose";

const PositionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number, // This will be the Last Traded Price (LTP)
    net: String,
    day: String,
    isLoss: Boolean
}); 

export { PositionsSchema };