import { Lightbulb, TrendingUp, Target } from "lucide-react";

interface InsightCardProps {
  insight: string;
  impact: string;
  action: string;
}

export const InsightCard = ({ insight, impact, action }: InsightCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold">Insight</h4>
          </div>
          <p className="text-sm text-muted-foreground">{insight}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h4 className="text-sm font-semibold">Business Impact</h4>
          </div>
          <p className="text-sm text-muted-foreground">{impact}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-foreground" />
            <h4 className="text-sm font-semibold">Recommended Action</h4>
          </div>
          <p className="text-sm text-muted-foreground">{action}</p>
        </div>
      </div>
    </div>
  );
};
