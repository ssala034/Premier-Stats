import React from "react";
import "./TeamStats.css";
import  PlayerComparisonChart  from "../components/PlayerComparisonChart";
import { Card, CardHeader, CardContent } from "../components/card";

const TeamStats = () => {
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
            <h2>Team Info</h2>
          </CardHeader>
          <CardContent>
            <p>Team details and stats will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamStats;