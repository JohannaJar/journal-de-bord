
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "purple";
}

const KPICard = ({ title, value, subtitle, icon: Icon, color }: KPICardProps) => {
  const colorClasses = {
    blue: "text-calm-blue bg-calm-blue/10",
    green: "text-soft-green bg-soft-green/10", 
    yellow: "text-warm-yellow bg-warm-yellow/10",
    purple: "text-gentle-purple bg-gentle-purple/10"
  };

  return (
    <Card className="zen-focus hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
