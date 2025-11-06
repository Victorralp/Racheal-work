import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechCategory } from "@/data/interactiveContent";
import { CheckCircle2 } from "lucide-react";

interface TechStackProps {
  techStack: TechCategory[];
}

export const TechStack = ({ techStack }: TechStackProps) => {
  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Expert":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Advanced":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20";
      case "Proficient":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {techStack.map((category, index) => {
        const Icon = category.icon;
        return (
          <Card
            key={index}
            className="p-6 border-border/60 bg-gradient-to-br from-card to-card/40 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {category.tools.map((tool, toolIndex) => (
                <div
                  key={toolIndex}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-medium text-sm">{tool.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getProficiencyColor(tool.proficiency)}`}
                    >
                      {tool.proficiency}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {tool.yearsUsed}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
