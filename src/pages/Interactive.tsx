import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Database,
  Code2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Interactive = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "sql" | "cleaning">("dashboard");

  const dashboardData = [
    { month: "Jan", revenue: 45000, orders: 120 },
    { month: "Feb", revenue: 52000, orders: 145 },
    { month: "Mar", revenue: 48000, orders: 132 },
    { month: "Apr", revenue: 61000, orders: 168 },
    { month: "May", revenue: 55000, orders: 154 },
    { month: "Jun", revenue: 67000, orders: 189 },
  ];

  const sqlExample = `-- Monthly Revenue Analysis
SELECT 
  DATE_TRUNC('month', order_date) AS month,
  COUNT(*) AS total_orders,
  SUM(amount) AS revenue,
  AVG(amount) AS avg_order_value
FROM orders
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month DESC;`;

  const cleaningBefore = [
    { name: "john doe", email: "JOHN@email.COM", phone: "123-456-7890" },
    { name: "Jane Smith ", email: "jane@email.com", phone: "(123) 456.7891" },
    { name: "BOB WILSON", email: "bob@Email.com ", phone: "1234567892" },
  ];

  const cleaningAfter = [
    { name: "John Doe", email: "john@email.com", phone: "+1 (123) 456-7890" },
    { name: "Jane Smith", email: "jane@email.com", phone: "+1 (123) 456-7891" },
    { name: "Bob Wilson", email: "bob@email.com", phone: "+1 (123) 456-7892" },
  ];

  return (
    <BackgroundPaths>
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 container mx-auto px-4 py-20">
          {/* Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#d4a853]/10 text-[#b8923f] border-[#d4a853]/30">
              Live Demonstrations
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interactive Analytics Showcase
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience real-world data analytics in action. Explore dashboards, SQL queries, and data transformations.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-12">
            <Button
              variant={activeTab === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveTab("dashboard")}
              className={activeTab === "dashboard" ? "bg-[#d4a853] hover:bg-[#c49943]" : "border-gray-200 text-gray-600"}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "sql" ? "default" : "outline"}
              onClick={() => setActiveTab("sql")}
              className={activeTab === "sql" ? "bg-[#d4a853] hover:bg-[#c49943]" : "border-gray-200 text-gray-600"}
            >
              <Code2 className="w-4 h-4 mr-2" />
              SQL Queries
            </Button>
            <Button
              variant={activeTab === "cleaning" ? "default" : "outline"}
              onClick={() => setActiveTab("cleaning")}
              className={activeTab === "cleaning" ? "bg-[#d4a853] hover:bg-[#c49943]" : "border-gray-200 text-gray-600"}
            >
              <Database className="w-4 h-4 mr-2" />
              Data Cleaning
            </Button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Dashboard</h2>

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <Card className="p-4 bg-gray-50 border-gray-200">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$328,000</p>
                    <p className="text-sm text-green-600">+12.5% vs last period</p>
                  </Card>
                  <Card className="p-4 bg-gray-50 border-gray-200">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">908</p>
                    <p className="text-sm text-green-600">+8.3% vs last period</p>
                  </Card>
                  <Card className="p-4 bg-gray-50 border-gray-200">
                    <p className="text-sm text-gray-500">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">$361</p>
                    <p className="text-sm text-green-600">+3.9% vs last period</p>
                  </Card>
                </div>

                {/* Simple Bar Chart */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Monthly Revenue</h3>
                  {dashboardData.map((item) => (
                    <div key={item.month} className="flex items-center gap-4">
                      <span className="w-10 text-sm text-gray-600">{item.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                        <div
                          className="h-full bg-[#d4a853] rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(item.revenue / 70000) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            ${(item.revenue / 1000).toFixed(0)}k
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SQL Tab */}
          {activeTab === "sql" && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">SQL Query Example</h2>
                <p className="text-gray-600 mb-6">
                  How I analyze monthly revenue trends with SQL:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{sqlExample}</code>
                </pre>
                <div className="mt-6 p-4 bg-[#d4a853]/10 rounded-lg border border-[#d4a853]/30">
                  <p className="text-sm text-gray-700">
                    <strong className="text-[#b8923f]">Result:</strong> This query aggregates order data by month, providing leadership with a clear view of revenue trends and average order values over time.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Data Cleaning Tab */}
          {activeTab === "cleaning" && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Cleaning Example</h2>
                <p className="text-gray-600 mb-6">
                  See how I transform messy data into clean, standardized records:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div>
                    <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Before (Raw Data)
                    </h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-red-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-red-900 font-semibold">Name</th>
                            <th className="px-3 py-2 text-left text-red-900 font-semibold">Email</th>
                            <th className="px-3 py-2 text-left text-red-900 font-semibold">Phone</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cleaningBefore.map((row, i) => (
                            <tr key={i} className="border-t border-red-200">
                              <td className="px-3 py-2 text-red-800">{row.name}</td>
                              <td className="px-3 py-2 text-red-800">{row.email}</td>
                              <td className="px-3 py-2 text-red-800">{row.phone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      After (Cleaned)
                    </h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-green-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-green-900 font-semibold">Name</th>
                            <th className="px-3 py-2 text-left text-green-900 font-semibold">Email</th>
                            <th className="px-3 py-2 text-left text-green-900 font-semibold">Phone</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cleaningAfter.map((row, i) => (
                            <tr key={i} className="border-t border-green-200">
                              <td className="px-3 py-2 text-green-800">{row.name}</td>
                              <td className="px-3 py-2 text-green-800">{row.email}</td>
                              <td className="px-3 py-2 text-green-800">{row.phone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#d4a853]/10 rounded-lg border border-[#d4a853]/30">
                  <p className="text-sm text-gray-700">
                    <strong className="text-[#b8923f]">Transformations applied:</strong> Name case standardization, email lowercase normalization, phone number formatting, whitespace trimming.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="p-8 bg-gray-50 border-gray-200 max-w-2xl mx-auto">
              <TrendingUp className="w-12 h-12 text-[#d4a853] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to See More?
              </h3>
              <p className="text-gray-600 mb-6">
                These are just samples. Let's discuss how I can help with your specific data challenges.
              </p>
              <Button className="bg-[#d4a853] hover:bg-[#c49943] text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </BackgroundPaths>
  );
};

export default Interactive;
