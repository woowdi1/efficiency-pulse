export interface KPI {
  label: string;
  value: string;
  prevValue: string;
  change: number;
  format?: "number" | "currency" | "percent";
  trend: number[];
  target: number;
  actual: number;
  inverse?: boolean; // lower is better (e.g. cancellation rate)
}

export interface LocationScore {
  location_id: string;
  location_name: string;
  composite_score: number;
  orders: number;
  orders_change: number;
  gmv: number;
  gmv_change: number;
  aov: number;
  aov_change: number;
  cancellation_rate: number;
  cancellation_change: number;
  on_time_rate: number;
  on_time_change: number;
  fulfillment_rate: number;
  fulfillment_change: number;
}

export interface WeeklyCase {
  location_id: string;
  location_name: string;
  issue_type: "volume" | "cancellations" | "speed" | "aov";
  severity: "critical" | "warning";
  summary: string;
  metric_before: string;
  metric_after: string;
  change: number;
}

export interface RecoveryItem {
  location_id: string;
  location_name: string;
  issue_type: "volume" | "cancellations" | "speed" | "aov";
  flagged_week: string;
  metric_then: string;
  metric_now: string;
  recovered: boolean;
  change: number;
}

export interface DayHeatmapRow {
  location_id: string;
  location_name: string;
  days: { day: string; orders: number; cancellations: number }[];
}

export const MOCK_KPIS: KPI[] = [
  { label: "Total Orders", value: "14,832", prevValue: "13,947", change: 6.3, trend: [12800, 13200, 13947, 14832], target: 15000, actual: 14832 },
  { label: "GMV", value: "$487,210", prevValue: "$459,880", change: 5.9, trend: [420000, 438000, 459880, 487210], target: 500000, actual: 487210 },
  { label: "Avg Order Value", value: "$32.85", prevValue: "$32.98", change: -0.4, trend: [33.20, 33.10, 32.98, 32.85], target: 34.00, actual: 32.85 },
  { label: "Cancellation Rate", value: "3.2%", prevValue: "2.8%", change: 14.3, trend: [2.5, 2.6, 2.8, 3.2], target: 2.5, actual: 3.2, inverse: true },
  { label: "On-Time Delivery", value: "91.4%", prevValue: "93.1%", change: -1.8, trend: [94.2, 93.8, 93.1, 91.4], target: 95.0, actual: 91.4 },
  { label: "Fulfillment Rate", value: "96.8%", prevValue: "97.2%", change: -0.4, trend: [97.5, 97.4, 97.2, 96.8], target: 98.0, actual: 96.8 },
];

