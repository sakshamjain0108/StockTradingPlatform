// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\pricing\PricingPage.js

import React, { useState } from 'react'; // 1. Import useState
import Hero from './Hero';
import EquityTable from './EquityTable';
import CommodityTable from './CommodityTable';
import CurrencyTable from './CurrencyTable';
import TableTab from './TableTab';
// 2. Remove the unused imports

function PricingPage(){
    // 3. Add state to manage which tab is active
    const [activeTab, setActiveTab] = useState('equity'); // 'equity' is the default

    return (
        <div className="pricing-page-container">
            <Hero/>
            
            {/* 4. Pass the state and setter to the tabs */}
            <TableTab activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* 5. Conditionally render the tables based on state */}
            <div className="table-content-container">
                {activeTab === 'equity' && <EquityTable/>}
                {activeTab === 'currency' && <CurrencyTable/>}
                {activeTab === 'commodity' && <CommodityTable/>}
            </div>

            <h3 className="brokerage-calculator-link">
              <a href="">Calculate your costs upfront</a> using our brokerage calculator
            </h3>
            
            {/* 6. Removed the other components */}
        </div>
    )
}

export default PricingPage;