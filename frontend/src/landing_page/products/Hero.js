// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\products\Hero.js

import React from 'react';
// Make sure to import a CSS file if you create one
// import "./Hero.css"; 

function Hero(){
    return(
        <div className="products-hero-container">
            <h1>Zerodha Products</h1>
            <h2>Sleek, modern, and intuitive trading platforms</h2>
            <p className="hero-links">
              Check out our <a href="">investment offerings <i class="fa-solid fa-arrow-right"></i></a>
            </p>
            <hr />
        </div>
    )
}

export default Hero;