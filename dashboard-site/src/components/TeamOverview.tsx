import React from "react";
import "./TeamOverview.css";
import liverpoolLogo from "../data/Liverpool/Liverpool.png";

const TeamOverview = () => {
  const teamName = "Liverpool";
  const currentStanding = 2;
  const wins = 24;
  const losses = 6;
  const totalPLWins = 19;

  return (
    <div className="team-overview-container">
      <div className="team-left">
        <img src={liverpoolLogo} alt="Liverpool Logo" className="team-logo" />
        <h2 className="team-name">{teamName}</h2>
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
