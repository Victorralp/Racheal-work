// Temporarily disabled Framer Motion to fix React context issues
// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Database, 
  BarChart3, 
  ExternalLink,
  Eye,
  Code2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsProjectCardProps {
  id: string;
  title: string;
  summary: string;
  tools: string[];
  coverImage?: string;
  metrics?: Array<{
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
  className?: string;
}

const MetricIndicator = ({ trend }: { trend?: 'up' | 'down' | 'neutral' }) => {
  if (!trend) return null;
  
  const colors = {
    up: 'text-emerald-500',
    down: 'text-red-500',
    neutral: 'text-muted-foreground'
  };
  
  return (
    <div className={cn('flex items-center gap-1', colors[trend])}>
      {trend === 'up' && <TrendingUp className="w-3 h-3" />}
      {trend === 'down' && <TrendingUp className="w-3 h-3 rotate-180" />}
      {trend === 'neutral' && <div className="w-3 h-3 rounded-full bg-muted-foreground" />}
    </div>
  );
};

export const AnalyticsProjectCard = ({
  id,
  title,
  summary,
  tools,
  coverImage,
  metrics = [],
  className
}: AnalyticsProjectCardProps) => {
  return (
    <div
      className={cn('analytics-widget group animate-fade-in-up', className)}
      style={{ animationDelay: `${Math.random() * 0.2}s` }}
    >
      <Card className="h-full border-border/60 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm overflow-hidden">
        {/* Header with metrics */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 neon-glow">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="secondary" className="code-font text-xs">
                ANALYTICS
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Code2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {summary}
          </p>

          {/* Metrics Grid */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {metrics.slice(0, 4).map((metric, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/40 border border-border/40 animate-fade-in-scale"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground code-font">
                      {metric.label}
                    </span>
                    <MetricIndicator trend={metric.trend} />
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {metric.value}
                  </div>
                  {metric.change && (
                    <div className={cn(
                      'text-xs font-medium',
                      metric.change.startsWith('+') ? 'text-emerald-500' : 
                      metric.change.startsWith('-') ? 'text-red-500' : 
                      'text-muted-foreground'
                    )}>
                      {metric.change}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cover Image */}
        {coverImage && (
          <div className="relative h-32 overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex gap-1">
                {tools.slice(0, 3).map((tool, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs code-font bg-black/50 backdrop-blur-sm"
                  >
                    {tool}
                  </Badge>
                ))}
                {tools.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-black/50 backdrop-blur-sm">
                    +{tools.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {tools.slice(0, 4).map((tool, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs code-font"
                >
                  {tool}
                </Badge>
              ))}
            </div>
            <Button asChild size="sm" className="group/btn">
              <Link to={`/projects/${id}`}>
                <span className="flex items-center gap-2">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Data flow effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-0.5 data-flow"
            style={{ 
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '3s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          />
        </div>
      </Card>
    </div>
  );
};
