import React, { useState } from "react";
import "./TeamStats.css";
import PlayerComparisonChart from "../components/PlayerComparisonChart";
import TeamRadarChart from "../components/TeamRadarChart";
import { Card, CardHeader, CardContent } from "../components/card";
import TeamOverview from "../components/TeamOverview";

const TeamStats = () => {
  const teamName = "Liverpool";
  const years = [2020, 2021, 2022, 2023, 2024];
  const [selectedYear, setSelectedYear] = useState(2020);

  return (
    <div className="team-stats-dashboard">
      <div className="main-layout">
        {/* LEFT COLUMN */}
        <div className="left-column">
          <div className="top-row">
            <Card className="empty-card">
              <CardHeader>
                <TeamOverview />
              </CardHeader>
            </Card>
          </div>
          <div className="main-graph">
            <PlayerComparisonChart />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <Card className="team-info-card">
          <CardHeader>
            <h2 className="team-info-title">{teamName} Team Info</h2>
            <div className="year-selector">
              <label htmlFor="year-select">Year:</label>
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
            <TeamRadarChart team={teamName} year={selectedYear} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamStats;
