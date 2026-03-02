import { MOCK_KPIS } from "@/data/mockData";
import { Target } from "lucide-react";

const TargetGauges = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <Target size={20} className="text-primary" />
        <h2 className="text-xl font-semibold">Target vs Actual</h2>
        <span className="text-sm text-muted-foreground ml-1">Chain benchmarks</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOCK_KPIS.map((kpi, i) => {
          const pct = kpi.inverse
            ? Math.min(100, (kpi.target / kpi.actual) * 100)
            : Math.min(100, (kpi.actual / kpi.target) * 100);
          const onTrack = kpi.inverse ? kpi.actual <= kpi.target : kpi.actual >= kpi.target;
          const nearTarget = pct >= 90;

          const ringColor = onTrack
            ? "stroke-kpi-positive"
            : nearTarget
            ? "stroke-kpi-warning"
            : "stroke-kpi-negative";

          const circumference = 2 * Math.PI * 36;
          const dashOffset = circumference - (pct / 100) * circumference;

          return (
            <div
              key={kpi.label}
              className="bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-2 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider text-center">{kpi.label}</span>
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="36" fill="none" className="stroke-secondary" strokeWidth="5" />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    className={ringColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-sm font-semibold">{Math.round(pct)}%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono text-xs text-muted-foreground">
                  target: {kpi.inverse
                    ? `≤${kpi.target}${kpi.label.includes("%") || kpi.label.includes("Rate") ? "%" : ""}`
                    : kpi.label.includes("$") || kpi.label === "GMV"
                    ? `$${kpi.target.toLocaleString()}`
                    : kpi.label.includes("%") || kpi.label.includes("Rate") || kpi.label.includes("Delivery") || kpi.label.includes("Fulfillment")
                    ? `${kpi.target}%`
                    : kpi.target.toLocaleString()
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TargetGauges;
