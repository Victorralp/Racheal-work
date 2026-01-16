import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProcessStep } from "@/data/interactiveContent";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ProcessWorkflowProps {
  processSteps: ProcessStep[];
}

export const ProcessWorkflow = ({ processSteps }: ProcessWorkflowProps) => {
  return (
    <div className="space-y-8">
      {/* Timeline View */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden md:block" />

        <div className="space-y-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === processSteps.length - 1;

            return (
              <div key={index} className="relative">
                <Card className="p-6 border-border/60 bg-gradient-to-br from-card to-card/40 hover:border-primary/40 transition-all md:ml-20">
                  {/* Step Number Badge - Desktop */}
                  <div className="hidden md:block absolute -left-20 top-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-primary-foreground">
                          {step.number}
                        </span>
                      </div>
                      {!isLast && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2">
                          <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Number Badge - Mobile */}
                  <div className="md:hidden flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-xl font-bold text-primary-foreground">
                        {step.number}
                      </span>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Icon className="w-3 h-3" />
                      {step.duration}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="hidden md:flex gap-1 whitespace-nowrap">
                        <Icon className="w-3 h-3" />
                        {step.duration}
                      </Badge>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        Key Activities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.activities.map((activity, activityIndex) => (
                          <div
                            key={activityIndex}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        Deliverables
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((deliverable, deliverableIndex) => (
                          <Badge
                            key={deliverableIndex}
                            variant="outline"
                            className="text-xs bg-primary/5"
                          >
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-2">End-to-End Partnership</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From initial discovery to post-launch support, I guide you through
              every step. The timeline shown is typical—I adapt the process to
              your specific needs, constraints, and urgency. Every engagement
              includes thorough documentation, training, and 30 days of
              post-launch support.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