export const MOCK_LOCATIONS: LocationScore[] = [
  { location_id: "LOC-001", location_name: "Downtown Central", composite_score: 94, orders: 1842, orders_change: 12.1, gmv: 62400, gmv_change: 14.2, aov: 33.88, aov_change: 1.9, cancellation_rate: 1.8, cancellation_change: -15.0, on_time_rate: 96.2, on_time_change: 1.1, fulfillment_rate: 98.9, fulfillment_change: 0.3 },
  { location_id: "LOC-007", location_name: "Harbor View", composite_score: 91, orders: 1356, orders_change: 8.4, gmv: 47800, gmv_change: 9.1, aov: 35.25, aov_change: 0.7, cancellation_rate: 2.1, cancellation_change: -8.0, on_time_rate: 95.4, on_time_change: 0.8, fulfillment_rate: 98.2, fulfillment_change: 0.2 },
  { location_id: "LOC-012", location_name: "Midtown Square", composite_score: 89, orders: 1580, orders_change: 5.2, gmv: 51200, gmv_change: 6.8, aov: 32.41, aov_change: 1.5, cancellation_rate: 2.4, cancellation_change: -5.0, on_time_rate: 94.1, on_time_change: 0.5, fulfillment_rate: 97.8, fulfillment_change: 0.1 },
  { location_id: "LOC-003", location_name: "Westside Mall", composite_score: 86, orders: 1210, orders_change: 3.8, gmv: 38900, gmv_change: 4.2, aov: 32.15, aov_change: 0.4, cancellation_rate: 2.9, cancellation_change: -2.0, on_time_rate: 93.0, on_time_change: 0.3, fulfillment_rate: 97.5, fulfillment_change: 0.0 },
  { location_id: "LOC-009", location_name: "University Ave", composite_score: 84, orders: 980, orders_change: 7.1, gmv: 28400, gmv_change: 8.0, aov: 28.98, aov_change: 0.8, cancellation_rate: 3.0, cancellation_change: -3.0, on_time_rate: 92.5, on_time_change: 0.6, fulfillment_rate: 97.1, fulfillment_change: 0.2 },
  { location_id: "LOC-018", location_name: "Airport Terminal", composite_score: 52, orders: 620, orders_change: -18.4, gmv: 15800, gmv_change: -22.1, aov: 25.48, aov_change: -4.5, cancellation_rate: 8.2, cancellation_change: 42.0, on_time_rate: 78.3, on_time_change: -8.2, fulfillment_rate: 88.1, fulfillment_change: -4.5 },
  { location_id: "LOC-022", location_name: "Industrial Park", composite_score: 55, orders: 340, orders_change: -14.1, gmv: 9800, gmv_change: -16.3, aov: 28.82, aov_change: -2.6, cancellation_rate: 7.1, cancellation_change: 35.0, on_time_rate: 81.2, on_time_change: -6.1, fulfillment_rate: 90.4, fulfillment_change: -3.2 },
  { location_id: "LOC-015", location_name: "Lakeside Drive", composite_score: 58, orders: 510, orders_change: -11.2, gmv: 14200, gmv_change: -13.8, aov: 27.84, aov_change: -2.9, cancellation_rate: 6.5, cancellation_change: 28.0, on_time_rate: 83.7, on_time_change: -4.8, fulfillment_rate: 91.2, fulfillment_change: -2.8 },
  { location_id: "LOC-025", location_name: "North Station", composite_score: 61, orders: 450, orders_change: -8.9, gmv: 13100, gmv_change: -10.2, aov: 29.11, aov_change: -1.4, cancellation_rate: 5.8, cancellation_change: 22.0, on_time_rate: 85.1, on_time_change: -3.5, fulfillment_rate: 92.8, fulfillment_change: -1.9 },
  { location_id: "LOC-019", location_name: "Riverside Plaza", composite_score: 63, orders: 680, orders_change: -6.3, gmv: 20400, gmv_change: -7.8, aov: 30.00, aov_change: -1.6, cancellation_rate: 5.2, cancellation_change: 18.0, on_time_rate: 86.4, on_time_change: -2.9, fulfillment_rate: 93.5, fulfillment_change: -1.5 },
];

export const MOCK_CASES: WeeklyCase[] = [
  { location_id: "LOC-018", location_name: "Airport Terminal", issue_type: "cancellations", severity: "critical", summary: "Cancellation rate surged to 8.2% — staff shortage reported during evening shifts. 3 drivers called out Wed–Fri.", metric_before: "5.8%", metric_after: "8.2%", change: 42 },
  { location_id: "LOC-022", location_name: "Industrial Park", issue_type: "volume", severity: "critical", summary: "Order volume dropped 14% WoW. Construction on Main St reduced foot traffic. Two nearby competitors launched promos.", metric_before: "396", metric_after: "340", change: -14.1 },
  { location_id: "LOC-015", location_name: "Lakeside Drive", issue_type: "speed", severity: "warning", summary: "On-time delivery fell to 83.7%. Kitchen remodel caused prep delays averaging +8 min per order.", metric_before: "88.5%", metric_after: "83.7%", change: -5.4 },
  { location_id: "LOC-025", location_name: "North Station", issue_type: "aov", severity: "warning", summary: "AOV declined $0.42 as lunch combo promo cannibalized higher-margin dinner orders.", metric_before: "$29.53", metric_after: "$29.11", change: -1.4 },
  { location_id: "LOC-019", location_name: "Riverside Plaza", issue_type: "cancellations", severity: "warning", summary: "Cancellations up 18% — POS integration error caused duplicate orders flagged for manual cancel.", metric_before: "4.4%", metric_after: "5.2%", change: 18 },
];

