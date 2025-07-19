import React, { useState, useEffect } from "react";
import "./TeamStats.css";
import PlayerComparisonChart from "../components/PlayerComparisonChart";
import TeamRadarChart from "../components/TeamRadarChart";
import { Card, CardHeader, CardContent } from "../components/card";
import TeamOverview from "../components/TeamOverview";
import { useLocation, Link } from "react-router-dom";

const TeamStats = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamName = queryParams.get("team") || "Liverpool"; // Default to Liverpool if no team is selected
  const years = [2020, 2021, 2022, 2023, 2024];
  const [selectedYear, setSelectedYear] = useState(2020);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setShowButton(scrollPosition >= pageHeight - 100); // Show button when near the bottom
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="team-stats-dashboard">
      <div className="main-layout">
        {/* LEFT COLUMN */}
        <div className="left-column">
          <div className="top-row">
            <Card className="empty-card">
              <CardHeader>
                <TeamOverview teamName={teamName} />
              </CardHeader>
            </Card>
          </div>
          <div className="main-graph">
            <PlayerComparisonChart teamName={teamName} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <Card className="team-info-card">
          <CardHeader>
            <h2 className="team-info-title">{teamName} Team Info</h2>
            <div className="year-selector">
              <label htmlFor="year-select">Select a Season:</label>
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
            <TeamRadarChart teamName={teamName} team={teamName} year={selectedYear} />
          </CardContent>
        </Card>
      </div>

      {/* Button to navigate to team selection */}
      {showButton && (
        <Link to="/selection" className="team-selection-button">
          Select Another Team
        </Link>
      )}
    </div>
  );
};

export default TeamStats;
