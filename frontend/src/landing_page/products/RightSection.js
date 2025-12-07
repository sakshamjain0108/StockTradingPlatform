// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\products\RightSection.js

import React from 'react';

function RightSection({rightSectionImg,heading,desc,anchor}) {
    return ( 
        <div className="product-section layout-right-image">
            <div className="product-text">
                <h1>{heading}</h1>
                <p>{desc}</p>
                <div className="product-links">
                    <a href="">{anchor} <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
            <div className="product-image">
                <img src={`/Media/${rightSectionImg}.png`} alt={heading} />
            </div>
        </div>
     );
}

export default RightSection;