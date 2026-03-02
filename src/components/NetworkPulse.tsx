import { MOCK_KPIS } from "@/data/mockData";
import ChangeIndicator from "@/components/ChangeIndicator";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const INVERSE_METRICS = ["Cancellation Rate"];

const NetworkPulse = () => {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-xl font-semibold">Network Pulse</h2>
        <span className="text-sm text-muted-foreground">Week of Feb 23 vs Feb 16, 2026</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOCK_KPIS.map((kpi, i) => {
          const isInverse = INVERSE_METRICS.includes(kpi.label);
          const trendData = kpi.trend.map((v, idx) => ({ week: idx, value: v }));
          const trendUp = kpi.trend[kpi.trend.length - 1] > kpi.trend[0];
          const isPositiveTrend = isInverse ? !trendUp : trendUp;
          const strokeColor = isPositiveTrend
            ? "hsl(152, 60%, 48%)"
            : "hsl(0, 72%, 55%)";

          return (
            <div
              key={kpi.label}
              className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              <span className="text-2xl font-semibold font-mono tracking-tight">{kpi.value}</span>
              <div className="h-8 -mx-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={strokeColor}
                      strokeWidth={1.5}
                      fill={`url(#grad-${i})`}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-2">
                <ChangeIndicator
                  change={kpi.change}
                  inverse={isInverse}
                  size="sm"
                />
              </div>
              <span className="text-xs text-muted-foreground">prev: {kpi.prevValue}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NetworkPulse;