export const MOCK_RECOVERY: RecoveryItem[] = [
  { location_id: "LOC-011", location_name: "East Village", issue_type: "volume", flagged_week: "Feb 10–16", metric_then: "280", metric_now: "345", recovered: true, change: 23.2 },
  { location_id: "LOC-004", location_name: "Park Heights", issue_type: "speed", flagged_week: "Feb 10–16", metric_then: "82.1%", metric_now: "90.8%", recovered: true, change: 10.6 },
  { location_id: "LOC-016", location_name: "Canal Street", issue_type: "cancellations", flagged_week: "Feb 10–16", metric_then: "6.8%", metric_now: "6.1%", recovered: false, change: -10.3 },
  { location_id: "LOC-008", location_name: "Beacon Hill", issue_type: "aov", flagged_week: "Feb 3–9", metric_then: "$26.40", metric_now: "$28.10", recovered: true, change: 6.4 },
  { location_id: "LOC-020", location_name: "Sunset Strip", issue_type: "volume", flagged_week: "Feb 10–16", metric_then: "410", metric_now: "390", recovered: false, change: -4.9 },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MOCK_HEATMAP: DayHeatmapRow[] = [
  { location_id: "LOC-001", location_name: "Downtown Central", days: [
    { day: "Mon", orders: 232, cancellations: 4 }, { day: "Tue", orders: 248, cancellations: 3 }, { day: "Wed", orders: 255, cancellations: 8 }, { day: "Thu", orders: 261, cancellations: 5 }, { day: "Fri", orders: 312, cancellations: 4 }, { day: "Sat", orders: 328, cancellations: 6 }, { day: "Sun", orders: 206, cancellations: 3 }
  ]},
  { location_id: "LOC-018", location_name: "Airport Terminal", days: [
    { day: "Mon", orders: 95, cancellations: 6 }, { day: "Tue", orders: 88, cancellations: 5 }, { day: "Wed", orders: 82, cancellations: 8 }, { day: "Thu", orders: 78, cancellations: 14 }, { day: "Fri", orders: 91, cancellations: 16 }, { day: "Sat", orders: 102, cancellations: 11 }, { day: "Sun", orders: 84, cancellations: 7 }
  ]},
  { location_id: "LOC-022", location_name: "Industrial Park", days: [
    { day: "Mon", orders: 58, cancellations: 9 }, { day: "Tue", orders: 52, cancellations: 5 }, { day: "Wed", orders: 48, cancellations: 4 }, { day: "Thu", orders: 55, cancellations: 6 }, { day: "Fri", orders: 50, cancellations: 5 }, { day: "Sat", orders: 42, cancellations: 3 }, { day: "Sun", orders: 35, cancellations: 2 }
  ]},
  { location_id: "LOC-007", location_name: "Harbor View", days: [
    { day: "Mon", orders: 178, cancellations: 3 }, { day: "Tue", orders: 185, cancellations: 4 }, { day: "Wed", orders: 192, cancellations: 3 }, { day: "Thu", orders: 188, cancellations: 5 }, { day: "Fri", orders: 201, cancellations: 4 }, { day: "Sat", orders: 195, cancellations: 3 }, { day: "Sun", orders: 217, cancellations: 2 }
  ]},
  { location_id: "LOC-015", location_name: "Lakeside Drive", days: [
    { day: "Mon", orders: 72, cancellations: 4 }, { day: "Tue", orders: 68, cancellations: 5 }, { day: "Wed", orders: 75, cancellations: 6 }, { day: "Thu", orders: 71, cancellations: 5 }, { day: "Fri", orders: 80, cancellations: 12 }, { day: "Sat", orders: 78, cancellations: 7 }, { day: "Sun", orders: 66, cancellations: 4 }
  ]},
  { location_id: "LOC-012", location_name: "Midtown Square", days: [
    { day: "Mon", orders: 210, cancellations: 5 }, { day: "Tue", orders: 218, cancellations: 4 }, { day: "Wed", orders: 225, cancellations: 6 }, { day: "Thu", orders: 220, cancellations: 5 }, { day: "Fri", orders: 278, cancellations: 7 }, { day: "Sat", orders: 245, cancellations: 4 }, { day: "Sun", orders: 184, cancellations: 3 }
  ]},
];
