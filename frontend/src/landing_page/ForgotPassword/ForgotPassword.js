import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/forgot-password",
        { email },
        { withCredentials: true }
      );

      if (data.success) {
        handleSuccess("Token generated. Redirecting to reset page...");
        // Immediately redirect to the reset page with the token
        setTimeout(() => {
          navigate(`/reset-password/${data.resetToken}`);
        }, 1000);
      } else {
        handleError(data.message || "An error occurred");
      }
    } catch (error) {
      console.log(error);
      handleError("Server error. Please try again.");
    }
  };

  return (
    <div className="form_container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;