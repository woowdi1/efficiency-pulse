import { MOCK_KPIS } from "@/data/mockData";
import ChangeIndicator from "@/components/ChangeIndicator";

const NetworkPulse = () => {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-xl font-semibold">Network Pulse</h2>
        <span className="text-sm text-muted-foreground">Week of Feb 23 vs Feb 16, 2026</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOCK_KPIS.map((kpi, i) => {
          const isInverse = kpi.inverse;

          return (
            <div
              key={kpi.label}
              className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              <span className="text-2xl font-semibold font-mono tracking-tight">{kpi.value}</span>
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
