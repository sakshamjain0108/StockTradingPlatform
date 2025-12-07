import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  // 👇 ADD THIS FIELD
  availableCash: {
    type: Number,
    default: 10000, // Give every new user 10,000 to start
  },
  usedMargin: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// This is your NEW code
userSchema.pre("save", async function () {
  // 👇 ADD THIS CHECK
  if (!this.isModified("password")) {
    return; // If the password wasn't changed, don't re-hash it
  }
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model("User", userSchema);