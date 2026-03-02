import { MOCK_HEATMAP } from "@/data/mockData";
import { Grid3X3 } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getOrderIntensity = (orders: number, allOrders: number[]) => {
  const max = Math.max(...allOrders);
  const min = Math.min(...allOrders);
  const range = max - min || 1;
  const pct = (orders - min) / range;
  // Map to opacity
  if (pct > 0.8) return "bg-primary/80 text-primary-foreground";
  if (pct > 0.6) return "bg-primary/50 text-foreground";
  if (pct > 0.4) return "bg-primary/30 text-foreground";
  if (pct > 0.2) return "bg-primary/15 text-foreground";
  return "bg-primary/5 text-muted-foreground";
};

const getCancelIntensity = (rate: number) => {
  if (rate >= 12) return "bg-kpi-negative/70 text-foreground";
  if (rate >= 8) return "bg-kpi-negative/40 text-foreground";
  if (rate >= 5) return "bg-kpi-warning/30 text-foreground";
  return "";
};

const DayOfWeekHeatmap = () => {
  // Collect all orders for normalization per row
  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <Grid3X3 size={20} className="text-primary" />
        <h2 className="text-xl font-semibold">Day-of-Week Heatmap</h2>
        <span className="text-sm text-muted-foreground ml-1">Orders & cancellation hotspots</span>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                <th className="py-3 px-4 text-left w-44">Location</th>
                {DAYS.map(d => (
                  <th key={d} className="py-3 px-2 text-center w-20">{d}</th>
                ))}
                <th className="py-3 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HEATMAP.map((row) => {
                const allOrders = row.days.map(d => d.orders);
                const totalOrders = allOrders.reduce((s, v) => s + v, 0);
                const totalCancels = row.days.reduce((s, d) => s + d.cancellations, 0);
                return (
                  <tr key={row.location_id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-sm">{row.location_name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{row.location_id}</div>
                    </td>
                    {row.days.map((d) => {
                      const cancelRate = (d.cancellations / d.orders) * 100;
                      const hasCancelIssue = cancelRate >= 8;
                      return (
                        <td key={d.day} className="py-2 px-1 text-center">
                          <div className={`rounded-md px-2 py-1.5 mx-auto ${getOrderIntensity(d.orders, allOrders)}`}>
                            <div className="font-mono text-xs font-medium">{d.orders}</div>
                          </div>
                          {hasCancelIssue && (
                            <div className={`mt-1 rounded px-1 py-0.5 text-[10px] font-mono ${getCancelIntensity(d.cancellations)}`}>
                              ✕{d.cancellations}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="py-3 px-3 text-right">
                      <div className="font-mono text-sm font-medium">{totalOrders}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">✕{totalCancels}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[10px] text-muted-foreground">
          <span>Intensity = order volume relative to location average</span>
          <span className="text-kpi-negative">✕ = cancellations shown when rate ≥ 8%</span>
        </div>
      </div>
    </section>
  );
};

export default DayOfWeekHeatmap;
