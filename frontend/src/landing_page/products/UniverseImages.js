// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\products\UniverseImages.js

import React from 'react';

function UniverseImages({imgLink,alternate,desc}) {
    return ( 
        <div className="universe-item">
            <img src={`Media/${imgLink}`} alt={`${alternate}`} />
            <p>{desc}</p>
        </div> 
    );
}

export default UniverseImages;