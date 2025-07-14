import React from "react";
import "./TeamStats.css";
import PlayerComparisonChart from "../components/PlayerComparisonChart";
import TeamRadarChart from "../components/TeamRadarChart";
import { Card, CardHeader, CardContent } from "../components/card";
import { useState } from "react";

const TeamStats = () => {
  // Static team name for now
  const teamName = "Liverpool";
  const years = [2020, 2021, 2022, 2023, 2024];
  const [selectedYear, setSelectedYear] = useState(2020);

  return (
    <div className="team-stats-dashboard">
      <div className="top-row">
        <Card className="empty-card">
          <CardHeader>
            {/* Reserved for future stats */}
          </CardHeader>
        </Card>
      </div>
      <div className="main-row">
        <div className="main-graph">
          <PlayerComparisonChart />
        </div>
        <Card className="team-info-card">
          <CardHeader>
            <h2 style={{ marginBottom: 8 }}>{teamName} Team Info</h2>
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="year-select" style={{ fontWeight: 600, marginRight: 8 }}>Year:</label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={e => setSelectedYear(Number(e.target.value))}
                style={{ padding: "4px 12px", borderRadius: 6, fontSize: 16 }}
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}-{y + 1}</option>
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