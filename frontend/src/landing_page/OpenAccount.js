import React from 'react';
import './OpenAccount.css';

function OpenAccount() {
    return ( 
        <div /*className='container text-center p-5'*/>
            <div className={'hero openAccount' /*row*/}>
               
               <h4 className='head-hero-openAccount' /*'mt-5'*/>Open a Zerodha account</h4>
               <p className='para-hero-openAccount'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
               <button /*style={{width:"16%" , margin:"0 auto", borderRadius:"5px",opacity:"0.9"}}*/ className='signup-hero-home' /*'px-3 py-1.5 btn btn-primary fs-5'*/>Sign up for free</button>
            </div>
        </div>
     );
}

export default OpenAccount;