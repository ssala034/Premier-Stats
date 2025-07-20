import React, { useMemo } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import "./TeamRadarChart.css";
import CountUp from "./Countup";

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

interface TeamRadarChartProps {
  team: string;
  year: number;
  teamName: string;
  language: string;
}

const TeamRadarChart: React.FC<TeamRadarChartProps> = ({ language, teamName, team, year }) => {
  const stats2020 = require(`../data/${teamName}/${teamName} 2020-2021.json`);
  const stats2021 = require(`../data/${teamName}/${teamName} 2021-2022.json`);
  const stats2022 = require(`../data/${teamName}/${teamName} 2022-2023.json`);
  const stats2023 = require(`../data/${teamName}/${teamName} 2023-2024.json`);
  const stats2024 = require(`../data/${teamName}/${teamName} 2024-2025.json`);

  const seasonDataMap = useMemo(() => ({
    2020: stats2020 as any[],
    2021: stats2021 as any[],
    2022: stats2022 as any[],
    2023: stats2023 as any[],
    2024: stats2024 as any[],
    2025: stats2024 as any[], // fallback for 2025
  }), [stats2020, stats2021, stats2022, stats2023, stats2024]) as Record<string, any[]>;

  const players = useMemo(() => {
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

    if (year === 2020) return map2020(seasonDataMap[2020]);
    return (seasonDataMap[year.toString()] as Player[]) || [];
  }, [year, seasonDataMap]);


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

  const passingName = language === 'EN' ? 'Passing' : 'Passes';
  const scoringName = language === 'EN' ? 'Scoring' : 'Buts';
  const defenseName = language === 'EN' ? 'Defense' : 'Défense';
  const depthName = language === 'EN' ? 'Depth' : 'Profondeur';
  const cardsName = language === 'EN' ? 'Cards' : 'Cartes';

  // Normalize values for radar chart (0-1 scale)
  const data = [
    { stat: passingName, value: passing / maxStats.passing },
    { stat: scoringName, value: scoring / maxStats.scoring },
    { stat: defenseName, value: defense / maxStats.defense },
    { stat: depthName, value: depth / maxStats.depth },
    { stat: cardsName, value: cards / maxStats.cards },
  ];

  

  return (
    <div className="radar-chart-container">
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" tick={{ fill: "#fff", fontWeight: 600 }} />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
        <Radar
          name={team}
          dataKey="value"
          stroke="#ff6b6b"
          fill="#ff6b6b"
          fillOpacity={0.5}
          dot={true}
          isAnimationActive={true}
          animationDuration={1200}
          animationEasing="ease-out"
        />
      </RadarChart>
    </ResponsiveContainer>
    <div className="radar-chart-stats">
      <div className="stat-row">
        <span className="label">{passingName}:</span>
        <span className="value">{passing} / {Math.round(maxStats.passing)}</span>
      </div>
      <div className="stat-row">
        <span className="label">{scoringName}:</span>
        <span className="value"><CountUp value ={scoring}/> / <CountUp value = {Math.round(maxStats.scoring)}/></span>
      </div>
      <div className="stat-row">
        <span className="label">{defenseName}:</span>
        <span className="value"><CountUp value = {defense}/> / <CountUp value={maxStats.defense}/></span>
      </div>
      <div className="stat-row">
        <span className="label">{depthName}:</span>
        <span className="value"><CountUp value={Number(depth.toFixed(0))} duration={1500}/> / <CountUp value={Math.round(maxStats.depth)} duration={1500}/> </span>
      </div>
      <div className="stat-row">
        <span className="label">{cardsName}:</span>
        <span className="value"><CountUp value = {cards}/> / <CountUp value = {Math.round(maxStats.cards)}/></span>
      </div>
    </div>
  </div>
  );
};

export default TeamRadarChart;