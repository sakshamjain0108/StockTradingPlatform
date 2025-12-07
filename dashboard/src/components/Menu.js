// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\dashboard\src\components\Menu.js

import React, { useContext, useState } from "react"; // 1. Import useState
import { Link } from "react-router-dom";
import { BuyContext } from "./GeneralContext.js";
import axios from "axios"; // 2. Import axios

const Menu = () => {
  const { username } = useContext(BuyContext);
  const [showLogout, setShowLogout] = useState(false); // 3. Add state

  const initials = username ? username.charAt(0).toUpperCase() : "U";
  const displayName = username ? username : "USERID";

  // 4. Create the logout handler
  const handleLogout = async () => {
    try {
      // Call the backend logout route
      await axios.post(
        "http://localhost:3002/logout",
        {},
        { withCredentials: true }
      );
      // Redirect to your frontend's login page
      // Make sure this port (5000) is correct for your 'frontend' app
      window.location.href = "http://localhost:5000/login";
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Please try again.");
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";
  
  return (
    <div className="menu-container">
      <img src="\logo.svg" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link to={"/"} style={{textDecoration : "none"}} className="menu">Dashboard</Link>
          </li>
          <li>
            <Link to="/market" style={{textDecoration : "none"}} className="menu">Market</Link>
          </li>
          <li>
            <Link to={"/orders"} style={{textDecoration : "none"}} className="menu">Orders</Link>
          </li>
          <li>
            <Link to={"/holdings"} style={{textDecoration : "none"}} className="menu">Holdings</Link>
          </li>
          <li>
            <Link to={"/positions"} style={{textDecoration : "none"}} className="menu">Positions</Link>
          </li>
          <li>
            <Link to={"/funds"} style={{textDecoration : "none"}} className="menu">Funds</Link>
          </li>
          {/* <li>
            <Link to={"/apps"} style={{textDecoration : "none"}} className="menu">Apps</Link>
          </li> */}
        </ul>
        <hr />

        {/* 5. This is the updated profile section */}
        <div className="profile-container"> {/* Wrapper for positioning */}
          <div
            className="profile"
            onClick={() => setShowLogout(!showLogout)} // Toggle menu
          >
            <div className="avatar">{initials}</div>
            <p className="username">{displayName}</p>
          </div>

          {/* 6. Conditionally render the logout button */}
          {showLogout && (
            <div className="logout-menu" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;