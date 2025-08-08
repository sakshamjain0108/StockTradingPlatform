import React from 'react';
import Hero from './Hero';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Universe from './Universe';

function ProductsPage(){
    return (
        <div>
            <Hero/>
            <div>
                <LeftSection 
                leftSectionImg={"kite"}
                heading={"Kite"}
                desc={"Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."}
                anchor1={"Try demo"}
                anchor2={"Learn more"}
            />
                <RightSection
                    rightSectionImg={"console"}
                    heading={"Console"}
                    desc={"The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."}
                    anchor={"Learn more"}
                />
                <LeftSection
                    leftSectionImg={"coin"}
                    heading={"Coin"}
                    desc={"Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."}
                    anchor1={"Coin"}
                />
                <RightSection
                    rightSectionImg={"kiteconnect"}
                    heading={"Kite Connect API"}
                    desc={"Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."}
                    anchor={"Kite Connect"}
                />
                <LeftSection
                    leftSectionImg={"varsity"}
                    heading={"Varsity mobile"}
                    desc={"An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."}
                />
            </div>
            <p>Want to know more about our technology stack? Check out the Zerodha.tech blog.</p>
            <Universe/>
        </div>
    )
}

export default ProductsPage;