import React, {useState} from "react";
import { Link } from "react-router-dom";

const Menu = () => {

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
          <li>
            <Link to={"/apps"} style={{textDecoration : "none"}} className="menu">Apps</Link>
          </li>
        </ul>
        <hr />
        <div className="profile">
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;