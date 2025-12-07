// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\products\Universe.js

import UniverseImages from "./UniverseImages";

function Universe() {
    return ( 
        <div className="universe-container">
            <h1>The Zerodha Universe</h1>
            <p>Extend your trading and investment experience even further with our partner platforms</p>
            <div className="universe-grid">
                <UniverseImages 
                    imgLink={"zerodhaFundhouse.png"} 
                    alternate={"zerodhaFundhouse"} 
                    desc={"Our asset management venture that is creating simple and transparent index funds to help you save for your goals."}
                />
                <UniverseImages 
                    imgLink={"sensibullLogo.svg"} 
              alternate={"sensibullLogo"} 
                    desc={"Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more."}
                />
                <UniverseImages 
                    imgLink={"tijori.svg"} 
            	       alternate={"tijori"} 
                  	 desc={"Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more."}
      	         />
  	             <UniverseImages 
    	               imgLink={"streakLogo.png"} 
      	             alternate={"streakLogo"} 
      	             desc={"Systematic trading platform that allows you to create and backtest strategies without coding."}
      	         />
      	         <UniverseImages 
        	           imgLink={"smallcaseLogo.png"} 
        	           alternate={"smallcaseLogo"} 
        	           desc={"Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs."}
        	       />
        	       <UniverseImages 
          	         imgLink={"dittoLogo.png"} 
          	         alternate={"dittoLogo"} 
          	       s desc={"Personalized advice on life and health insurance. No spam and no mis-selling."}
          	     />
    	       </div>
      	     <button className='signup-hero-home'>Sign up for free</button>
        </div>
     );
}

export default Universe;