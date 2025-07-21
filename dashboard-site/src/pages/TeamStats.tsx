import React, { useState, useEffect } from "react";
import "./TeamStats.css";
import PlayerComparisonChart from "../components/PlayerComparisonChart";
import TeamRadarChart from "../components/TeamRadarChart";
import { Card, CardHeader, CardContent } from "../components/card";
import TeamOverview from "../components/TeamOverview";
import { useLocation, Link } from "react-router-dom";

interface TeamStatsProps {
  language: string;
}

const TeamStats = ({ language }: TeamStatsProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamName = queryParams.get("team") || "Liverpool"; 
  const years = [2020, 2021, 2022, 2023, 2024];
  const [selectedYear, setSelectedYear] = useState(2020);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setShowButton(scrollPosition >= pageHeight - 150); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teamInfo = language === 'EN' ? `${teamName} Team Info` : `Info sur équipe ${teamName}`;

  const seasonTitle = language === 'EN' ? 'Select a Season:' : 'Choisir une saison:';

  const selectButton = language === 'EN' ? 'Select Another Team' : 'Choisi une autre équipe';

  return (
    <div className="team-stats-dashboard">
      <div className="main-layout">
        {/* LEFT COLUMN */}
        <div className="left-column">
          <div className="top-row">
            <Card className="empty-card">
              <CardHeader>
                <TeamOverview language={language} teamName={teamName} />
              </CardHeader>
            </Card>
          </div>
          <div className="main-graph">
            <PlayerComparisonChart language={language} teamName={teamName} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <Card className="team-info-card">
          <CardHeader>
            <h2 className="team-info-title">{teamInfo}</h2>
            <div className="year-selector">
              <label htmlFor="year-select">{seasonTitle}</label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}-{y + 1}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <TeamRadarChart language={language} teamName={teamName} team={teamName} year={selectedYear} />
          </CardContent>
        </Card>
      </div>

      {/* Button to navigate to team selection */}
      {showButton && (
        <Link to="/selection" className="team-selection-button">
          {selectButton}
        </Link>
      )}
    </div>
  );
};

export default TeamStats;
