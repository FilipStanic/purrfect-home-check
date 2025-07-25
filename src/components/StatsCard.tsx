import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  animated?: boolean;
}

export function StatsCard({ title, value, subtitle, className, animated = false }: StatsCardProps) {
  return (
    <Card 
      className={cn(
        "p-6 text-center gradient-cozy border-0 shadow-gentle transition-smooth hover:shadow-warm",
        animated && "animate-float",
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}