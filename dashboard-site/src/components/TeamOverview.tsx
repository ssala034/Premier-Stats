import React from "react";
import "./TeamOverview.css";

const TeamOverview = ({ teamName, language }: { teamName: string; language: string }) => {
  const standingName = language === 'EN' ? 'Standing' : 'Classement';
  const winsName = language === 'EN' ? 'Wins' : 'Victoires';
  const lossesName = language === 'EN' ? 'Losses' : 'Pertes';
  const totalPLWinsName = language === 'EN' ? 'Total PL Cups' : 'Total de coupes PL';

  const teamHistory = require(`../data/${teamName}/history.json`);
  const { currentStanding, wins, losses, totalPLWins } = teamHistory;
  const teamLogo = require(`../data/${teamName}/${teamName}.png`);

  const dynamicFontSize = teamName.length >= 15 ? "1.2rem" : "1.6rem"; 

  const languageSize = language === 'EN' ? '1rem' : '0.7rem';

  return (
    <div className="team-overview-container">
      <div className="team-left">
        <img src={teamLogo} alt="Liverpool Logo" className="team-logo" />
        <h2 className="team-name" style={{ fontSize: dynamicFontSize }}>{teamName}</h2>
      </div>

      <div className="team-stat-block">
        <div className="stat-label-row" style={{ fontSize: languageSize }}>
          <span>{standingName}</span>
          <span>{winsName}</span>
          <span>{lossesName}</span>
          <span>{totalPLWinsName}</span>
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
