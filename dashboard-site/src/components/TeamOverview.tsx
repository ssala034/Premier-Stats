import React from "react";
import "./TeamOverview.css";

const TeamOverview = ({ teamName }: {teamName: string}) => {
  const teamHistory = require(`../data/${teamName}/history.json`);
  const { currentStanding, wins, losses, totalPLWins } = teamHistory;
  const teamLogo = require(`../data/${teamName}/${teamName}.png`);

  const dynamicFontSize = teamName.length >= 15 ? "1.2rem" : "1.6rem"; 

  return (
    <div className="team-overview-container">
      <div className="team-left">
        <img src={teamLogo} alt="Liverpool Logo" className="team-logo" />
        <h2 className="team-name" style={{ fontSize: dynamicFontSize }}>{teamName}</h2>
      </div>

      <div className="team-stat-block">
        <div className="stat-label-row">
          <span>Standing</span>
          <span>Wins</span>
          <span>Losses</span>
          <span>Total PL Cups</span>
        </div>
        <div className="stat-value-row">
          <span>{currentStanding}</span>
          <span>{wins}</span>
          <span>{losses}</span>
          <span>{totalPLWins}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;
