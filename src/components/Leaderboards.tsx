import { MOCK_LOCATIONS, type LocationScore } from "@/data/mockData";
import ChangeIndicator from "@/components/ChangeIndicator";
import { Trophy, AlertTriangle } from "lucide-react";

const rankColor = (i: number) => {
  if (i === 0) return "text-rank-gold";
  if (i === 1) return "text-rank-silver";
  if (i === 2) return "text-rank-bronze";
  return "text-muted-foreground";
};

const ScoreBar = ({ score }: { score: number }) => {
  const color =
    score >= 85 ? "bg-kpi-positive" : score >= 65 ? "bg-kpi-warning" : "bg-kpi-negative";
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-sm w-8 text-right">{score}</span>
    </div>
  );
};

const LocationRow = ({ loc, rank, isBottom }: { loc: LocationScore; rank: number; isBottom?: boolean }) => (
  <tr className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
    <td className="py-3 px-3">
      <span className={`font-mono font-semibold text-sm ${isBottom ? "text-kpi-negative" : rankColor(rank)}`}>
        {isBottom ? `#${rank + 1}` : `#${rank + 1}`}
      </span>
    </td>
    <td className="py-3 px-3">
      <div>
        <div className="font-medium text-sm">{loc.location_name}</div>
        <div className="text-xs text-muted-foreground font-mono">{loc.location_id}</div>
      </div>
    </td>
    <td className="py-3 px-3 w-40"><ScoreBar score={loc.composite_score} /></td>
    <td className="py-3 px-3 text-right font-mono text-sm">{loc.orders.toLocaleString()}</td>
    <td className="py-3 px-3"><ChangeIndicator change={loc.orders_change} size="sm" /></td>
    <td className="py-3 px-3 text-right font-mono text-sm">${(loc.gmv / 1000).toFixed(1)}k</td>
    <td className="py-3 px-3"><ChangeIndicator change={loc.gmv_change} size="sm" /></td>
    <td className="py-3 px-3 text-right font-mono text-sm">{loc.on_time_rate}%</td>
    <td className="py-3 px-3"><ChangeIndicator change={loc.on_time_change} size="sm" /></td>
  </tr>
);

const Leaderboards = () => {
  const sorted = [...MOCK_LOCATIONS].sort((a, b) => b.composite_score - a.composite_score);
  const top5 = sorted.slice(0, 5);
  const bottom5 = sorted.slice(-5).reverse();

  const TableHead = () => (
    <thead>
      <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
        <th className="py-2 px-3 text-left">#</th>
        <th className="py-2 px-3 text-left">Location</th>
        <th className="py-2 px-3 text-left">Score</th>
        <th className="py-2 px-3 text-right">Orders</th>
        <th className="py-2 px-3 text-left">Δ</th>
        <th className="py-2 px-3 text-right">GMV</th>
        <th className="py-2 px-3 text-left">Δ</th>
        <th className="py-2 px-3 text-right">On-Time</th>
        <th className="py-2 px-3 text-left">Δ</th>
      </tr>
    </thead>
  );

  return (
    <section>
      <h2 className="text-xl font-semibold mb-5">Location Leaderboards</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top performers */}
        <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-kpi-positive/5">
            <Trophy size={16} className="text-kpi-positive" />
            <span className="text-sm font-semibold text-kpi-positive">Top Performers</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead />
              <tbody>
                {top5.map((loc, i) => <LocationRow key={loc.location_id} loc={loc} rank={i} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom performers */}
        <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-kpi-negative/5">
            <AlertTriangle size={16} className="text-kpi-negative" />
            <span className="text-sm font-semibold text-kpi-negative">Needs Attention</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead />
              <tbody>
                {bottom5.map((loc, i) => <LocationRow key={loc.location_id} loc={loc} rank={i} isBottom />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboards;
