// In Controllers/AuthController.js

import User from "../Models/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const Signup = async (req, res, next) => { // 'next' can be removed from here too if not used
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,   // 👈 Set to true for security
      secure: true,     // 👈 Add for cross-origin
      sameSite: "none", // 👈 Add for cross-origin
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    
    // ❌ REMOVE THIS LINE
    // next(); 

  } catch (error) {
    console.error(error);
    // It's also good practice to send an error response here
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
      httpOnly: true,   // 👈 Set to true for security
      secure: true,     // 👈 Add for cross-origin
      sameSite: "none", // 👈 Add for cross-origin
    });
     res.status(201).json({ message: "User logged in successfully", success: true });
    //  next()
  } catch (error) {
    console.error(error);
  }
}

export const userStatus = (req, res) => {
  // The middleware has already verified the user and attached the username.
  // Now we just send the success response.
  res.json({ status: true, user: req.user.username });
};


export const Logout = (req, res) => {
  // To log out, we clear the cookie
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0), // Set the expiry date to the past
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};


// 1. FORGOT PASSWORD: Generate a 10-minute token
export const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // We send a generic message for security
      return res.json({ status: false, message: "User not found" });
    }

    // Create a temporary token valid for 10 minutes
    const resetToken = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "10m",
    });

    // Send the token back to the frontend
    res.json({
      success: true,
      message: "Token generated",
      resetToken: resetToken,
    });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 2. RESET PASSWORD: Verify token and update password
export const ResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // 1. Verify the token
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        // Token is invalid or expired
        return res
          .status(401)
          .json({ success: false, message: "Token is invalid or expired." });
      }

      // 2. Token is valid, find the user
      const user = await User.findById(data.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      // 3. Update the password
      // The pre("save") hook in UserModel.js will automatically hash it
      user.password = newPassword;
      await user.save();

      res.json({ success: true, message: "Password reset successfully." });
    });
  } catch (error) {
    console.error("Reset Password error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};