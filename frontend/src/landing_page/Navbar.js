// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\Navbar.js

import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink

function Navbar() {
    let [menuOpen,setMenuOpen] = useState(false);
    function toggleMenu(){
        setMenuOpen(!menuOpen);
    };
    return ( 
        <div className="navbar">
            <div className="logo-navbar">
                {/* The logo can stay a normal Link */}
                <Link to="/"><img src="media/logo.svg" alt="zerodha" /></Link>
            </div>
            <div className="options-navbar">
                {/* Change all <Link> to <NavLink> and update the className */}
                <NavLink className={({ isActive }) => isActive ? "options active" : "options"} to="/signup">Signup</NavLink>
                <NavLink className={({ isActive }) => isActive ? "options active" : "options"} to="/about">About</NavLink>
                <NavLink className={({ isActive }) => isActive ? "options active" : "options"} to="/products">Products</NavLink>
                <NavLink className={({ isActive }) => isActive ? "options active" : "options"} to="/pricing">Pricing</NavLink>
                <NavLink className={({ isActive }) => isActive ? "options active" : "options"} to="/support">Support</NavLink>
                <i class="fa-solid fa-bars" onClick={toggleMenu}></i>
            </div>
            {menuOpen && 
            <div className='hamBurger-menu'>
                <div className='apps'>
                    <div className='app'>
                        <img src="Media/kite-logo.svg" alt="kite" />
                        <h6>Kite</h6>
                        <p>Trading platform</p>
                    </div>
                    <div className='app'>
                        <img src="Media/console.svg" alt="console-logo" />
                        <h6>Console</h6>
                        <p>Trading platform</p>
                    </div>
                    <div className='app'>
                        <img src="Media/kite-connect.svg" alt="kite-connect" />
                        <h6>Kite Connect</h6>
                        <p>Trading APIs</p>
                    </div>
                    <div className='app'>
                        <img src="Media/coin.svg" alt="coin-logo" />
                        <h6>Coin</h6>
                        <p>Mutual funds</p>
               </div>
                </div>
      	       <div className='functions'>
    	           <div className='function'>
    	               <h4>Utilities</h4>
      	             <ul>
      	                 <li>Calculators</li>
      	                 <li>Brokerage calculator</li>
      	                 <li>Margin calculator</li>
      	                 <li>SIP calculator</li>
        	           </ul>
        	         </div>
        	         <div className='function'>
          	           <h4>Updates</h4>
          	           <ul>
          	               <li>Z-Connect blog</li>
          	               <li>Circulars / Bulletin</li>
          	               <li>IPOs</li>
          	               <li>Markets</li>
          	           </ul>
          	         </div>
        	         <div className='function function-education'>
      	               <h4>Education</h4>
      	               <div>
        	               <div>
                           <img src="Media/varsity-logo.png" alt="varsity" />
                                <p>Varsity</p>
                            </div>
                            <div>
                             <img src="Media/tqna.png" alt="Trading Q&A" />
                                <p>Trading Q&A</p>
                           </div>
                        </div>
                    </div>
                </div>
          </div> }
        </div>
     );
}

export default Navbar;