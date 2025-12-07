// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\about\TeamMember.js

import { useState } from "react";

function TeamMember({ imgLink, naam, position, desc }) {
  let [arrow, changeArrow] = useState(false);

  let ToggleArrow = () => {
    changeArrow(!arrow);
  };
  return (
    <div className="team-member-card">
      <img
        src={`Media/${imgLink}`}
        alt={naam}
        className="team-member-image"
      />
      <h1 className="team-member-name">{naam}</h1>
      <h2 className="team-member-position">{position}</h2>

      {/* This is the main container for the toggle */}
      <div className="bio-toggle" onClick={ToggleArrow}>
        
        {/* This new div will align "Bio" and the arrow */}
        <div className="bio-toggle-header">
          <p>Bio</p>
          {!arrow ? (
            <i class="fa-solid fa-angle-down"></i>
          ) : (
            <i class="fa-solid fa-angle-up"></i>
          )}
        </div>

        {/* The content appears below only when toggled */}
        {arrow && <p className="bio-content">{desc}</p>}

      </div>
    </div>
  );
}

export default TeamMember;