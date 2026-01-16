import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ, RefreshCcw, Search } from "lucide-react";
import rawData from "@/data/sales_raw.json";
import cleanData from "@/data/sales_clean.json";

type Row = Record<string, string>;
type SortDir = "asc" | "desc" | null;

const headers: Array<{ key: keyof Row; label: string }> = [
  { key: "invoice", label: "Invoice" },
  { key: "date", label: "Date" },
  { key: "sku", label: "SKU" },
  { key: "store", label: "Store" },
  { key: "amount", label: "Amount" },
];

const parseAmount = (v: string) => {
  const n = Number(String(v).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export const InteractiveTable = () => {
  const [dataset, setDataset] = useState<"raw" | "clean">("clean");
  const [query, setQuery] = useState("");
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<keyof Row>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const data = dataset === "clean" ? (cleanData as Row[]) : (rawData as Row[]);

  const stores = useMemo(() => {
    const s = new Set<string>();
    for (const r of data) if (r.store && r.store.trim()) s.add(r.store);
    return ["all", ...Array.from(s)];
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data.filter((r) => {
      const matchQ = !q
        || Object.values(r).some((v) => String(v).toLowerCase().includes(q));
      const matchStore = storeFilter === "all" || r.store === storeFilter;
      return matchQ && matchStore;
    });

    if (sortDir) {
      rows = [...rows].sort((a, b) => {
        let av: string | number = a[sortKey] ?? "";
        let bv: string | number = b[sortKey] ?? "";
        if (sortKey === "amount") {
          av = parseAmount(String(av));
          bv = parseAmount(String(bv));
        }
        if (sortKey === "date") {
          const ad = Date.parse(String(av));
          const bd = Date.parse(String(bv));
          av = Number.isFinite(ad) ? ad : 0;
          bv = Number.isFinite(bd) ? bd : 0;
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }, [data, query, storeFilter, sortKey, sortDir]);

  const total = useMemo(() => filtered.reduce((acc, r) => acc + parseAmount(r.amount), 0), [filtered]);

  const toggleSort = (key: keyof Row) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); return; }
    setSortDir((d) => d === "asc" ? "desc" : d === "desc" ? null : "asc");
  };

  return (
    <Card className="p-6 animate-fade-in-up">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex gap-2">
          <Button size="sm" variant={dataset === "clean" ? "default" : "outline"} onClick={() => setDataset("clean")}>Clean</Button>
          <Button size="sm" variant={dataset === "raw" ? "default" : "outline"} onClick={() => setDataset("raw")}>Raw</Button>
        </div>
        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search invoices, SKUs, stores..." className="pl-9" />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Select value={storeFilter} onValueChange={setStoreFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Store" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((s) => (
                <SelectItem key={s} value={s}>{s === "all" ? "All Stores" : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="icon" variant="ghost" title="Reset filters" onClick={() => { setQuery(""); setStoreFilter("all"); }}>
            <RefreshCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
        <span>Rows: <span className="text-foreground font-medium">{filtered.length}</span></span>
        <span>Total: <span className="text-foreground font-medium">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr className="border-b border-border">
              {headers.map(h => (
                <th key={String(h.key)} className="text-left py-3 px-4 select-none">
                  <button type="button" className="inline-flex items-center gap-1 font-semibold hover:text-primary transition-colors" onClick={() => toggleSort(h.key)}>
                    {h.label}
                    {sortKey === h.key && sortDir ? (
                      sortDir === "asc" ? <ArrowUpAZ className="w-4 h-4" /> : <ArrowDownAZ className="w-4 h-4" />
                    ) : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/40 transition-colors">
                {headers.map(h => (
                  <td key={String(h.key)} className="py-3 px-4 font-mono text-xs">
                    {row[h.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default InteractiveTable;

