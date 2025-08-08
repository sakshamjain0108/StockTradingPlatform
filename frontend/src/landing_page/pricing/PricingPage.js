import React from 'react';
import Hero from './Hero';
import EquityTable from './EquityTable';
import CommodityTable from './CommodityTable';
import CurrencyTable from './CurrencyTable';
import TableTab from './TableTab';
import ChargesExplained from './ChargesExplained';
import ChargesForAccountOpening from './ChargesForAccountOpening';
import ChargesForOptionValueAddedServices from './ChargesForOptionValueAddedServices';

function PricingPage(){
    return (
        <div>
            <Hero/>
            <TableTab/>
            <EquityTable/>
            <CurrencyTable/>
            <CommodityTable/>
            <h3><a href="">Calculate your costs upfront</a> using our brokerage calculator</h3>
            <ChargesExplained/>
            <ChargesForAccountOpening/>
            <ChargesForOptionValueAddedServices/>
        </div>
    )
}

export default PricingPage;