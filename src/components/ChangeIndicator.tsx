import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ChangeIndicatorProps {
  change: number;
  inverse?: boolean; // true for metrics where decrease is good (e.g., cancellation rate)
  size?: "sm" | "md";
}

const ChangeIndicator = ({ change, inverse = false, size = "md" }: ChangeIndicatorProps) => {
  const isPositive = inverse ? change < 0 : change > 0;
  const isNegative = inverse ? change > 0 : change < 0;
  const isNeutral = change === 0;

  const colorClass = isPositive
    ? "text-kpi-positive"
    : isNegative
    ? "text-kpi-negative"
    : "text-kpi-neutral";

  const bgClass = isPositive
    ? "bg-kpi-positive/10"
    : isNegative
    ? "bg-kpi-negative/10"
    : "bg-secondary";

  const iconSize = size === "sm" ? 12 : 14;
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${bgClass} ${colorClass} ${textSize} font-mono font-medium`}>
      {isPositive && <TrendingUp size={iconSize} />}
      {isNegative && <TrendingDown size={iconSize} />}
      {isNeutral && <Minus size={iconSize} />}
      {change > 0 ? "+" : ""}{change.toFixed(1)}%
    </span>
  );
};

export default ChangeIndicator;
