import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";

type ChartType = 'bar' | 'line';

type ChartItem = {
  id: string;
  type: ChartType;
  values: number[]; // 0..100
  color: string; // hex
  label: string;
  delay: number; // s
  duration: number; // s
  startY: string; // %
  variant: 0 | 1;
};

const COLORS = ["#00d4ff", "#00ff88", "#4ecdc4", "#8884d8", "#82ca9d"];

const makeValues = (n: number) => Array.from({ length: n }, () => Math.round(20 + Math.random() * 80));

const buildItems = (): ChartItem[] => {
  const items: ChartItem[] = [];
  const count = 10;
  for (let i = 0; i < count; i++) {
    const type: ChartType = Math.random() > 0.4 ? 'bar' : 'line';
    const values = makeValues(type === 'bar' ? 7 : 8);
    const color = COLORS[i % COLORS.length];
    const label = type === 'bar' ? 'Regional Mix' : 'Trend';
    const delay = Math.random() * 6 - 3;
    const duration = 18 + Math.random() * 10; // 18..28s
    const startY = `${10 + Math.round(Math.random() * 70)}%`;
    const variant = Math.random() > 0.5 ? 1 : 0;
    items.push({ id: `${type}-${i}`, type, values, color, label, delay, duration, startY, variant: variant as 0 | 1 });
  }
  return items;
};

const MiniBar = ({ values, color }: { values: number[]; color: string }) => {
  const max = Math.max(1, ...values);
  return (
    <div className="bar-stack">
      {values.map((v, i) => (
        <div key={i} className="bar" style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(to top, ${color}, ${color}80)` }} />
      ))}
    </div>
  );
};

const MiniLine = ({ values, color }: { values: number[]; color: string }) => {
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - (v / 100) * 100;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg className="line-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

export const BackgroundCharts = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  const items = useMemo(buildItems, []);

  return (
    <div className="bg-charts" aria-hidden>
      {items.map((it) => (
        <div
          key={it.id}
          className={`chart-fly ${it.variant ? 'fly-variant-down' : 'fly-variant-across'}`}
          style={{ ["--startY" as any]: it.startY, ["--dur" as any]: `${it.duration}s`, ["--delay" as any]: `${it.delay}s` }}
        >
          <div className="chart-card">
            <div className="chart-title">{it.label}</div>
            {it.type === 'bar' ? (
              <MiniBar values={it.values} color={it.color} />
            ) : (
              <MiniLine values={it.values} color={it.color} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(BackgroundCharts);

