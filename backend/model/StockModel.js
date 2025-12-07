import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  // Core Identifiers
  symbol: { type: String, required: true, unique: true, uppercase: true, trim: true }, // e.g., "RELIANCE"
  name: { type: String, required: true }, // e.g., "Reliance Industries Ltd"
  exchange: { type: String, required: true, enum: ['NSE', 'BSE'] }, // National Stock Exchange or Bombay Stock Exchange
  
  // Market Data (can be updated by a separate process)
  lastPrice: { type: Number, default: 0 },
  prevClose: { type: Number, default: 0 },
  dayHigh: { type: Number, default: 0 },
  dayLow: { type: Number, default: 0 },
  yearHigh: { type: Number, default: 0 },
  yearLow: { type: Number, default: 0 },

  // Company Information
  industry: { type: String, default: "N/A" },
  marketCap: { type: Number, default: 0 }, // In Crores
});

const StockModel = mongoose.model("Stock", stockSchema);

export { StockModel };