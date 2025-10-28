import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Database, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";

const sqlQueries = [
  {
    id: "underperforming",
    question: "Which branches underperformed this quarter?",
    complexity: "Intermediate",
    category: "Performance Analysis",
    sql: `SELECT 
  branch_name,
  SUM(revenue) as actual_revenue,
  target_revenue,
  ROUND(100.0 * (SUM(revenue) - target_revenue) / target_revenue, 1) as variance_pct
FROM sales
JOIN branches ON sales.branch_id = branches.id
WHERE quarter = 'Q1 2024'
GROUP BY branch_name, target_revenue
HAVING SUM(revenue) < target_revenue
ORDER BY variance_pct ASC;`,
    result: [
      { branch: "North Branch", actual: "$120,000", target: "$150,000", variance: "-20.0%" },
      { branch: "West Branch", actual: "$95,000", target: "$140,000", variance: "-32.1%" },
    ],
    insight: "West Branch is 32% below target - immediate action required",
    action: "Investigate sales pipeline, review pricing strategy, and assess team performance"
  },
  {
    id: "top-margin",
    question: "Top 5 products by gross margin?",
    complexity: "Intermediate",
    category: "Profitability",
    sql: `SELECT 
  product_name,
  product_sku,
  ROUND(100.0 * (revenue - cost) / revenue, 1) as margin_pct,
  COUNT(*) as units_sold,
  SUM(revenue - cost) as total_profit
FROM sales
JOIN products ON sales.product_id = products.id
WHERE sale_date >= '2024-01-01'
GROUP BY product_name, product_sku
ORDER BY margin_pct DESC
LIMIT 5;`,
    result: [
      { product: "Laptop Pro", sku: "SKU-244", margin: "37.5%", units: "248", profit: "$93,000" },
      { product: "Wireless Mouse", sku: "SKU-105", margin: "34.2%", units: "892", profit: "$15,200" },
      { product: "Monitor 27\"", sku: "SKU-389", margin: "31.8%", units: "156", profit: "$24,800" },
      { product: "Keyboard Mech", sku: "SKU-512", margin: "29.4%", units: "445", profit: "$18,900" },
      { product: "USB-C Hub", sku: "SKU-673", margin: "28.1%", units: "612", profit: "$12,400" },
    ],
    insight: "Laptop Pro has highest margin AND highest profit - star product",
    action: "Increase marketing budget for Laptop Pro by 25%, optimize inventory levels"
  },
  {
    id: "customer-lifetime",
    question: "Customer Lifetime Value by acquisition channel?",
    complexity: "Advanced",
    category: "Customer Analytics",
    sql: `WITH customer_metrics AS (
  SELECT 
    c.customer_id,
    c.acquisition_channel,
    COUNT(DISTINCT o.order_id) as order_count,
    SUM(o.order_value) as total_spent,
    DATEDIFF(day, c.first_purchase, c.last_purchase) as customer_age_days
  FROM customers c
  JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id, c.acquisition_channel, c.first_purchase, c.last_purchase
)
SELECT 
  acquisition_channel,
  COUNT(*) as customer_count,
  ROUND(AVG(total_spent), 2) as avg_ltv,
  ROUND(AVG(order_count), 1) as avg_orders,
  ROUND(AVG(customer_age_days), 0) as avg_retention_days
FROM customer_metrics
GROUP BY acquisition_channel
ORDER BY avg_ltv DESC;`,
    result: [
      { channel: "Referral", customers: "342", avg_ltv: "$1,245", avg_orders: "8.2", retention: "456" },
      { channel: "Organic Search", customers: "589", avg_ltv: "$892", avg_orders: "5.4", retention: "312" },
      { channel: "Paid Social", customers: "1,023", avg_ltv: "$645", avg_orders: "3.8", retention: "198" },
      { channel: "Email", customers: "234", avg_ltv: "$534", avg_orders: "4.1", retention: "245" },
    ],
    insight: "Referral customers have 93% higher LTV than paid social",
    action: "Launch referral program with $50 incentive - projected 15% increase in referrals"
  },
  {
    id: "inventory-turnover",
    question: "Slow-moving inventory costing us money?",
    complexity: "Advanced",
    category: "Inventory Management",
    sql: `SELECT 
  p.product_name,
  p.category,
  i.current_stock,
  ROUND(i.current_stock * p.unit_cost, 2) as capital_tied_up,
  COALESCE(SUM(s.quantity), 0) as units_sold_90d,
  ROUND(i.current_stock / NULLIF(SUM(s.quantity) / 90.0, 0), 1) as days_of_stock
FROM inventory i
JOIN products p ON i.product_id = p.product_id
LEFT JOIN sales s ON p.product_id = s.product_id 
  AND s.sale_date >= DATEADD(day, -90, GETDATE())
GROUP BY p.product_name, p.category, i.current_stock, p.unit_cost
HAVING days_of_stock > 180 OR days_of_stock IS NULL
ORDER BY capital_tied_up DESC;`,
    result: [
      { product: "Gaming Chair Pro", category: "Furniture", stock: "145", capital: "$43,500", sold_90d: "12", days_stock: "1,087" },
      { product: "Standing Desk XL", category: "Furniture", stock: "89", capital: "$35,600", sold_90d: "8", days_stock: "1,001" },
      { product: "Monitor Arm", category: "Accessories", stock: "234", capital: "$14,040", sold_90d: "45", days_stock: "468" },
    ],
    insight: "$93,140 tied up in slow-moving inventory - opportunity to free capital",
    action: "Run clearance sale on furniture category, reduce reorder quantities by 60%"
  }
];

export const SQLShowcase = () => {
  const [selectedQuery, setSelectedQuery] = useState(sqlQueries[0].id);
  const [copied, setCopied] = useState(false);
  const query = sqlQueries.find(q => q.id === selectedQuery) || sqlQueries[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(query.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Query Selector */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Business Question</label>
            <Select value={selectedQuery} onValueChange={setSelectedQuery}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sqlQueries.map(q => (
                  <SelectItem key={q.id} value={q.id}>
                    {q.question}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 ml-4">
            <Badge variant="outline">{query.complexity}</Badge>
            <Badge variant="secondary">{query.category}</Badge>
          </div>
        </div>
      </Card>

      {/* SQL Query */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">SQL Query</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy SQL
              </>
            )}
          </Button>
        </div>
        <div className="bg-neutral-950 rounded-lg p-4 overflow-x-auto border border-neutral-800">
          <pre className="text-xs font-mono text-green-400">
            <code>{query.sql}</code>
          </pre>
        </div>
      </Card>

      {/* Results Table */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Query Results</h3>
          <Badge className="ml-auto">{query.result.length} rows</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {Object.keys(query.result[0]).map(key => (
                  <th key={key} className="text-left py-3 px-4 capitalize font-semibold">
                    {key.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {query.result.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  {Object.values(row).map((value, j) => (
                    <td key={j} className="py-3 px-4 font-mono text-xs">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Business Insight */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Business Insight</h3>
            <p className="text-sm text-muted-foreground mb-4">{query.insight}</p>
            <div className="bg-background/50 rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-1">Recommended Action:</p>
              <p className="text-sm">{query.action}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
