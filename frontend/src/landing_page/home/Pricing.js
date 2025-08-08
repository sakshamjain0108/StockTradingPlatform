import React from 'react';
import './Pricing.css';

function Pricing() {
    return ( 
        <div className='container mt-5'>
            <div className="row pricing-home">
                <div className="col-5 text-price-home">
                    <h2 className='mb-4'>Unbeatable pricing</h2>
                    <p className='para-pricing-home'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a href="">See pricing <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="col-1"></div>
                <div className="col-6 price-table-home">
                    <div className="row">
                        <div className="col border price-box-home">
                            <h1>₹0</h1>
                            <p>Free equity delivery and direct mutual funds</p>
                        </div>
                        <div className="col border price-box-home">
                            <h1>₹20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;