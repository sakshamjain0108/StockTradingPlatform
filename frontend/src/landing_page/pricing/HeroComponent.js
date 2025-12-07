// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\pricing\HeroComponent.js

import React from 'react';

function HeroComponent({imgLink,heading,desc}) {
    return ( 
        <div className="hero-card">
            <img src={`Media/${imgLink}.svg`} alt={heading} className="hero-card-img" />
            <h1 className="hero-card-heading">{heading}</h1>
            <p className="hero-card-desc">{desc}</p>
        </div>
     );
}

export default HeroComponent;