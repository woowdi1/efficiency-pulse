import { MOCK_CASES, type WeeklyCase } from "@/data/mockData";
import { AlertCircle, Clock, ShoppingCart, DollarSign, XCircle } from "lucide-react";

const issueIcon = (type: WeeklyCase["issue_type"]) => {
  switch (type) {
    case "volume": return <ShoppingCart size={16} />;
    case "cancellations": return <XCircle size={16} />;
    case "speed": return <Clock size={16} />;
    case "aov": return <DollarSign size={16} />;
  }
};

const issueLabel = (type: WeeklyCase["issue_type"]) => {
  switch (type) {
    case "volume": return "Volume Drop";
    case "cancellations": return "High Cancellations";
    case "speed": return "Delivery Speed";
    case "aov": return "AOV Decline";
  }
};

const WeeklyCases = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <AlertCircle size={20} className="text-kpi-warning" />
        <h2 className="text-xl font-semibold">Weekly Cases</h2>
        <span className="text-sm text-muted-foreground ml-1">5 locations flagged</span>
      </div>
      <div className="space-y-3">
        {MOCK_CASES.map((c, i) => (
          <div
            key={c.location_id}
            className={`bg-card border rounded-lg p-4 animate-fade-in ${
              c.severity === "critical" ? "border-kpi-negative/40" : "border-border"
            }`}
            style={{ animationDelay: `${400 + i * 80}ms` }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                c.severity === "critical"
                  ? "bg-kpi-negative/10 text-kpi-negative"
                  : "bg-kpi-warning/10 text-kpi-warning"
              }`}>
                {c.severity === "critical" ? "CRITICAL" : "WARNING"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                {issueIcon(c.issue_type)}
                {issueLabel(c.issue_type)}
              </span>
              <div className="flex-1" />
              <span className="font-mono text-xs text-muted-foreground">{c.location_id}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="font-semibold text-base">{c.location_name}</h3>
              <span className="font-mono text-sm text-kpi-negative">
                {c.metric_before} → {c.metric_after}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeeklyCases;
