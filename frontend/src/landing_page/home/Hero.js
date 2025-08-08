import React from 'react';
import "./Hero.css"

function Hero() {
    return ( 
        <div /*className='container text-center p-5'*/>
            <div className={'hero' /*row*/}>
               <img src='Media/homeHero.png' alt='hero image' className={'image-hero-home' /*'mb-5'*/}/>
               <h1 className='head-hero-home' /*'mt-5'*/>Invest in everything</h1>
               <p className='para-hero-home'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
               <button /*style={{width:"16%" , margin:"0 auto", borderRadius:"5px",opacity:"0.9"}}*/ className='signup-hero-home' /*'px-3 py-1.5 btn btn-primary fs-5'*/>Sign up for free</button>
            </div>
        </div>
     );
}

export default Hero;
