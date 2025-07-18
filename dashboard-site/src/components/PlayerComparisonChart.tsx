
import * as React from "react";
import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PlayerDropdown from './PlayerDropdown';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./card";

import lfc2020 from "../data/Liverpool/Liverpool 2020-2021.json";
import lfc2021 from "../data/Liverpool/Liverpool 2021-2022.json";
import lfc2022 from "../data/Liverpool/Liverpool 2022-2023.json";
import lfc2023 from "../data/Liverpool/Liverpool 2023-2024.json";
import lfc2024 from "../data/Liverpool/Liverpool 2024-2025.json";


type Player = {
  Player: string;
  Gls?: string | number;
  MP?: string | number;
  [key: string]: any;
};

type SeasonData = Player[];

// Map 2020-2021 data to standard Player/Gls fields
function map2020(data: any[]): Player[] {
  return data.map((row) => ({
    Player: row.field1,
    Gls: row.field9,
    ...row,
  }));
}

const SEASONS: { label: string; value: string; data: SeasonData }[] = [
  { label: "2020-2021", value: "2020-2021", data: map2020(lfc2020 as any[]) },
  { label: "2021-2022", value: "2021-2022", data: lfc2021 as SeasonData },
  { label: "2022-2023", value: "2022-2023", data: lfc2022 as SeasonData },
  { label: "2023-2024", value: "2023-2024", data: lfc2023 as SeasonData },
  { label: "2024-2025", value: "2024-2025", data: lfc2024 as SeasonData },
];

const COLOR_A = "#ff6b6b";
const COLOR_B = "#4dabf7";


function getPlayerList(seasonData: SeasonData): Player[] {
  return seasonData.filter((p: Player) => p.Player && p.Gls !== undefined && !isNaN(Number(p.Gls)));
}


function getPlayerGoals(player: Player | undefined): number {
  if (!player || player.Gls === undefined) return 0;
  return Number(player.Gls);
}

const PlayerComparisonChart = () => {

  // Build a unique player list from all seasons, only MF or FW
  const allPlayersSet = new Set<string>();
  const playerPosMap: Record<string, string> = {};
  SEASONS.forEach(season => {
    getPlayerList(season.data).forEach(p => {
      if (p.Pos === "MF" || p.Pos === "FW") {
        allPlayersSet.add(p.Player);
        playerPosMap[p.Player] = p.Pos;
      }
    });
  });
  const allPlayers = Array.from(allPlayersSet);

  // State for player selection
  const [playerA, setPlayerA] = useState(allPlayers[0] || "");
  const [playerB, setPlayerB] = useState(allPlayers[1] || "");

  // Prepare options for PlayerDropdown, filter out the other selected player
  const playerOptionsA = allPlayers
    .filter(name => name !== playerB)
    .map(name => ({ label: name, value: name }));
  const playerOptionsB = allPlayers
    .filter(name => name !== playerA)
    .map(name => ({ label: name, value: name }));

  // Build chart data: [{ year, playerA: goals, playerB: goals }]
  const chartData = useMemo(() => {
    return SEASONS.map(season => {
      const pA = getPlayerList(season.data).find(p => p.Player === playerA);
      const pB = getPlayerList(season.data).find(p => p.Player === playerB);
      return {
        year: season.label,
        [playerA]: getPlayerGoals(pA),
        [playerB]: getPlayerGoals(pB),
      };
    });
  }, [playerA, playerB]);

  // Find max goals for y-axis domain
  const maxGoals = Math.max(
    ...chartData.map(d => Math.max(Number(d[playerA] || 0), Number(d[playerB] || 0)))
  );

  return (
    <Card className="pt-0" style={{ minHeight: 400 }}>
      <CardHeader>
        <CardTitle style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
          Player Total Goals by Season
        </CardTitle>
        <CardDescription style={{ textAlign: "center" }}>
          Select two players to compare their total goals from 2020 to 2025
        </CardDescription>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ minWidth: 220 }}>
            <span style={{ marginRight: 8, fontWeight: 600, color: COLOR_A }}>Player A:</span>
            <PlayerDropdown
              options={playerOptionsA}
              value={playerOptionsA.find(opt => opt.value === playerA)}
              onChange={opt => {
                if (opt && opt.value !== playerB) setPlayerA(opt.value);
              }}
            />
          </div>
          <div style={{ minWidth: 220 }}>
            <span style={{ marginRight: 8, fontWeight: 600, color: COLOR_B }}>Player B:</span>
            <PlayerDropdown
              options={playerOptionsB}
              value={playerOptionsB.find(opt => opt.value === playerB)}
              onChange={opt => {
                if (opt && opt.value !== playerA) setPlayerB(opt.value);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 16, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: "Total Goals", angle: -90, position: "insideLeft", fill: "#fff" }} domain={[0, Math.max(5, Math.ceil(maxGoals * 1.1))]} allowDecimals={false} />
            <Tooltip formatter={(value: any) => (typeof value === "number" ? value.toFixed(0) : value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey={playerA}
              stroke={COLOR_A}
              activeDot={{ r: 8 }}
              name={playerA}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey={playerB}
              stroke={COLOR_B}
              name={playerB}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PlayerComparisonChart;













/**
 * OLD CODE shadcn/ui
 * 
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select";
 * 
 *  <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ minWidth: 200 }}>
            <span style={{ marginRight: 8, fontWeight: 600 }}>Player A:</span>
            <Select value={playerA} onValueChange={setPlayerA}>
              <SelectTrigger className="w-[180px] rounded-lg border bg-white text-black shadow-sm">
                <SelectValue placeholder="Select Player A" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {allPlayers.map(name => (
                  <SelectItem key={name} value={name} className="rounded-lg">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div style={{ minWidth: 200 }}>
            <span style={{ marginRight: 8, fontWeight: 600 }}>Player B:</span>
            <Select value={playerB} onValueChange={setPlayerB}>
              <SelectTrigger className="w-[180px] rounded-lg border bg-white text-black shadow-sm">
                <SelectValue placeholder="Select Player B" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {allPlayers.map(name => (
                  <SelectItem key={name} value={name} className="rounded-lg">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div> 
 * 
 *  <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 24, right: 24, top: 16, bottom: 16 }}>
            <defs>
              <linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLOR} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLOR} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4dabf7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4dabf7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#333" />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              label={{ value: "Total Goals", angle: -90, position: "insideLeft", fill: "#fff" }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, Math.max(5, Math.ceil(maxGoals * 1.1))]}
              allowDecimals={false}
            />
            <Tooltip formatter={(value: any) => (typeof value === "number" ? value.toFixed(0) : value)} />
            <Area
              dataKey={playerA}
              type="monotone"
              fill="url(#fillA)"
              stroke={COLOR}
              name={playerA}
              isAnimationActive={false}
            />
            <Area
              dataKey={playerB}
              type="monotone"
              fill="url(#fillB)"
              stroke="#4dabf7"
              name={playerB}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer> 
         <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 16 }}>
          <span style={{ color: COLOR, fontWeight: 600 }}>■ {playerA}</span>
          <span style={{ color: "#4dabf7", fontWeight: 600 }}>■ {playerB}</span>
        </div> 
 * 
 */