import ReportHeader from "@/components/ReportHeader";
import NetworkPulse from "@/components/NetworkPulse";
import Leaderboards from "@/components/Leaderboards";
import WeeklyCases from "@/components/WeeklyCases";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReportHeader />
        <div className="space-y-10">
          <NetworkPulse />
          <Leaderboards />
          <WeeklyCases />
        </div>
        <footer className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          Generated automatically · Data refreshed weekly · Confidential
        </footer>
      </div>
    </div>
  );
};

export default Index;
