// Temporarily disabled Framer Motion to fix React context issues
// import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface AnimatedChartProps {
  data: ChartData[];
  type: 'bar' | 'line' | 'donut';
  className?: string;
}

const BarChart = ({ data }: { data: ChartData[] }) => {
  const maxValue = Math.max(0, ...data.map(d => d.value));
  const denom = maxValue > 0 ? maxValue : 1;
  
  return (
    <div className="flex items-end justify-between h-48 gap-2">
      {data.map((item, index) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-2 flex-1 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className="w-full rounded-t-sm relative overflow-hidden animate-scale-y"
            style={{ 
              height: `${(item.value / denom) * 100}%`,
              minHeight: `${item.value > 0 ? 4 : 0}px`,
              transformOrigin: 'bottom',
              background: `linear-gradient(to top, ${item.color}, ${item.color}80)`,
              animationDelay: `${index * 0.1 + 0.3}s`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <span className="text-xs text-muted-foreground code-font">{item.label}</span>
          <span className="text-xs font-bold text-primary">{item.value}%</span>
        </div>
      ))}
    </div>
  );
};

const LineChart = ({ data }: { data: ChartData[] }) => {
  const points = data.map((item, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (item.value / 100) * 100
  }));

  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');

  return (
    <div className="h-48 relative">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#0088ff" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        
        {/* Area fill */}
        <path
          d={`${pathData} L 100 100 L 0 100 Z`}
          fill="url(#lineGradient)"
          opacity="0.2"
          className="line-chart-area"
        />
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          className="line-chart-path"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="#00d4ff"
            className="line-chart-point"
            style={{ animationDelay: `${index * 0.1 + 1}s` }}
          />
        ))}
      </svg>
      
      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground code-font">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
};

const DonutChart = ({ data }: { data: ChartData[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;
  
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = (cumulativePercentage / 100) * 360;
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
    
    cumulativePercentage += percentage;
    
    return {
      ...item,
      startAngle,
      endAngle,
      percentage
    };
  });

  return (
    <div className="h-48 flex items-center justify-center">
      <svg className="w-32 h-32" viewBox="0 0 100 100">
        {segments.map((segment, index) => {
          const radius = 35;
          const centerX = 50;
          const centerY = 50;
          
          const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180);
          const endAngleRad = (segment.endAngle - 90) * (Math.PI / 180);
          
          const x1 = centerX + radius * Math.cos(startAngleRad);
          const y1 = centerY + radius * Math.sin(startAngleRad);
          const x2 = centerX + radius * Math.cos(endAngleRad);
          const y2 = centerY + radius * Math.sin(endAngleRad);
          
          const largeArcFlag = segment.percentage > 50 ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          return (
            <path
              key={index}
              d={pathData}
              fill={segment.color}
              className="donut-chart-segment"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          );
        })}
        
        {/* Center circle */}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="hsl(var(--background))"
        />
      </svg>
      
      {/* Legend */}
      <div className="ml-6 space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 animate-fade-in-left"
            style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
          >
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground code-font">
              {item.label}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AnimatedChart = ({ data, type, className = "" }: AnimatedChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Add a small delay to ensure DOM is fully loaded
    const timeoutId = setTimeout(() => {
      const chartElements = chartRef.current?.querySelectorAll('.chart-element');
      if (!chartElements || chartElements.length === 0) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.chart-element',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: chartRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, chartRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className={`analytics-widget p-6 ${className} animate-fade-in-up`}
    >
      <div className="chart-element">
        {type === 'bar' && <BarChart data={data} />}
        {type === 'line' && <LineChart data={data} />}
        {type === 'donut' && <DonutChart data={data} />}
      </div>
    </div>
  );
};
