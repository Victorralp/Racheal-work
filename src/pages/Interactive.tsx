import { useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DataCleaningDemo } from "@/components/DataCleaningDemo";
import { SQLShowcase } from "@/components/SQLShowcase";
import { InsightCard } from "@/components/InsightCard";
import { DashboardDemo } from "@/components/DashboardDemo";
import { InteractiveTable } from "@/components/InteractiveTable";
import { MiniDashboard } from "@/components/MiniDashboard";
import { useDemoProjects, DemoProject } from "@/hooks/use-demo-projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Workflow, Clock, Bolt, GaugeCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const buildChangeColor = (change?: string) => {
  if (!change) return "";
  const trimmed = change.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("-") ? "text-destructive" : "text-emerald-500";
};

const ScenarioContent = ({ project }: { project: DemoProject }) => (
  <div className="space-y-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      {project.coverImage ? (
        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-sm">
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="flex-1 space-y-4">
        <Badge variant="secondary">Scenario</Badge>
        <div>
          <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground">{project.summary}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </div>

    <Accordion type="multiple" defaultValue={["metrics", "data", "insights"]}>
      {project.metrics.length ? (
        <AccordionItem value="metrics" className="border-border/60">
          <AccordionTrigger className="text-left text-base font-semibold">
            Key Metrics
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.metrics.map((metric, index) => (
                <Card
                  key={`${metric.label}-${index}`}
                  className="p-4 border-border/60 bg-muted/40"
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="text-xl font-semibold mt-2">{metric.value}</p>
                  {metric.change ? (
                    <p
                      className={cn(
                        "text-xs font-medium mt-2",
                        buildChangeColor(metric.change),
                      )}
                    >
                      {metric.change}
                    </p>
                  ) : null}
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ) : null}

      {project.dataPoints.length ? (
        <AccordionItem value="data" className="border-border/60">
          <AccordionTrigger className="text-left text-base font-semibold">
            Data Highlights
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border/60 rounded-lg overflow-hidden">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {project.dataPoints.map((item, index) => (
                    <tr
                      key={`${item.label}-${index}`}
                      className="border-t border-border/50"
                    >
                      <td className="px-4 py-3 font-medium">{item.label}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      ) : null}

      {project.insights.length ? (
        <AccordionItem value="insights" className="border-border/60">
          <AccordionTrigger className="text-left text-base font-semibold">
            Insights & Actions
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-3 md:grid-cols-2">
              {project.insights.map((insight, index) => (
                <Card
                  key={`${insight.title}-${index}`}
                  className="p-4 border-border/60 bg-gradient-to-br from-primary/5 to-primary/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{insight.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {insight.detail}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ) : null}
    </Accordion>
  </div>
);

const Interactive = () => {
  const {
    data: demoProjects,
    isLoading: loadingDemoProjects,
  } = useDemoProjects();
  const [activeScenario, setActiveScenario] = useState<string | undefined>();

  const scenarioList = useMemo(() => demoProjects ?? [], [demoProjects]);

  const activeScenarioData = useMemo(() => {
    if (!scenarioList.length) return undefined;
    const id = activeScenario ?? scenarioList[0]?.id;
    return scenarioList.find((item) => item.id === id) ?? scenarioList[0];
  }, [activeScenario, scenarioList]);

  const automationPlaybooks = [
    {
      icon: Workflow,
      title: "Revenue Ops Pipeline",
      outcome:
        "Eliminated 14 manual spreadsheets by syncing CRM + billing into a single warehouse every night.",
      tech: "Airbyte • dbt • BigQuery • Looker Studio",
    },
    {
      icon: Bolt,
      title: "Marketing Attribution Engine",
      outcome:
        "Unified paid + organic funnels, shipped daily ROI scorecards to channel owners.",
      tech: "Python • Fivetran • Snowflake • Power BI",
    },
    {
      icon: Clock,
      title: "Finance Close Automation",
      outcome:
        "Cut month-end close from 9 days to 3 with automated anomaly detection and Slack escalations.",
      tech: "SQL Server • Power Automate • Excel • Teams",
    },
  ];

  const experimentResults = [
    {
      name: "Pricing Page A/B",
      metric: "Conversion Rate",
      lift: "+8.4%",
      decision: "Rolled out experiment B globally",
    },
    {
      name: "Email Nurture Sequence",
      metric: "SQL Velocity",
      lift: "+21.7%",
      decision: "Scaled playbook to entire mid-market segment",
    },
    {
      name: "Churn Intervention Model",
      metric: "Logo Retention",
      lift: "-3.2 pts",
      decision: "Invested in success playbook protecting $420K ARR",
    },
  ];

  const forecastHighlights = [
    "Cohort forecast rebuilt to expose LTV:CAC drift across acquisition channels.",
    "Inventory Monte Carlo simulation reduced out-of-stock incidents by 35%.",
    "Board-ready waterfall & sensitivity analysis delivered in <48h for strategic planning.",
  ];

  const toolkitSnippets = [
    {
      label: "SQL: Cohort Retention Window",
      code: String.raw`WITH cohort AS (
  SELECT
    customer_id,
    MIN(CONVERT(date, order_date)) AS cohort_date
  FROM fact_orders
  GROUP BY customer_id
),
retention AS (
  SELECT
    c.cohort_date,
    DATEDIFF(month, c.cohort_date, f.order_date) AS month_number,
    COUNT(DISTINCT f.customer_id) AS active_customers
  FROM cohort c
  JOIN fact_orders f ON c.customer_id = f.customer_id
  GROUP BY c.cohort_date, DATEDIFF(month, c.cohort_date, f.order_date)
)
SELECT
  cohort_date,
  month_number,
  active_customers,
  active_customers * 1.0 / FIRST_VALUE(active_customers)
    OVER (PARTITION BY cohort_date ORDER BY month_number) AS retention_rate
FROM retention
ORDER BY cohort_date, month_number;`,
    },
    {
      label: "Python: Outlier Detection & Alerting",
      code: String.raw`import pandas as pd
from sklearn.ensemble import IsolationForest

df = pd.read_parquet("gs://warehouse/finance/gl_summary.parquet")
model = IsolationForest(contamination=0.015, random_state=42)
df["score"] = model.fit_predict(df[["amount", "variance"]])

outliers = df[df["score"] == -1].assign(
    flagged_amount=lambda d: "$" + format(d["amount"], ",.0f"),
)

if not outliers.empty:
    outliers.to_markdown("/tmp/anomaly_report.md")
    send_slack_alert(channel="#finance-ops", file="/tmp/anomaly_report.md")`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Interactive Demo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how I work: dashboards, data cleaning, SQL queries, and actionable insights.
            </p>
          </div>

          {/* Interactive Scenarios */}
          <section className="mb-20 max-w-5xl mx-auto">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Hands-on Scenarios</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Explore data stories I can tailor to your business. Each scenario combines metrics, sample datasets, and the actions I would take.
                </p>
              </div>
              {scenarioList.length ? (
                <Badge variant="outline" className="w-fit">
                  {scenarioList.length} live scenario{scenarioList.length > 1 ? "s" : ""}
                </Badge>
              ) : null}
            </div>

            {loadingDemoProjects ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : !scenarioList.length ? (
              <Card className="p-8 text-center bg-muted/40 border-dashed border-border">
                <p className="text-muted-foreground">
                  No custom scenarios yet. Log in to the admin dashboard to publish your first interactive walkthrough.
                </p>
              </Card>
            ) : (
              <div className="space-y-8">
                <ScrollArea className="max-w-full">
                  <div className="flex gap-2 pb-2">
                    {scenarioList.map((scenario) => {
                      const isActive =
                        (activeScenario ?? scenarioList[0]?.id) === scenario.id;
                      return (
                        <button
                          key={scenario.id}
                          type="button"
                          onClick={() => setActiveScenario(scenario.id)}
                          className={cn(
                            "px-4 py-2 rounded-full border text-sm font-medium transition-colors whitespace-nowrap",
                            isActive
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background hover:bg-muted border-border text-muted-foreground",
                          )}
                        >
                          {scenario.title}
                        </button>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {activeScenarioData ? (
                  <Card className="p-6 md:p-8 max-w-4xl mx-auto">
                    <ScenarioContent project={activeScenarioData} />
                  </Card>
                ) : null}
              </div>
            )}
          </section>

          {/* Dashboard Section */}
          <section className="mb-20 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Dashboard View</h2>
            <DashboardDemo />
          </section>

          {/* Mini Dashboard Grid */}
          <section className="mb-20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Mini Dashboard Grid</h2>
            <MiniDashboard />
          </section>

          {/* Data Cleaning Section */}
          <section className="mb-20 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Data Cleaning Demo</h2>
            <DataCleaningDemo />
          </section>

          {/* Interactive Sales Table */}
          <section className="mb-20 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Interactive Sales Table</h2>
            <InteractiveTable />
          </section>

          {/* SQL Showcase Section */}
        <section className="mb-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">SQL Showcase</h2>
          <SQLShowcase />
        </section>

        {/* Automation Playbooks */}
        <section className="mb-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Automation Playbooks</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {automationPlaybooks.map((playbook, index) => {
              const Icon = playbook.icon;
              return (
                <Card
                  key={index}
                  className="p-6 h-full border border-border/60 bg-muted/20"
                >
                  <Icon className="w-6 h-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{playbook.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {playbook.outcome}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground/70">
                    Stack
                  </p>
                  <p className="text-sm font-medium text-foreground/80">
                    {playbook.tech}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Experiment Results */}
        <section className="mb-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Experiment & Insight Library</h2>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Experiment</th>
                  <th className="px-4 py-3 text-left font-semibold">Primary Metric</th>
                  <th className="px-4 py-3 text-left font-semibold">Lift / Impact</th>
                  <th className="px-4 py-3 text-left font-semibold">Decision</th>
                </tr>
              </thead>
              <tbody>
                {experimentResults.map((result, index) => (
                  <tr key={index} className="border-t border-border/40">
                    <td className="px-4 py-3 font-medium">{result.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{result.metric}</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                      {result.lift}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{result.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Forecast & Scenario Planning */}
        <section className="mb-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Forecast & Scenario Planning</h2>
          <Card className="p-6 border border-border/60 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-start gap-4">
              <GaugeCircle className="w-10 h-10 text-primary" />
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Combine statistical forecasts with driver-based modelling to answer
                  “What happens if we push this lever?” before leadership even asks.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {forecastHighlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Analyst Toolkit */}
        <section className="mb-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Analyst Toolkit</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {toolkitSnippets.map((snippet, index) => (
              <Card
                key={index}
                className="p-6 border border-border/60 bg-muted/10 space-y-3"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {snippet.label}
                </p>
                <div className="overflow-hidden rounded-lg border border-border/50 bg-neutral-950">
                  <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto whitespace-pre">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Insights Section */}
        <section className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Insights & Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightCard
                insight="South region has lower CAC than West but similar conversion rates"
                impact="Shifting 15% of ad spend from West to South could lift new signups by 8-12% next month"
                action="Reallocate spend next cycle, re-check CAC after 30 days"
              />
              <InsightCard
                insight="Product SKU-244 has 37.5% margin but represents only 8% of sales volume"
                impact="Increasing promotion of high-margin products could boost overall profitability by 15-20%"
                action="Launch targeted campaign for high-margin SKUs, track conversion lift"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Interactive;
