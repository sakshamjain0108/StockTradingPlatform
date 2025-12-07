import mongoose from "mongoose";

// 1. The Schema: Defines the structure of the document
const watchlistSchema = new mongoose.Schema({
  // This links the watchlist to a specific user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Creates a reference to your 'User' model
    required: true,
    unique: true, // Ensures each user can only have one watchlist document
  },
  
  // This is an array that will hold the stock symbols the user saves
  symbols: [{
    type: String, // e.g., ["RELIANCE", "TCS", "INFY"]
  }]
});

// 2. The Model: The interface for interacting with the 'watchlists' collection
const WatchlistModel = mongoose.model("Watchlist", watchlistSchema);

export { WatchlistModel };