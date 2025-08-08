import React from 'react';
import "./Awards.css"

function Awards() {
    return ( 
        <div className='container'>
            <div className="awards row">
                <div className="col-lg-6 col-sm-12">
                    <img src="Media/largestBroker.svg" alt="" />
                </div>
                <div className="text-awards col-lg-6 col-sm-12">
                    <h1 className='head-awards fs-1'>Largest stock broker in India</h1>
                    <p className='para-awards'>2+ million Zerodha clients contribute to over 15% of all retail order 
                        volumes in India daily by trading and investing in:</p>
                    <div className="list-awards">
                        <ul>
                            <li>Futures and Options</li>
                            <li>Commodity derivatives</li>
                            <li>Currency derivatives</li>
                        </ul>
                        <ul>
                            <li>Stocks & IPOs</li>
                            <li>Direct mutual funds</li>
                            <li>Bonds and govt.</li>
                        </ul>
                    </div>
                    <img src="Media/pressLogos.png" alt="press" className='press'/>
                </div>
            </div>
        </div>
     );
}

export default Awards;