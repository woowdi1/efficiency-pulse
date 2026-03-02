import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dailyData = [
  { day: "Mon", orders: 2120, ordersPrev: 1980, turnover: 69700, turnoverPrev: 65200 },
  { day: "Tue", orders: 2050, ordersPrev: 1920, turnover: 67400, turnoverPrev: 63100 },
  { day: "Wed", orders: 2180, ordersPrev: 2040, turnover: 71600, turnoverPrev: 67300 },
  { day: "Thu", orders: 2090, ordersPrev: 2010, turnover: 68700, turnoverPrev: 66200 },
  { day: "Fri", orders: 2340, ordersPrev: 2180, turnover: 76900, turnoverPrev: 71800 },
  { day: "Sat", orders: 2280, ordersPrev: 2150, turnover: 74900, turnoverPrev: 70700 },
  { day: "Sun", orders: 1772, ordersPrev: 1667, turnover: 58010, turnoverPrev: 55580 },
];

const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

const NetworkDynamics = () => {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-xl font-semibold">Network Dynamics</h2>
        <span className="text-sm text-muted-foreground">Daily breakdown · current vs previous week</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Orders Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    iconType="plainline"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    name="This week"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "hsl(var(--primary))" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ordersPrev"
                    name="Previous week"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    dot={{ r: 2, fill: "hsl(var(--muted-foreground))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Turnover Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Turnover (GMV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    iconType="plainline"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="turnover"
                    name="This week"
                    stroke="hsl(var(--kpi-positive))"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "hsl(var(--kpi-positive))" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="turnoverPrev"
                    name="Previous week"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    dot={{ r: 2, fill: "hsl(var(--muted-foreground))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NetworkDynamics;
