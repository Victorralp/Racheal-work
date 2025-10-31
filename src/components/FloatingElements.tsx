import { memo, useCallback, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const FLOATING_ITEMS = [
  {
    title: "Daily Records",
    metric: "1.2M",
    caption: "rows processed",
    tone: "cyan",
  },
  {
    title: "Forecast Accuracy",
    metric: "97.4%",
    caption: "latest sprint",
    tone: "green",
  },
  {
    title: "SQL Pipelines",
    metric: "42",
    caption: "active jobs",
    tone: "blue",
  },
  {
    title: "Anomaly Alerts",
    metric: "3",
    caption: "overnight",
    tone: "purple",
  },
  {
    title: "Experiment Lift",
    metric: "+18%",
    caption: "conversion",
    tone: "pink",
  },
  {
    title: "Dashboard Sessions",
    metric: "8.4k",
    caption: "this week",
    tone: "orange",
  },
];

const ADMIN_ROUTE_PREFIX = "/admin";

type Pos = { dx: number; dy: number };

const FloatingElements = () => {
  const location = useLocation();
  const [positions, setPositions] = useState<Pos[]>(() =>
    Array.from({ length: FLOATING_ITEMS.length }, () => ({ dx: 0, dy: 0 }))
  );
  const draggingIndex = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const startPointer = useRef<{ x: number; y: number } | null>(null);
  const startOffset = useRef<Pos>({ dx: 0, dy: 0 });

  if (location.pathname === '/' || location.pathname.startsWith(ADMIN_ROUTE_PREFIX)) {
    return null;
  }

  const onPointerDown = useCallback((e: React.PointerEvent, index: number) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingIndex.current = index;
    setActiveIndex(index);
    startPointer.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...positions[index] };
  }, [positions]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingIndex.current == null || !startPointer.current) return;
    const i = draggingIndex.current;
    const dx = e.clientX - startPointer.current.x + startOffset.current.dx;
    const dy = e.clientY - startPointer.current.y + startOffset.current.dy;
    setPositions(prev => {
      const next = [...prev];
      next[i] = { dx, dy };
      return next;
    });
  }, []);

  const endDrag = () => {
    draggingIndex.current = null;
    startPointer.current = null;
    setActiveIndex(null);
  };

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (draggingIndex.current == null) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    endDrag();
  }, []);

  const onPointerCancel = useCallback(() => {
    endDrag();
  }, []);

  const resetAt = useCallback((index: number) => {
    setPositions(prev => {
      const next = [...prev];
      next[index] = { dx: 0, dy: 0 };
      return next;
    });
  }, []);

  return (
    <div className="floating-elements fixed inset-0 overflow-hidden pointer-events-none">
      {FLOATING_ITEMS.map((item, index) => (
        <article
          key={item.title}
          className={`floating-card floating-card-${index} data-card pointer-events-auto cursor-grab ${activeIndex === index ? 'is-dragging cursor-grabbing' : ''}`}
          onPointerDown={(e) => onPointerDown(e, index)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onDoubleClick={() => resetAt(index)}
          style={{
            ["--dx" as any]: `${positions[index]?.dx ?? 0}px`,
            ["--dy" as any]: `${positions[index]?.dy ?? 0}px`,
            touchAction: 'none',
          }}
        >
          <span className={`floating-chip floating-chip-${item.tone}`}>{item.title}</span>
          <strong className="floating-metric">{item.metric}</strong>
          <span className="floating-caption">{item.caption}</span>
        </article>
      ))}
    </div>
  );
};

export default memo(FloatingElements);

