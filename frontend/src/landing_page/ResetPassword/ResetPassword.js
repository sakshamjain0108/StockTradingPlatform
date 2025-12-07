import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  // Get the token from the URL
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      return handleError("Please enter a new password.");
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3002/reset-password",
        { token, newPassword },
        { withCredentials: true }
      );

      if (data.success) {
        handleSuccess("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(data.message || "An error occurred");
      }
    } catch (error) {
      console.log(error);
      handleError("Token is invalid or expired.");
    }
  };

  return (
    <div className="form_container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            value={newPassword}
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;