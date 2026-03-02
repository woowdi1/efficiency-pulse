import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import ChangeIndicator from "@/components/ChangeIndicator";

interface RegionData {
  name: string;
  orders: number;
  ordersChange: number;
  gmv: number;
  gmvChange: number;
  cancellationRate: number;
  cancellationChange: number;
  locations: number;
}

const regions: RegionData[] = [
  { name: "North", orders: 3240, ordersChange: 8.2, gmv: 106500, gmvChange: 9.4, cancellationRate: 2.4, cancellationChange: -6.0, locations: 3 },
  { name: "East", orders: 2860, ordersChange: 4.1, gmv: 93800, gmvChange: 5.2, cancellationRate: 3.1, cancellationChange: 4.0, locations: 2 },
  { name: "South", orders: 4120, ordersChange: 10.3, gmv: 138200, gmvChange: 11.8, cancellationRate: 2.0, cancellationChange: -12.0, locations: 3 },
  { name: "West", orders: 2640, ordersChange: -2.5, gmv: 82100, gmvChange: -3.1, cancellationRate: 4.8, cancellationChange: 18.0, locations: 2 },
];

const formatCurrency = (v: number) => `$${(v / 1000).toFixed(1)}k`;

const RegionMap = () => {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-xl font-semibold">Regional Performance</h2>
        <span className="text-sm text-muted-foreground">Metrics by region</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map placeholder */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-72 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {/* Stylised region bubbles as map placeholder */}
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                <circle cx="80" cy="55" r="28" fill="hsl(var(--kpi-positive))" opacity="0.25" />
                <circle cx="145" cy="70" r="22" fill="hsl(var(--primary))" opacity="0.25" />
                <circle cx="100" cy="135" r="32" fill="hsl(var(--kpi-positive))" opacity="0.3" />
                <circle cx="50" cy="120" r="20" fill="hsl(var(--kpi-negative))" opacity="0.25" />
                <text x="80" y="58" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">N</text>
                <text x="145" y="73" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">E</text>
                <text x="100" y="138" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">S</text>
                <text x="50" y="123" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">W</text>
              </svg>
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} />
                <span>10 locations · 4 regions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Region metric cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {regions.map((r) => {
            const isDecline = r.ordersChange < 0;
            return (
              <Card key={r.name} className={isDecline ? "border-destructive/30" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      <span className="font-semibold text-sm">{r.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.locations} locations</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-0.5">Orders</span>
                      <span className="text-sm font-mono font-semibold">{r.orders.toLocaleString()}</span>
                      <ChangeIndicator change={r.ordersChange} size="sm" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-0.5">GMV</span>
                      <span className="text-sm font-mono font-semibold">{formatCurrency(r.gmv)}</span>
                      <ChangeIndicator change={r.gmvChange} size="sm" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-0.5">Cancel %</span>
                      <span className="text-sm font-mono font-semibold">{r.cancellationRate}%</span>
                      <ChangeIndicator change={r.cancellationChange} inverse size="sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RegionMap;
