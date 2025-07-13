import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./card";

// Placeholder soccer analytics data for two players
const chartData = [
  { date: "2025-07-01", playerA: 2, playerB: 1 },
  { date: "2025-07-02", playerA: 1, playerB: 2 },
  { date: "2025-07-03", playerA: 3, playerB: 2 },
  { date: "2025-07-04", playerA: 4, playerB: 3 },
  { date: "2025-07-05", playerA: 2, playerB: 4 },
  { date: "2025-07-06", playerA: 5, playerB: 3 },
  { date: "2025-07-07", playerA: 3, playerB: 5 },
];

const PlayerComparisonChart = () => {
  return (
    <Card className="pt-0">
      <CardHeader>
        <CardTitle>Player Comparison</CardTitle>
        <CardDescription>
          Compare Player A and Player B (e.g., goals per match)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart width={500} height={250} data={chartData}>
          <defs>
            <linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4dabf7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4dabf7" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#333" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <Area
            dataKey="playerA"
            type="monotone"
            fill="url(#fillA)"
            stroke="#ff6b6b"
            name="Player A"
          />
          <Area
            dataKey="playerB"
            type="monotone"
            fill="url(#fillB)"
            stroke="#4dabf7"
            name="Player B"
          />
        </AreaChart>
      </CardContent>
    </Card>
  );
}

export default PlayerComparisonChart;