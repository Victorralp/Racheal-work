import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const rawData = [
  { invoice: "INV-001", date: "2024/01/15", sku: "laptop-pro", store: "North Branch", amount: "$1299.99" },
  { invoice: "INV-001", date: "01-15-2024", sku: "LAPTOP-PRO", store: "north", amount: "1299.99" },
  { invoice: "INV-002", date: "2024/01/16", sku: "mouse_wireless", store: "", amount: "$29.99" },
  { invoice: "INV-003", date: "Jan 17 2024", sku: "keyboard", store: "West Branch", amount: "$79" },
];

const cleanData = [
  { invoice: "INV-001", date: "2024-01-15", sku: "laptop-pro", store: "North Branch", amount: "1299.99" },
  { invoice: "INV-002", date: "2024-01-16", sku: "mouse-wireless", store: "Unknown", amount: "29.99" },
  { invoice: "INV-003", date: "2024-01-17", sku: "keyboard", store: "West Branch", amount: "79.00" },
];

export const DataCleaningDemo = () => {
  const [showClean, setShowClean] = useState(false);
  const data = showClean ? cleanData : rawData;

  // Build a quick diff map by invoice id
  const diffByInvoice: Record<string, Partial<Record<keyof typeof cleanData[number], boolean>>> = useMemo(() => {
    const rawMap = new Map<string, typeof rawData[number]>();
    for (const r of rawData) rawMap.set(r.invoice, r);
    const map: Record<string, Partial<Record<keyof typeof cleanData[number], boolean>>> = {};
    for (const c of cleanData) {
      const r = rawMap.get(c.invoice);
      if (!r) continue;
      const changed: Partial<Record<keyof typeof c, boolean>> = {};
      if (r.date !== c.date) changed.date = true;
      if (r.sku?.toLowerCase().replace(/_/g, '-') !== c.sku) changed.sku = true;
      if ((r.store || 'Unknown') !== c.store) changed.store = true;
      const rAmt = String(r.amount).replace(/\$/g, '');
      if (rAmt !== c.amount) changed.amount = true;
      map[c.invoice] = changed;
    }
    return map;
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button
            variant={!showClean ? "default" : "outline"}
            size="sm"
            onClick={() => setShowClean(false)}
          >
            Raw Data
          </Button>
          <Button
            variant={showClean ? "default" : "outline"}
            size="sm"
            onClick={() => setShowClean(true)}
          >
            Cleaned Data
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">Invoice</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">SKU</th>
              <th className="text-left py-3 px-4">Store</th>
              <th className="text-left py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const diff = showClean ? diffByInvoice[row.invoice] || {} : {};
              return (
                <tr key={i} className="border-b border-border/50 animate-fade-in-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  <td className="py-3 px-4 font-mono text-xs">{row.invoice}</td>
                  <td className={`py-3 px-4 font-mono text-xs ${diff.date ? 'diff-flash' : ''}`}>{row.date}</td>
                  <td className={`py-3 px-4 font-mono text-xs ${diff.sku ? 'diff-flash' : ''}`}>{row.sku}</td>
                  <td className={`py-3 px-4 font-mono text-xs ${diff.store ? 'diff-flash' : ''}`}>{row.store || <span className="text-destructive">empty</span>}</td>
                  <td className={`py-3 px-4 font-mono text-xs ${diff.amount ? 'diff-flash' : ''}`}>{row.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Explanation */}
      <div className="bg-secondary/50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-sm">
          {showClean ? "Fixes Applied:" : "Issues Found:"}
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            {showClean ? <Check className="w-4 h-4 text-primary mt-0.5" /> : <X className="w-4 h-4 text-destructive mt-0.5" />}
            <span><strong>Duplicates:</strong> Removed duplicate invoice INV-001</span>
          </li>
          <li className="flex items-start gap-2">
            {showClean ? <Check className="w-4 h-4 text-primary mt-0.5" /> : <X className="w-4 h-4 text-destructive mt-0.5" />}
            <span><strong>Date format:</strong> Standardized all dates to YYYY-MM-DD</span>
          </li>
          <li className="flex items-start gap-2">
            {showClean ? <Check className="w-4 h-4 text-primary mt-0.5" /> : <X className="w-4 h-4 text-destructive mt-0.5" />}
            <span><strong>SKU naming:</strong> Converted to lowercase with hyphens</span>
          </li>
          <li className="flex items-start gap-2">
            {showClean ? <Check className="w-4 h-4 text-primary mt-0.5" /> : <X className="w-4 h-4 text-destructive mt-0.5" />}
            <span><strong>Missing values:</strong> Filled empty store names with "Unknown"</span>
          </li>
          <li className="flex items-start gap-2">
            {showClean ? <Check className="w-4 h-4 text-primary mt-0.5" /> : <X className="w-4 h-4 text-destructive mt-0.5" />}
            <span><strong>Amount format:</strong> Removed $ symbols and standardized decimals</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
