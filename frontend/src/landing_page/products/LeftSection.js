// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\products\LeftSection.js

import React from 'react';

function LeftSection({leftSectionImg,heading,desc,anchor1,anchor2, showBadges}){
    return(
        <div className="product-section layout-left-image">
            <div className="product-image">
                <img src={`/Media/${leftSectionImg}.png`} alt={heading} />
            </div>
            <div className="product-text">
                <h1>{heading}</h1>
                <p>{desc}</p>
                <div className="product-links">
                    {/* These links will only show if the prop exists */}
                    {anchor1 && <a href="">{anchor1} <i class="fa-solid fa-arrow-right"></i></a>}
                    {anchor2 && <a href="">{anchor2} <i class="fa-solid fa-arrow-right"></i></a>}
                </div>
                
                {/* This will only show if you pass showBadges={true} */}
                {showBadges && (
                    <div className="app-badges">
                        <img src="Media/googlePlayBadge.svg" alt="Google Play" />
                        <img src="Media/appStoreBadge.svg" alt="App Store" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeftSection;