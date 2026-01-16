import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrendingUp, TrendingDown, Minus, Building2, Clock, Award } from "lucide-react";
import { CaseStudy } from "@/data/interactiveContent";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export const CaseStudyCard = ({ caseStudy, index }: CaseStudyCardProps) => {
  const Icon = caseStudy.icon;

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="overflow-hidden border-border/60 bg-gradient-to-br from-card to-card/40">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border/40">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Building2 className="w-3 h-3" />
                  {caseStudy.industry}
                </Badge>
                <Badge variant="outline">{caseStudy.companySize}</Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {caseStudy.timeline}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Challenge */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            The Challenge
          </h4>
          <p className="text-sm leading-relaxed text-foreground/90">
            {caseStudy.challenge}
          </p>
        </div>

        {/* Solution */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            The Solution
          </h4>
          <p className="text-sm leading-relaxed text-foreground/90 mb-3">
            {caseStudy.solution}
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="approach" className="border-border/40">
              <AccordionTrigger className="text-sm hover:no-underline py-2">
                View Detailed Approach
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 mt-2">
                  {caseStudy.approach.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Results */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Measurable Results
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {caseStudy.results.map((result, idx) => (
              <Card
                key={idx}
                className="p-4 bg-muted/20 border-border/40 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground font-medium">
                    {result.metric}
                  </p>
                  {getTrendIcon(result.trend)}
                </div>
                <p className="text-xl font-bold text-primary">
                  {result.value}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm italic text-foreground/90 mb-3 leading-relaxed">
                "{caseStudy.testimonial.quote}"
              </p>
              <div>
                <p className="text-sm font-semibold">
                  {caseStudy.testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {caseStudy.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Technologies */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {caseStudy.technologies.map((tech, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
