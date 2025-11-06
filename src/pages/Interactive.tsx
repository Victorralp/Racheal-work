import { useMemo, useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DataCleaningDemo } from "@/components/DataCleaningDemo";
import { SQLShowcase } from "@/components/SQLShowcase";
import { InsightCard } from "@/components/InsightCard";
import { DashboardDemo } from "@/components/DashboardDemo";
import { InteractiveTable } from "@/components/InteractiveTable";
import { MiniDashboard } from "@/components/MiniDashboard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { TechStack } from "@/components/TechStack";
import { ProcessWorkflow } from "@/components/ProcessWorkflow";
import { useDemoProjects, DemoProject } from "@/hooks/use-demo-projects";
import {
  caseStudies,
  techStack,
  processWorkflow,
  industrySolutions,
  roiMetrics,
  comparisonData,
  faqData,
} from "@/data/interactiveContent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  TrendingUp,
  Workflow,
  Clock,
  Bolt,
  GaugeCircle,
  Database,
  BarChart3,
  Code2,
  Lightbulb,
  Target,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  Award,
  Zap,
  LineChart,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
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
  const { data: demoProjects, isLoading: loadingDemoProjects } =
    useDemoProjects();
  const [activeScenario, setActiveScenario] = useState<string | undefined>();
  const [activeSection, setActiveSection] = useState<string>("intro");

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scenarioList = useMemo(() => demoProjects ?? [], [demoProjects]);

  const activeScenarioData = useMemo(() => {
    if (!scenarioList.length) return undefined;
    const id = activeScenario ?? scenarioList[0]?.id;
    return scenarioList.find((item) => item.id === id) ?? scenarioList[0];
  }, [activeScenario, scenarioList]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navigationSections = [
    { id: "intro", label: "Overview", icon: PlayCircle },
    { id: "scenarios", label: "Scenarios", icon: Target },
    { id: "case-studies", label: "Case Studies", icon: Award },
    { id: "dashboard", label: "Dashboards", icon: BarChart3 },
    { id: "cleaning", label: "Data Quality", icon: Database },
    { id: "sql", label: "SQL", icon: Code2 },
    { id: "automation", label: "Automation", icon: Bolt },
    { id: "tools", label: "Tech Stack", icon: Zap },
    { id: "process", label: "Process", icon: Workflow },
    { id: "insights", label: "Insights", icon: Lightbulb },
  ];

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

      {/* Sticky Section Navigation */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/60 hidden lg:block">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollArea className="w-full">
            <div className="flex gap-1 py-3">
              {navigationSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <main className="flex-1 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section
            id="intro"
            ref={(el) => (sectionRefs.current["intro"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="text-center space-y-6 mb-12">
              <Badge className="inline-flex" variant="secondary">
                Live Demonstrations
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-cyan-400 to-primary/60 bg-clip-text text-transparent">
                Interactive Analytics Showcase
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience real-world data analytics in action. Explore live
                dashboards, data transformations, SQL queries, and business
                insights—exactly how I deliver value to clients.
              </p>
            </div>

            {/* Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 border-border/60 bg-gradient-to-br from-primary/5 to-primary/10">
                <Database className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Real Data Scenarios
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore authentic business problems with actual data cleaning,
                  analysis, and visualization workflows.
                </p>
              </Card>
              <Card className="p-6 border-border/60 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10">
                <BarChart3 className="w-8 h-8 text-cyan-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Interactive Dashboards
                </h3>
                <p className="text-sm text-muted-foreground">
                  See how I build executive dashboards with filters, KPIs, and
                  drill-down capabilities that drive decisions.
                </p>
              </Card>
              <Card className="p-6 border-border/60 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
                <Code2 className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Actionable Insights
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every analysis comes with clear recommendations, expected
                  impact, and next steps for leadership.
                </p>
              </Card>
            </div>

            {/* Key Capabilities Overview */}
            <Card className="p-8 border-border/60 bg-muted/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                What You'll See Below
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Custom Business Scenarios</p>
                    <p className="text-sm text-muted-foreground">
                      Industry-specific case studies with metrics, datasets, and
                      recommended actions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Live Dashboard Filtering</p>
                    <p className="text-sm text-muted-foreground">
                      Interactive KPI cards and charts that respond to your
                      selections
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Data Quality Demonstrations</p>
                    <p className="text-sm text-muted-foreground">
                      Before/after views showing how messy data becomes reliable
                      insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Production SQL Queries</p>
                    <p className="text-sm text-muted-foreground">
                      Real queries I use to answer complex business questions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Automation Workflows</p>
                    <p className="text-sm text-muted-foreground">
                      Examples of reporting pipelines that save hours of manual
                      work
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Business Impact Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Every insight tied to revenue, cost savings, or strategic
                      advantage
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Interactive Scenarios */}
          <section
            id="scenarios"
            ref={(el) => (sectionRefs.current["scenarios"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">
                      Real Business Scenarios
                    </h2>
                  </div>
                  <p className="text-muted-foreground max-w-3xl leading-relaxed">
                    Explore industry-specific case studies that mirror real
                    client challenges. Each scenario walks through the problem,
                    my analytical approach, key metrics, data transformations,
                    and actionable recommendations with measurable impact.
                  </p>
                </div>
                {scenarioList.length ? (
                  <Badge variant="outline" className="flex-shrink-0">
                    {scenarioList.length} scenario
                    {scenarioList.length > 1 ? "s" : ""}
                  </Badge>
                ) : null}
              </div>
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Pro Tip:</strong> These
                  scenarios are fully customizable. In the admin panel, I can
                  create tailored demonstrations for your specific industry,
                  data stack, and business questions.
                </p>
              </Card>
            </div>

            {loadingDemoProjects ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : !scenarioList.length ? (
              <Card className="p-8 text-center bg-muted/40 border-dashed border-border">
                <p className="text-muted-foreground">
                  No custom scenarios yet. Log in to the admin dashboard to
                  publish your first interactive walkthrough.
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
          <section
            id="dashboard"
            ref={(el) => (sectionRefs.current["dashboard"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">Executive Dashboard</h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-4 leading-relaxed">
                A fully interactive dashboard demonstrating how I present
                complex data to leadership. Use the filters to drill down by
                time period, region, or product category. Watch KPIs update in
                real-time—exactly how your team would interact with production
                dashboards.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Badge variant="secondary" className="gap-1">
                  <Zap className="w-3 h-3" />
                  Real-time Filtering
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <LineChart className="w-3 h-3" />
                  Dynamic Charts
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Target className="w-3 h-3" />
                  Key Performance Indicators
                </Badge>
              </div>
            </div>
            <DashboardDemo />
          </section>

          {/* Mini Dashboard Grid */}
          <section className="mb-20">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-3">
                Multi-Metric Dashboard Grid
              </h3>
              <p className="text-muted-foreground max-w-4xl leading-relaxed">
                Modern analytics requires monitoring multiple metrics
                simultaneously. This grid layout shows how I design operational
                dashboards for teams who need at-a-glance visibility across
                sales, marketing, operations, and finance.
              </p>
            </div>
            <MiniDashboard />
            <Card className="mt-6 p-6 bg-muted/20 border-border/60">
              <h4 className="font-semibold mb-2">Dashboard Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Mobile-first design:</strong> All dashboards are
                    responsive and readable on any device
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Performance optimization:</strong> Fast loading even
                    with large datasets (100k+ rows)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Automated refresh:</strong> Data updates on schedule
                    without manual intervention
                  </span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Data Cleaning Section */}
          <section
            id="cleaning"
            ref={(el) => (sectionRefs.current["cleaning"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">
                  Data Quality & Transformation
                </h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-6 leading-relaxed">
                Raw data is rarely analysis-ready. Toggle between "Raw" and
                "Cleaned" views below to see the transformations I apply: fixing
                inconsistent formatting, handling nulls, standardizing naming
                conventions, and validating business rules. Clean data =
                reliable insights.
              </p>
              <Card className="p-6 bg-destructive/5 border-destructive/20 mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Common Data Quality Issues I Fix
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Duplicate records inflating metrics</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Inconsistent date formats across systems</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Missing or null critical fields</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      <span>
                        Typos in category labels (PROD vs Prod vs prod)
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Trailing spaces breaking joins</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Invalid or outlier values skewing analysis</span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <DataCleaningDemo />
            <Card className="mt-6 p-6 bg-emerald-500/5 border-emerald-500/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Result:</strong> After
                cleaning, data accuracy improves by an average of 23%, and
                downstream analysis time is reduced by 40% because teams trust
                the numbers.
              </p>
            </Card>
          </section>

          {/* Interactive Sales Table */}
          <section className="mb-20">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-3">
                Sortable & Filterable Data Tables
              </h3>
              <p className="text-muted-foreground max-w-4xl leading-relaxed">
                Tables aren't just for display—they're exploration tools. Click
                column headers to sort, use search to filter, and interact with
                data just like you would in Excel, but accessible from anywhere
                via the web.
              </p>
            </div>
            <InteractiveTable />
          </section>

          {/* SQL Showcase Section */}
          <section
            id="sql"
            ref={(el) => (sectionRefs.current["sql"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">SQL Query Showcase</h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-4 leading-relaxed">
                See how I translate business questions into SQL queries. Each
                example shows the original question, the query logic, and the
                resulting data. These are production-grade queries optimized for
                performance on large datasets.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <Card className="p-4 border-border/60 bg-muted/20">
                  <p className="font-semibold mb-1">Complex Joins</p>
                  <p className="text-muted-foreground">
                    Connecting 5+ tables to build complete customer journey
                    views
                  </p>
                </Card>
                <Card className="p-4 border-border/60 bg-muted/20">
                  <p className="font-semibold mb-1">Window Functions</p>
                  <p className="text-muted-foreground">
                    Calculating cohorts, running totals, and period-over-period
                    changes
                  </p>
                </Card>
                <Card className="p-4 border-border/60 bg-muted/20">
                  <p className="font-semibold mb-1">Query Optimization</p>
                  <p className="text-muted-foreground">
                    Reducing execution time from minutes to seconds with proper
                    indexing
                  </p>
                </Card>
              </div>
            </div>
            <SQLShowcase />
          </section>

          {/* Automation Playbooks */}
          <section
            id="automation"
            ref={(el) => (sectionRefs.current["automation"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Bolt className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">
                  Automation & Workflow Engineering
                </h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-6 leading-relaxed">
                Manual reporting wastes time and introduces errors. I build
                automated pipelines that extract, transform, and deliver
                insights on schedule—freeing your team to focus on decisions
                instead of data wrangling.
              </p>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-3">
                  Time Savings from Automation
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-primary">10-15 hrs</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      saved per week on manual reporting
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">95%</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      reduction in data entry errors
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">24/7</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      monitoring with automated alerts
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Example Automation Projects
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {automationPlaybooks.map((playbook, index) => {
                const Icon = playbook.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 h-full border border-border/60 bg-muted/20"
                  >
                    <Icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {playbook.title}
                    </h3>
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
          <section className="mb-20">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-3">
                A/B Testing & Experimentation
              </h3>
              <p className="text-muted-foreground max-w-4xl leading-relaxed mb-4">
                Data-driven organizations test before they scale. I design
                experiments with proper sample sizing, statistical significance
                testing, and clear success criteria. Below are examples of tests
                I've analyzed and the business decisions they informed.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Experiment
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Primary Metric
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Lift / Impact
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Decision
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {experimentResults.map((result, index) => (
                    <tr key={index} className="border-t border-border/40">
                      <td className="px-4 py-3 font-medium">{result.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {result.metric}
                      </td>
                      <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                        {result.lift}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {result.decision}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Forecast & Scenario Planning */}
          <section className="mb-20 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Forecast & Scenario Planning
            </h2>
            <Card className="p-6 border border-border/60 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-start gap-4">
                <GaugeCircle className="w-10 h-10 text-primary" />
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Combine statistical forecasts with driver-based modelling to
                    answer “What happens if we push this lever?” before
                    leadership even asks.
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
          <section
            id="insights"
            ref={(el) => (sectionRefs.current["insights"] = el)}
            className="mb-20 max-w-5xl mx-auto scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">
                  Business Insights & Recommendations
                </h2>
              </div>
              <p className="text-muted-foreground max-w-4xl leading-relaxed">
                Every analysis concludes with actionable insights. I don't just
                present numbers—I translate data into strategic recommendations
                with clear expected impact and concrete next steps for your
                team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            <Card className="p-6 bg-muted/20 border-border/60">
              <h4 className="font-semibold mb-3">
                Every Insight Includes Three Components
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-1 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    The Finding
                  </p>
                  <p className="text-muted-foreground">
                    What the data reveals in plain business language
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    The Impact
                  </p>
                  <p className="text-muted-foreground">
                    Quantified business value (revenue, cost, time savings)
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    The Action
                  </p>
                  <p className="text-muted-foreground">
                    Specific next steps with timeline and success metrics
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Case Studies Section */}
          <section
            id="case-studies"
            ref={(el) => (sectionRefs.current["case-studies"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">Client Success Stories</h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-6 leading-relaxed">
                Real projects. Real results. Real impact. These case studies
                showcase how I've helped companies across industries solve
                complex data challenges and achieve measurable business
                outcomes. Every number is verified, every testimonial is
                authentic.
              </p>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-3">Why Case Studies Matter</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Anyone can claim they "do data analytics." These detailed case
                  studies prove capability with specific challenges, solutions,
                  timelines, technologies, and most importantly—documented ROI.
                  Notice the pattern: every project delivers 200%+ ROI within 12
                  months.
                </p>
              </Card>
            </div>

            <div className="grid gap-8">
              {caseStudies.map((caseStudy, index) => (
                <CaseStudyCard
                  key={index}
                  caseStudy={caseStudy}
                  index={index}
                />
              ))}
            </div>

            <Card className="mt-8 p-8 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">
                  Your Success Story Could Be Next
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  These companies started with messy data, unclear metrics, and
                  decision paralysis. Now they have automated dashboards,
                  predictive insights, and data-driven cultures. Let's build
                  your case study.
                </p>
                <Button asChild size="lg" className="mt-4">
                  <Link to="/contact">
                    <span className="flex items-center gap-2">
                      Start Your Transformation
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </Card>
          </section>

          {/* Tech Stack & Tools Section */}
          <section
            id="tools"
            ref={(el) => (sectionRefs.current["tools"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">
                  Technical Stack & Expertise
                </h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-6 leading-relaxed">
                I'm tool-agnostic and platform-flexible. Whether you use SQL
                Server or Snowflake, Power BI or Tableau, Python or R—I can work
                within your existing infrastructure or recommend optimal
                upgrades based on your needs and budget.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 bg-muted/20 border-border/60">
                  <p className="text-3xl font-bold text-primary mb-1">30+</p>
                  <p className="text-sm text-muted-foreground">
                    Tools & Platforms
                  </p>
                </Card>
                <Card className="p-4 bg-muted/20 border-border/60">
                  <p className="text-3xl font-bold text-primary mb-1">10+</p>
                  <p className="text-sm text-muted-foreground">
                    Years SQL Experience
                  </p>
                </Card>
                <Card className="p-4 bg-muted/20 border-border/60">
                  <p className="text-3xl font-bold text-primary mb-1">7</p>
                  <p className="text-sm text-muted-foreground">
                    Core Technology Categories
                  </p>
                </Card>
              </div>
            </div>

            <TechStack techStack={techStack} />

            <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
              <h4 className="font-semibold mb-2">Don't See Your Tool?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This list represents my most frequently used tools. I've worked
                with 40+ data platforms throughout my career. If your
                organization uses something specific, I can quickly adapt—or I
                can help you evaluate whether it's time to modernize your stack.
              </p>
            </Card>
          </section>

          {/* Process & Workflow Section */}
          <section
            id="process"
            ref={(el) => (sectionRefs.current["process"] = el)}
            className="mb-20 scroll-mt-32"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Workflow className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">How We'll Work Together</h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-6 leading-relaxed">
                Every successful analytics project follows a structured process.
                Here's my proven 5-phase approach that ensures we deliver on
                time, on budget, and with measurable impact. Timelines are
                flexible based on your urgency and complexity.
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4 bg-muted/20 border-border/60">
                  <p className="text-2xl font-bold text-primary mb-1">
                    6-14 weeks
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Typical Project Duration
                  </p>
                </Card>
                <Card className="p-4 bg-muted/20 border-border/60">
                  <p className="text-2xl font-bold text-primary mb-1">5</p>
                  <p className="text-sm text-muted-foreground">
                    Structured Phases
                  </p>
                </Card>
                <Card className="p-4 bg-muted/20 border-border/60">
                  <p className="text-2xl font-bold text-primary mb-1">
                    30 days
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Post-Launch Support
                  </p>
                </Card>
                <Card className="p-4 bg-muted/20 border-border/60">
                  <p className="text-2xl font-bold text-primary mb-1">100%</p>
                  <p className="text-sm text-muted-foreground">
                    Documentation Included
                  </p>
                </Card>
              </div>
            </div>

            <ProcessWorkflow processSteps={processWorkflow} />
          </section>

          {/* Industry Solutions Section */}
          <section className="mb-20 scroll-mt-32">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">
                  Industry-Specific Solutions
                </h2>
              </div>
              <p className="text-muted-foreground max-w-4xl mb-6 leading-relaxed">
                Every industry has unique analytics challenges. I've developed
                specialized expertise across multiple sectors, understanding not
                just the technical requirements but also the business context,
                regulatory considerations, and success metrics that matter most.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {industrySolutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 border-border/60 bg-gradient-to-br from-card to-card/40 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">
                          {solution.industry}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {solution.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                          Common Challenges
                        </h4>
                        <ul className="space-y-1">
                          {solution.commonChallenges
                            .slice(0, 3)
                            .map((challenge, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="text-destructive mt-0.5">
                                  •
                                </span>
                                <span className="text-muted-foreground">
                                  {challenge}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                          Typical Solutions
                        </h4>
                        <ul className="space-y-1">
                          {solution.typicalSolutions
                            .slice(0, 3)
                            .map((sol, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-foreground/90">
                                  {sol}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-border/40">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">
                            Average ROI
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          >
                            {solution.averageROI}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8 p-6 bg-muted/20 border-border/60">
              <h4 className="font-semibold mb-2">Don't See Your Industry?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These represent my most common client industries, but I've
                worked across 15+ sectors including logistics, education,
                nonprofit, and more. The fundamentals of good analytics apply
                everywhere—I can quickly adapt to your industry's unique needs.
              </p>
            </Card>
          </section>

          {/* ROI & Impact Metrics Section */}
          <section className="mb-20 scroll-mt-32">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">
                  Expected ROI & Business Impact
                </h2>
              </div>
              <p className="text-muted-foreground max-w-4xl leading-relaxed">
                Analytics investments should pay for themselves. Here's what
                clients typically see within the first year of engagement. These
                aren't promises—they're patterns from real implementations.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {roiMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 border-border/60 bg-gradient-to-br from-card to-card/40"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          {metric.category}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {metric.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-2xl font-bold text-primary">
                        {metric.averageValue}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {metric.timeframe}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-destructive/20 bg-destructive/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-destructive">⚠</span>
                  {comparisonData.before.title}
                </h3>
                <ul className="space-y-2">
                  {comparisonData.before.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-destructive mt-0.5">✗</span>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 border-emerald-500/20 bg-emerald-500/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {comparisonData.after.title}
                </h3>
                <ul className="space-y-2">
                  {comparisonData.after.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20 scroll-mt-32">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="text-muted-foreground max-w-4xl leading-relaxed">
                Common questions from prospective clients. Don't see your
                question? Let's talk—I'm happy to discuss your specific
                situation.
              </p>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border/60 rounded-lg px-6 bg-card/50"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Still Have Questions?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Every organization has unique needs and constraints.
                    Schedule a free 30-minute consultation to discuss your
                    specific challenges, timeline, and budget.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/contact">Ask a Question</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Final CTA Section */}
          <section className="mb-20">
            <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">
                Ready to See Your Data in Action?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                These demonstrations are just the beginning. Let's discuss how I
                can build custom analytics solutions tailored to your specific
                business challenges and data stack.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg">
                  <Link to="/contact">
                    <span className="flex items-center gap-2">
                      Schedule a Consultation
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/projects">
                    <span className="flex items-center gap-2">
                      View Real Projects
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-4">
                  What you can expect when we work together:
                </p>
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Custom Dashboard Development
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Data Pipeline Automation
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Strategic Analytics Support
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Training & Documentation
                  </Badge>
                </div>
              </div>
            </Card>
          </section>

          {/* Sticky Mobile CTA */}
          <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
            <Button asChild size="lg" className="w-full shadow-lg">
              <Link to="/contact">
                <span className="flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Interactive;
