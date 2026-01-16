import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";

type TableLike = {
  title: string;
  headers: string[];
  rows: string[][];
  hue: number; // for accent color
};

const TABLE_TEMPLATES: TableLike[] = [
  {
    title: "orders",
    headers: ["id", "date", "total"],
    rows: [
      ["#1024", "2024-06-12", "$1,245"],
      ["#1025", "2024-06-13", "$329"],
    ],
    hue: 188,
  },
  {
    title: "customers",
    headers: ["id", "segment", "ltv"],
    rows: [
      ["C-342", "referral", "$1,245"],
      ["C-589", "organic", "$892"],
    ],
    hue: 145,
  },
  {
    title: "inventory",
    headers: ["sku", "stock", "days"],
    rows: [
      ["SKU-389", "156", "27"],
      ["SKU-673", "612", "14"],
    ],
    hue: 210,
  },
  {
    title: "sql",
    headers: ["query", "ms", "rows"],
    rows: [
      ["top_margin", "182", "248"],
      ["underperf", "146", "2"],
    ],
    hue: 266,
  },
];

type FlyItem = TableLike & {
  id: string;
  delay: number;
  duration: number;
  startY: string;
  deltaY: string;
  variant: 0 | 1;
};

const buildItems = (): FlyItem[] => {
  const items: FlyItem[] = [];
  const count = 10;
  for (let i = 0; i < count; i++) {
    const base = TABLE_TEMPLATES[i % TABLE_TEMPLATES.length];
    const delay = (Math.random() * 6 - 3); // -3..3s
    const duration = 16 + Math.random() * 10; // 16..26s
    const startY = `${10 + Math.round(Math.random() * 70)}%`;
    const deltaY = `${Math.round((Math.random() * 2 - 1) * 60)}px`;
    const variant = Math.random() > 0.5 ? 1 : 0;
    items.push({
      ...base,
      id: `${base.title}-${i}`,
      delay,
      duration,
      startY,
      deltaY,
      variant: variant as 0 | 1,
    });
  }
  return items;
};

export const DataFlyover = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  const items = useMemo(buildItems, []);

  return (
    <div className="data-flyover">
      {items.map((it) => (
        <div
          key={it.id}
          className={`data-fly ${it.variant ? 'fly-variant-down' : 'fly-variant-across'}`}
          style={{
            ["--delay" as any]: `${it.delay}s`,
            ["--dur" as any]: `${it.duration}s`,
            ["--startY" as any]: it.startY,
            ["--deltaY" as any]: it.deltaY,
            ["--acc" as any]: `hsl(${it.hue} 100% 50%)`,
          }}
        >
          <div className="fly-card">
            <div className="fly-title">{it.title}</div>
            <div className="fly-table">
              <div className="fly-head">
                {it.headers.map((h, i) => (
                  <span key={i}>{h}</span>
                ))}
              </div>
              {it.rows.map((r, i) => (
                <div className="fly-row" key={i}>
                  {r.map((c, j) => (
                    <span key={j}>{c}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(DataFlyover);
