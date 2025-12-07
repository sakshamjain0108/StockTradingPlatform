// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\pricing\TableTab.js

import React from 'react';

// 1. Accept activeTab and setActiveTab as props
function TableTab({ activeTab, setActiveTab }) {
    return ( 
        // 2. Use a container class and update `class` to `className`
        <ul className="table-tabs-container">
            <li className="nav-item">
                {/* 3. Add onClick and dynamic active class */}
                <button 
                    className={`nav-link ${activeTab === 'equity' ? 'active' : ''}`}
                    onClick={() => setActiveTab('equity')}
                >
                    Equity
                </button>
            </li>
            <li className="nav-item">
                <button 
                    className={`nav-link ${activeTab === 'currency' ? 'active' : ''}`}
                    onClick={() => setActiveTab('currency')}
                >
                    Currency
                </button>
            </li>
            <li className="nav-item">
                <button 
                    className={`nav-link ${activeTab === 'commodity' ? 'active' : ''}`}
                    onClick={() => setActiveTab('commodity')}
                >
                    Commodity
                </button>
            </li>
        </ul>
     );
}

export default TableTab;