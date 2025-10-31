import { useCallback, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedChart } from "@/components/AnimatedChart";
import { Maximize2, Minimize2, GripVertical } from "lucide-react";

type WidgetSize = 1 | 2; // grid column span
type Widget = {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'donut';
  size: WidgetSize;
};

const sampleLine = [
  { label: 'Jan', value: 72, color: '#00d4ff' },
  { label: 'Feb', value: 65, color: '#00d4ff' },
  { label: 'Mar', value: 78, color: '#00d4ff' },
  { label: 'Apr', value: 84, color: '#00d4ff' },
  { label: 'May', value: 80, color: '#00d4ff' },
  { label: 'Jun', value: 88, color: '#00d4ff' },
];

const sampleBar = [
  { label: 'North', value: 62, color: '#00ff88' },
  { label: 'South', value: 74, color: '#00ff88' },
  { label: 'West', value: 58, color: '#00ff88' },
  { label: 'East', value: 69, color: '#00ff88' },
];

const sampleDonut = [
  { label: 'Electronics', value: 42, color: '#0088ff' },
  { label: 'Clothing', value: 31, color: '#00c49f' },
  { label: 'Home', value: 27, color: '#ff8042' },
];

export const MiniDashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'rev', title: 'Revenue Trend', type: 'line', size: 2 },
    { id: 'mix', title: 'Regional Mix', type: 'bar', size: 1 },
    { id: 'prod', title: 'Product Share', type: 'donut', size: 1 },
  ]);

  const onResize = (id: string) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, size: w.size === 1 ? 2 : 1 } : w));
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (e: React.DragEvent, overId: string) => {
    const dragId = e.dataTransfer.getData('text/plain');
    if (!dragId || dragId === overId) return;
    setWidgets(prev => {
      const list = [...prev];
      const from = list.findIndex(w => w.id === dragId);
      const to = list.findIndex(w => w.id === overId);
      if (from === -1 || to === -1) return prev;
      const [moved] = list.splice(from, 1);
      list.splice(to, 0, moved);
      return list;
    });
  };

  const chartData = useMemo(() => ({
    line: sampleLine,
    bar: sampleBar,
    donut: sampleDonut,
  }), []);

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">Drag tiles to reorder. Click the resize icon to toggle width.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map(w => {
          const colSpan = w.size === 2 ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-1 lg:col-span-1';
          return (
          <div
            key={w.id}
            className={`${colSpan} select-none`}
            draggable
            onDragStart={(e) => onDragStart(e, w.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, w.id)}
          >
            <Card className="p-3 group shadow-sm border-border/60 bg-muted/30 analytics-card">
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <GripVertical className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {w.title}
                </div>
                <button
                  type="button"
                  title="Toggle size"
                  className="p-1 rounded-md border border-transparent hover:border-border/60 text-muted-foreground hover:text-foreground"
                  onClick={() => onResize(w.id)}
                >
                  {w.size === 1 ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
              </div>
              <AnimatedChart type={w.type} data={chartData[w.type]} />
            </Card>
          </div>
        )})}
      </div>
    </div>
  );
};

export default MiniDashboard;
