import User from "../Models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


export const userVerification = (req, res,next) => {
  const token = req.cookies.token
  if (!token) {
    // Use a proper 401 Unauthorized status code
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.status(401).json({ status: false, message: "Unauthorized: Invalid Token" });
    } else {
      const user = await User.findById(data.id)
      if (user) {
        req.user = user; // Optionally attach user info to the request
        next();                       // ✅ SUCCESS! Proceed to the protected route.
      } else {
        return res.status(401).json({ status: false, message: "User not found" });
      }
    }
  })
}