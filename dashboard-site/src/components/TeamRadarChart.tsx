import React, { useMemo } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import lfc2020 from "../data/Liverpool/Liverpool 2020-2021.json";
import lfc2021 from "../data/Liverpool/Liverpool 2021-2022.json";
import lfc2022 from "../data/Liverpool/Liverpool 2022-2023.json";
import lfc2023 from "../data/Liverpool/Liverpool 2023-2024.json";
import lfc2024 from "../data/Liverpool/Liverpool 2024-2025.json";

type Player = {
  Player: string;
  Gls?: string | number;
  Ast?: string | number;
  MP?: string | number;
  Pos?: string;
  Min?: string | number;
  CrdY?: string | number;
  CrdR?: string | number;
  [key: string]: any;
};

const seasonDataMap: Record<number, any[]> = {
  2020: lfc2020 as any[],
  2021: lfc2021 as any[],
  2022: lfc2022 as any[],
  2023: lfc2023 as any[],
  2024: lfc2024 as any[],
  2025: lfc2024 as any[], // fallback for 2025
};

function map2020(data: any[]): Player[] {
  return data.map((row) => ({
    Player: row.field1,
    Gls: row.field9,
    Ast: row.field10,
    MP: row.field5,
    Pos: row.field3,
    Min: row.field6,
    CrdY: row.field11,
    CrdR: row.field12,
    ...row,
  }));
}

function getSeasonPlayers(year: number): Player[] {
  if (year === 2020) return map2020(seasonDataMap[2020]);
  return (seasonDataMap[year] as Player[]) || [];
}

interface TeamRadarChartProps {
  team: string;
  year: number;
}

const TeamRadarChart: React.FC<TeamRadarChartProps> = ({ team, year }) => {
  const players = useMemo(() => getSeasonPlayers(year), [year]);

  // passing: total assists
  const passing = players.reduce((sum, p) => sum + (Number(p.Ast) || 0), 0);
  // scoring: total goals
  const scoring = players.reduce((sum, p) => sum + (Number(p.Gls) || 0), 0);
  // defense: number of defenders
  const defense = players.filter(p => p.Pos === "DF").length;
  // depth: average minutes played
  const depth = players.length > 0 ? players.reduce((sum, p) => sum + (Number(p.Min) || 0), 0) / players.length : 0;
  // cards: total yellow + red
  const cards = players.reduce((sum, p) => sum + (Number(p.CrdY) || 0) + (Number(p.CrdR) || 0), 0);

  // Adjusted max values for better scaling based on realistic team stats
  const maxStats = {
    passing: Math.max(30, passing * 1.2), // 20% above actual for visual headroom
    scoring: Math.max(40, scoring * 1.2),
    defense: 12, // number of defenders
    depth: Math.max(1200, depth * 1.2),
    cards: Math.max(30, cards * 1.2),
  };

  // Normalize values for radar chart (0-1 scale)
  const data = [
    { stat: "Passing", value: passing / maxStats.passing },
    { stat: "Scoring", value: scoring / maxStats.scoring },
    { stat: "Defense", value: defense / maxStats.defense },
    { stat: "Depth", value: depth / maxStats.depth },
    { stat: "Cards", value: cards / maxStats.cards },
  ];

  return (
    <div style={{ width: "100%", height: 340, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" tick={{ fill: "#fff", fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
          <Radar name={team} dataKey="value" stroke="#ff6b6b" fill="#ff6b6b" fillOpacity={0.5}
            dot={true}
            isAnimationActive={true}
            animationDuration={1200}
            animationEasing="ease-out"
            />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: 12, textAlign: "center", color: "#fff", fontWeight: 600, fontSize: 18 }}>
        Passing: <span style={{ fontWeight: 600 }}>{passing}</span> &nbsp;|&nbsp;
        Scoring: <span style={{ fontWeight: 600 }}>{scoring}</span> &nbsp;|&nbsp;
        Defense: <span style={{ fontWeight: 600 }}>{defense}</span> &nbsp;|&nbsp;
        Depth: <span style={{ fontWeight: 600 }}>{depth.toFixed(0)}</span> &nbsp;|&nbsp;
        Cards: <span style={{ fontWeight: 600 }}>{cards}</span>
      </div>
    </div>
  );
};

export default TeamRadarChart;