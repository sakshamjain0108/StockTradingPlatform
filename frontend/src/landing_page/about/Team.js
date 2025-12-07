// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\about\Team.js

import { useState } from "react";
import TeamMember from "./TeamMember";

function Team() {
  let [arrow, changeArrow] = useState(false);

  let ToggleArrow = () => {
    changeArrow(!arrow);
  };

  return (
    // Add a container class
    <div className="team-container">
      <h1>People</h1>

      {/* Add classes for the CEO section */}
      <div className="ceo-section">
        <div className="ceo-image">
          <img src="Media/nithinKamath.jpg" alt="Nithin Kamath" />
        </div>
        <div className="ceo-bio">
          <h1>Nithin Kamath</h1>
          <h2>Founder, CEO</h2>
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p className="ceo-social-links">
            <span>Connect on </span>
            <a href="https://zerodha.com/" target="_blank" rel="noopener noreferrer" title="Homepage">Homepage</a> /
            <a href="https://tradingqna.com/" target="_blank" rel="noopener noreferrer" title="TradingQnA"> TradingQnA</a> /
            <a href="https://twitter.com/Nithin0dha" target="_blank" rel="noopener noreferrer" title="Twitter"> Twitter</a>
          </p>
        </div>
      </div>

      {/* Add a grid class for the team members */}
      <div className="team-grid">
        <TeamMember
          imgLink={"Nikhil.jpg"}
          naam={"Nikhil Kamath"}
          position={"Co-founder & CFO"}
          desc={
            "Nikhil is an astute and experienced investor, and he heads financial planning at Zerodha. An avid reader, he always appreciates a good game of chess."
          }
        />
        <TeamMember
          imgLink={"Kailash.jpg"}
          naam={"Dr. Kailash Nadh"}
          position={"CTO"}
          desc={
            "Kailash has a PhD in Artificial Intelligence & Computational Linguistics, and is the brain behind all our technology and products. He has been a developer from his adolescence and continues to write code every day."
          }
        />
        <TeamMember
          imgLink={"Venu.jpg"}
          naam={"Venu Madhav"}
          position={"COO"}
          desc={
            "Venu is the backbone of Zerodha taking care of operations and ensuring that we are compliant to rules and regulations. He has over a dozen certifications in financial markets and is also proficient in technical analysis. Workouts, cycling, and adventuring is what he does outside of Zerodha."
          }
        />
        <TeamMember
          imgLink={"Hanan.jpg"}
          naam={"Hanan Delvi"}
          position={"CCO"}
          desc={
            "We take pride in the way we support our clients, and Hanan is responsible for this with his never ending flow of energy. He is the man behind many of our support initiatives that have helped us stay ahead of the game. A free thinker, Hanan can be seen posing as one in his free time."
          }
        />
        <TeamMember
          imgLink={"Seema.jpg"}
          naam={"Seema Patil"}
          position={"Director"}
          desc={
            "Seema who has lead the quality team since the beginning of Zerodha, is now a director. She is an extremely disciplined fitness enthusiast."
          }
        />
        <TeamMember
          imgLink={"karthik.jpg"}
          naam={"Karthik Rangappa"}
          position={"Chief of Education"}
          desc={`Karthik "Guru" Rangappa single handledly wrote Varsity, Zerodha's massive educational program. He heads investor education initiatives at Zerodha and loves stock markets, classic rock, single malts, and photography.`}
        />
        <TeamMember
          imgLink={"Austin.jpg"}
          naam={"Austin Prakesh"}
          position={"Director Strategy"}
          desc={
            "Austin is a successful self-made entrepreneur from Singapore. His area of specialty revolves around helping organisations including grow by optimizing revenue streams and creating growth strategies. He is a boxing enthusiast and loves collecting exquisite watches."
          }
        />
      </div>
    </div>
  );
}
export default Team;