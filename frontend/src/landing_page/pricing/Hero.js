import HeroComponent from "./HeroComponent";

function Hero() {
    return ( 
        <div>
            <h1>Charges</h1>
            <h3>List of all charges and taxes</h3>
            <HeroComponent 
                imgLink={"pricing0"}
                heading={"Free equity delivery"}
                desc={"All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage."}
            />
            <HeroComponent 
                imgLink={"other-trades"}
                heading={"Intraday and F&O trades"}
                desc={"Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades."}
            />
            <HeroComponent 
                imgLink={"pricing0"}
                heading={"Free direct MF"}
                desc={"All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges."}
            />
        </div>
     );
}

export default Hero;