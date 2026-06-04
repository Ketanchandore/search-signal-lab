import { memo } from "react";
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts";

function RadialGauge({ value, color }: { value: number; color: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: value, fill: color }]} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="v" cornerRadius={20} background={{ fill: "var(--secondary)" }} isAnimationActive={false} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, fill: "var(--foreground)" }}>
          {value}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default memo(RadialGauge);
