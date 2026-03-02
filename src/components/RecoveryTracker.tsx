import { MOCK_RECOVERY } from "@/data/mockData";
import { RotateCcw, CheckCircle2, XCircle, ShoppingCart, Clock, DollarSign } from "lucide-react";

const issueIcon = (type: string) => {
  switch (type) {
    case "volume": return <ShoppingCart size={14} />;
    case "cancellations": return <XCircle size={14} />;
    case "speed": return <Clock size={14} />;
    case "aov": return <DollarSign size={14} />;
    default: return null;
  }
};

const issueLabel = (type: string) => {
  switch (type) {
    case "volume": return "Volume";
    case "cancellations": return "Cancellations";
    case "speed": return "Speed";
    case "aov": return "AOV";
    default: return type;
  }
};

const RecoveryTracker = () => {
  const recovered = MOCK_RECOVERY.filter(r => r.recovered);
  const notRecovered = MOCK_RECOVERY.filter(r => !r.recovered);

  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <RotateCcw size={20} className="text-primary" />
        <h2 className="text-xl font-semibold">Recovery Tracker</h2>
        <span className="text-sm text-muted-foreground ml-1">
          {recovered.length}/{MOCK_RECOVERY.length} recovered from prior weeks
        </span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {MOCK_RECOVERY.map((item, i) => (
          <div
            key={item.location_id}
            className={`bg-card border rounded-lg p-4 animate-fade-in ${
              item.recovered ? "border-kpi-positive/30" : "border-kpi-negative/30"
            }`}
            style={{ animationDelay: `${500 + i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {item.recovered ? (
                  <CheckCircle2 size={16} className="text-kpi-positive" />
                ) : (
                  <XCircle size={16} className="text-kpi-negative" />
                )}
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.recovered
                    ? "bg-kpi-positive/10 text-kpi-positive"
                    : "bg-kpi-negative/10 text-kpi-negative"
                }`}>
                  {item.recovered ? "RECOVERED" : "STILL DOWN"}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                {issueIcon(item.issue_type)}
                {issueLabel(item.issue_type)}
              </span>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-sm">{item.location_name}</h3>
              <span className="text-xs text-muted-foreground font-mono">{item.location_id} · flagged {item.flagged_week}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">{item.metric_then}</span>
              <span className="text-muted-foreground">→</span>
              <span className={item.recovered ? "text-kpi-positive" : "text-kpi-negative"}>
                {item.metric_now}
              </span>
              <span className={`text-xs ${item.recovered ? "text-kpi-positive" : "text-kpi-negative"}`}>
                ({item.change > 0 ? "+" : ""}{item.change}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecoveryTracker;
