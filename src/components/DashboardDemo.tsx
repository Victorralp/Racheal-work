import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, AlertTriangle, Target } from "lucide-react";

const kpiData = {
  all: {
    revenue: "$1,245,800",
    orders: "3,842",
    avgOrder: "$324.18",
    trend: "+12.5%",
    conversion: "3.2%",
    customerCount: "1,234"
  },
  north: {
    revenue: "$420,100",
    orders: "1,203",
    avgOrder: "$349.21",
    trend: "+8.2%",
    conversion: "3.8%",
    customerCount: "412"
  },
  south: {
    revenue: "$385,200",
    orders: "1,089",
    avgOrder: "$353.72",
    trend: "+18.4%",
    conversion: "4.1%",
    customerCount: "389"
  },
  west: {
    revenue: "$440,500",
    orders: "1,550",
    avgOrder: "$284.19",
    trend: "-3.1%",
    conversion: "2.4%",
    customerCount: "433"
  }
};

const monthlyData = {
  all: [
    { month: "Jan", revenue: 185000, orders: 580, target: 200000 },
    { month: "Feb", revenue: 195000, orders: 620, target: 200000 },
    { month: "Mar", revenue: 210000, orders: 650, target: 200000 },
    { month: "Apr", revenue: 225000, orders: 695, target: 220000 },
    { month: "May", revenue: 218000, orders: 672, target: 220000 },
    { month: "Jun", revenue: 212800, orders: 625, target: 220000 },
  ],
  north: [
    { month: "Jan", revenue: 62000, orders: 180, target: 70000 },
    { month: "Feb", revenue: 68000, orders: 195, target: 70000 },
    { month: "Mar", revenue: 72000, orders: 210, target: 70000 },
    { month: "Apr", revenue: 75000, orders: 225, target: 75000 },
    { month: "May", revenue: 71500, orders: 205, target: 75000 },
    { month: "Jun", revenue: 71600, orders: 188, target: 75000 },
  ],
  south: [
    { month: "Jan", revenue: 58000, orders: 165, target: 65000 },
    { month: "Feb", revenue: 61000, orders: 175, target: 65000 },
    { month: "Mar", revenue: 66000, orders: 188, target: 65000 },
    { month: "Apr", revenue: 70000, orders: 198, target: 70000 },
    { month: "May", revenue: 68200, orders: 182, target: 70000 },
    { month: "Jun", revenue: 62000, orders: 181, target: 70000 },
  ],
  west: [
    { month: "Jan", revenue: 65000, orders: 235, target: 65000 },
    { month: "Feb", revenue: 66000, orders: 250, target: 65000 },
    { month: "Mar", revenue: 72000, orders: 252, target: 75000 },
    { month: "Apr", revenue: 80000, orders: 272, target: 75000 },
    { month: "May", revenue: 78300, orders: 285, target: 80000 },
    { month: "Jun", revenue: 79200, orders: 256, target: 80000 },
  ]
};

const productData = [
  { name: "Electronics", value: 425000, margin: 28 },
  { name: "Clothing", value: 312000, margin: 45 },
  { name: "Home & Garden", value: 285000, margin: 32 },
  { name: "Sports", value: 223800, margin: 38 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const DashboardDemo = () => {
  const [region, setRegion] = useState<keyof typeof kpiData>("all");
  const [timeframe, setTimeframe] = useState<"6m" | "3m" | "1m">("6m");
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");
  
  const data = kpiData[region];
  const chartData = monthlyData[region];

  const filteredChartData = useMemo(() => {
    if (timeframe === "3m") return chartData.slice(-3);
    if (timeframe === "1m") return chartData.slice(-1);
    return chartData;
  }, [chartData, timeframe]);

  const performanceStatus = useMemo(() => {
    const lastMonth = chartData[chartData.length - 1];
    const performance = (lastMonth.revenue / lastMonth.target) * 100;
    if (performance >= 100) return { status: "Exceeding", color: "text-green-500", icon: TrendingUp };
    if (performance >= 90) return { status: "On Track", color: "text-blue-500", icon: Target };
    return { status: "At Risk", color: "text-red-500", icon: AlertTriangle };
  }, [chartData]);

  const Status = performanceStatus.icon;

  return (
    <div className="space-y-6">
      {/* Advanced Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-2 block">Region</label>
            <Select value={region} onValueChange={(v) => setRegion(v as keyof typeof kpiData)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🌍 All Regions</SelectItem>
                <SelectItem value="north">⬆️ North Branch</SelectItem>
                <SelectItem value="south">⬇️ South Branch</SelectItem>
                <SelectItem value="west">⬅️ West Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-2 block">Timeframe</label>
            <Select value={timeframe} onValueChange={(v) => setTimeframe(v as "6m" | "3m" | "1m")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="1m">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-2 block">Chart Type</label>
            <Select value={chartType} onValueChange={(v) => setChartType(v as "line" | "bar" | "area")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Performance Alert */}
      <Card className={`p-4 border-l-4 ${performanceStatus.status === "Exceeding" ? "border-l-green-500" : performanceStatus.status === "On Track" ? "border-l-blue-500" : "border-l-red-500"}`}>
        <div className="flex items-center gap-3">
          <Status className={`w-5 h-5 ${performanceStatus.color}`} />
          <div>
            <p className="font-semibold">{performanceStatus.status}</p>
            <p className="text-sm text-muted-foreground">
              {region === "all" ? "Overall" : region.charAt(0).toUpperCase() + region.slice(1)} performance vs target
            </p>
          </div>
          <Badge className="ml-auto" variant={performanceStatus.status === "At Risk" ? "destructive" : "default"}>
            {performanceStatus.status}
          </Badge>
        </div>
      </Card>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">{data.revenue}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className={`flex items-center gap-1 text-sm ${data.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {data.trend.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-semibold">{data.trend}</span>
            <span className="text-muted-foreground">vs last quarter</span>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-3xl font-bold">{data.orders}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>Across all channels</span>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
              <p className="text-3xl font-bold">{data.avgOrder}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Per transaction</span>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Customers</p>
              <p className="text-3xl font-bold">{data.customerCount}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Users className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Conversion: {data.conversion}</span>
          </div>
        </Card>
      </div>

      {/* Advanced Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="products">Product Mix</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Revenue Trend vs Target</h3>
                <p className="text-sm text-muted-foreground">Monthly performance tracking</p>
              </div>
              <Badge>{timeframe === "6m" ? "6 Months" : timeframe === "3m" ? "3 Months" : "1 Month"}</Badge>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              {chartType === "line" ? (
                <LineChart data={filteredChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} name="Actual Revenue" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              ) : chartType === "bar" ? (
                <BarChart data={filteredChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Actual Revenue" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target" />
                </BarChart>
              ) : (
                <AreaChart data={filteredChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Actual Revenue" />
                  <Area type="monotone" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Target" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Revenue by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Profit Margin by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit="%" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="margin" fill="#82ca9d" name="Margin %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Orders Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="orders" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Orders" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
