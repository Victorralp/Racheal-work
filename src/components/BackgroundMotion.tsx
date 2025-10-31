import { useMemo } from "react";
import { useLocation } from "react-router-dom";

type Orb = {
  size: number; // px
  hue: number; // 0..360
  top: string; // percentage string
  left: string; // percentage string
  dur: number; // seconds
  delay: number; // seconds
  variant: 0 | 1; // path variant
  opacity?: number;
};

const makeOrbs = (): Orb[] => {
  const count = 8;
  const list: Orb[] = [];
  for (let i = 0; i < count; i++) {
    const size = 160 + Math.round(Math.random() * 160); // 160..320
    const hue = [188, 210, 145, 266][i % 4] + Math.round(Math.random() * 10 - 5);
    const top = `${Math.round(Math.random() * 80 + 5)}%`;
    const left = `${Math.round(Math.random() * 80 + 5)}%`;
    const dur = 24 + Math.random() * 16; // 24..40s
    const delay = Math.random() * 10 - 5; // -5..5s
    const variant = Math.random() > 0.5 ? 1 : 0;
    const opacity = 0.08 + Math.random() * 0.07; // 0.08..0.15
    list.push({ size, hue, top, left, dur, delay, variant: variant as 0 | 1, opacity });
  }
  return list;
};

export const BackgroundMotion = () => {
  const { pathname } = useLocation();
  // Hide on admin routes to keep admin clean
  if (pathname.startsWith("/admin")) return null;

  const orbs = useMemo(makeOrbs, []);

  return (
    <div className="bg-motion" aria-hidden>
      {orbs.map((o, idx) => (
        <div
          key={idx}
          className={`bg-orb ${o.variant ? 'orb-path-b' : 'orb-path-a'}`}
          style={{
            ["--size" as any]: `${o.size}px`,
            ["--hue" as any]: o.hue as any,
            ["--top" as any]: o.top,
            ["--left" as any]: o.left,
            ["--dur" as any]: `${o.dur}s`,
            ["--delay" as any]: `${o.delay}s`,
            ["--op" as any]: o.opacity ?? 0.12,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundMotion;

