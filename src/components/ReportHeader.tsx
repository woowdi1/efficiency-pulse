import { FileText, Calendar } from "lucide-react";

const ReportHeader = () => (
  <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border mb-8">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <FileText size={20} className="text-primary" />
        <span className="text-xs font-medium uppercase tracking-widest text-primary">Weekly Performance Report</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Network WoW Overview</h1>
      <p className="text-sm text-muted-foreground mt-1">Chain-wide performance across all locations</p>
    </div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border rounded-lg px-4 py-2">
      <Calendar size={14} />
      <span className="font-mono">Feb 17 – Feb 23, 2026</span>
    </div>
  </header>
);

export default ReportHeader;
