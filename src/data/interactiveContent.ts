// Comprehensive data for Interactive page
import {
  Award,
  Building2,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  ShoppingCart,
  Repeat,
  Target,
  Zap,
  Database,
  BarChart3,
  Code2,
  Cloud,
  GitBranch,
  Workflow,
  FileSpreadsheet,
  PieChart,
  LineChart,
  Activity,
  CheckCircle2,
} from "lucide-react";

export interface CaseStudy {
  title: string;
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  approach: string[];
  results: Array<{
    metric: string;
    value: string;
    trend: "up" | "down" | "neutral";
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  technologies: string[];
  timeline: string;
  icon: any;
}

export const caseStudies: CaseStudy[] = [
  {
    title: "E-Commerce Revenue Recovery",
    industry: "Retail",
    companySize: "$50M ARR",
    challenge:
      "45% cart abandonment rate with no visibility into conversion funnel bottlenecks. Marketing team couldn't identify which customer segments were most likely to complete purchases.",
    solution:
      "Built comprehensive funnel analysis dashboard with real-time cohort tracking, implemented predictive abandoned cart recovery system, and created customer segmentation model.",
    approach: [
      "Integrated GA4, Shopify, and email platform data",
      "Built multi-touch attribution model for marketing channels",
      "Created automated abandoned cart workflows with ML scoring",
      "Developed executive dashboard with daily revenue forecasts",
    ],
    results: [
      { metric: "Cart Abandonment", value: "-18%", trend: "up" },
      { metric: "Revenue Recovery", value: "$1.2M annually", trend: "up" },
      { metric: "Conversion Rate", value: "+23%", trend: "up" },
      { metric: "Analysis Time", value: "-12 hrs/week", trend: "up" },
    ],
    testimonial: {
      quote:
        "The abandoned cart recovery system alone paid for the entire engagement within 3 months. We now make data-driven decisions daily instead of quarterly.",
      author: "Sarah Chen",
      role: "VP of E-Commerce Operations",
    },
    technologies: [
      "Google BigQuery",
      "Python",
      "Looker Studio",
      "dbt",
      "Fivetran",
    ],
    timeline: "8 weeks",
    icon: ShoppingCart,
  },
  {
    title: "SaaS Churn Reduction Engine",
    industry: "B2B SaaS",
    companySize: "2,500 customers",
    challenge:
      "Customer success team had no early warning system for churn risk. By the time customers expressed dissatisfaction, it was too late to intervene effectively.",
    solution:
      "Developed predictive churn model using product usage patterns, support tickets, and engagement metrics. Created automated health score dashboard with intervention playbooks.",
    approach: [
      "Analyzed 18 months of customer behavior data",
      "Built logistic regression model with 85% accuracy",
      "Automated weekly health score reports to CS team",
      "Created segmented intervention strategies by risk level",
    ],
    results: [
      { metric: "Churn Rate", value: "-8.3%", trend: "up" },
      { metric: "ARR Saved", value: "$420K", trend: "up" },
      { metric: "Early Detection", value: "45 days sooner", trend: "up" },
      { metric: "CS Efficiency", value: "+35%", trend: "up" },
    ],
    testimonial: {
      quote:
        "We went from reactive firefighting to proactive customer success. The churn prediction model is now central to our entire CS strategy.",
      author: "Michael Rodriguez",
      role: "Director of Customer Success",
    },
    technologies: [
      "Snowflake",
      "Python (scikit-learn)",
      "Tableau",
      "Segment",
      "SQL Server",
    ],
    timeline: "10 weeks",
    icon: Repeat,
  },
  {
    title: "Supply Chain Optimization",
    industry: "Manufacturing",
    companySize: "$200M revenue",
    challenge:
      "Inventory forecasting relied on gut feel and Excel. Regular stockouts cost $50K+ per incident while overstock tied up $2M in working capital.",
    solution:
      "Implemented demand forecasting system using historical sales, seasonality, and external factors. Built automated replenishment recommendations with safety stock optimization.",
    approach: [
      "Cleaned 3 years of messy sales and inventory data",
      "Built ARIMA + XGBoost ensemble forecasting model",
      "Created scenario planning tool for supply chain team",
      "Automated daily reorder point calculations",
    ],
    results: [
      { metric: "Stockout Incidents", value: "-67%", trend: "up" },
      { metric: "Excess Inventory", value: "-$1.8M", trend: "up" },
      { metric: "Forecast Accuracy", value: "+42%", trend: "up" },
      { metric: "Planning Time", value: "-20 hrs/week", trend: "up" },
    ],
    testimonial: {
      quote:
        "Our inventory turns increased by 40% while improving product availability. This system transformed our entire supply chain operation.",
      author: "Jennifer Park",
      role: "VP Supply Chain",
    },
    technologies: [
      "PostgreSQL",
      "Python (Prophet)",
      "Power BI",
      "Azure Data Factory",
      "R",
    ],
    timeline: "12 weeks",
    icon: Activity,
  },
  {
    title: "Marketing ROI Transparency",
    industry: "Financial Services",
    companySize: "$15M marketing budget",
    challenge:
      "CMO couldn't answer which marketing channels actually drove revenue. Attribution was broken, reporting took 2 weeks, and teams optimized for vanity metrics.",
    solution:
      "Built unified marketing data warehouse with multi-touch attribution model. Created executive dashboard showing true ROI by channel, campaign, and creative asset.",
    approach: [
      "Integrated 8 marketing platforms into single data warehouse",
      "Implemented time-decay attribution model",
      "Created automated daily ROI reporting",
      "Built self-service analytics portal for marketing team",
    ],
    results: [
      { metric: "CAC", value: "-31%", trend: "up" },
      { metric: "Marketing ROI", value: "+89%", trend: "up" },
      { metric: "Report Generation", value: "2 weeks → 5 minutes", trend: "up" },
      { metric: "Budget Reallocation", value: "$2.4M optimized", trend: "up" },
    ],
    testimonial: {
      quote:
        "For the first time ever, I can confidently tell the board exactly which marketing investments are paying off and which aren't. Game-changer.",
      author: "David Thompson",
      role: "Chief Marketing Officer",
    },
    technologies: [
      "Snowflake",
      "Fivetran",
      "dbt",
      "Looker",
      "Python",
      "BigQuery",
    ],
    timeline: "14 weeks",
    icon: Target,
  },
];

export interface TechCategory {
  name: string;
  description: string;
  icon: any;
  tools: Array<{
    name: string;
    proficiency: "Expert" | "Advanced" | "Proficient";
    yearsUsed: string;
  }>;
}

export const techStack: TechCategory[] = [
  {
    name: "Databases & Data Warehouses",
    description: "Enterprise-grade data storage and querying",
    icon: Database,
    tools: [
      { name: "SQL Server", proficiency: "Expert", yearsUsed: "8+ years" },
      { name: "PostgreSQL", proficiency: "Expert", yearsUsed: "6+ years" },
      { name: "MySQL", proficiency: "Advanced", yearsUsed: "5+ years" },
      { name: "Snowflake", proficiency: "Expert", yearsUsed: "4+ years" },
      { name: "BigQuery", proficiency: "Advanced", yearsUsed: "3+ years" },
      { name: "Redshift", proficiency: "Advanced", yearsUsed: "3+ years" },
    ],
  },
  {
    name: "Business Intelligence",
    description: "Data visualization and dashboard development",
    icon: BarChart3,
    tools: [
      { name: "Power BI", proficiency: "Expert", yearsUsed: "7+ years" },
      { name: "Tableau", proficiency: "Advanced", yearsUsed: "5+ years" },
      { name: "Looker Studio", proficiency: "Advanced", yearsUsed: "4+ years" },
      { name: "Metabase", proficiency: "Proficient", yearsUsed: "2+ years" },
      { name: "Looker", proficiency: "Advanced", yearsUsed: "3+ years" },
    ],
  },
  {
    name: "Programming & Analytics",
    description: "Data manipulation, modeling, and automation",
    icon: Code2,
    tools: [
      { name: "SQL", proficiency: "Expert", yearsUsed: "10+ years" },
      { name: "Python", proficiency: "Expert", yearsUsed: "6+ years" },
      { name: "R", proficiency: "Advanced", yearsUsed: "4+ years" },
      { name: "DAX", proficiency: "Expert", yearsUsed: "7+ years" },
      { name: "M (Power Query)", proficiency: "Advanced", yearsUsed: "6+ years" },
    ],
  },
  {
    name: "ETL & Data Pipelines",
    description: "Automated data integration and transformation",
    icon: Workflow,
    tools: [
      { name: "dbt", proficiency: "Expert", yearsUsed: "4+ years" },
      { name: "Fivetran", proficiency: "Advanced", yearsUsed: "3+ years" },
      { name: "Airbyte", proficiency: "Advanced", yearsUsed: "2+ years" },
      {
        name: "Azure Data Factory",
        proficiency: "Advanced",
        yearsUsed: "5+ years",
      },
      { name: "Apache Airflow", proficiency: "Proficient", yearsUsed: "2+ years" },
    ],
  },
  {
    name: "Cloud Platforms",
    description: "Scalable infrastructure and services",
    icon: Cloud,
    tools: [
      { name: "Azure", proficiency: "Advanced", yearsUsed: "6+ years" },
      { name: "AWS", proficiency: "Advanced", yearsUsed: "5+ years" },
      { name: "GCP", proficiency: "Proficient", yearsUsed: "3+ years" },
    ],
  },
  {
    name: "Version Control & Collaboration",
    description: "Code management and team workflows",
    icon: GitBranch,
    tools: [
      { name: "Git", proficiency: "Advanced", yearsUsed: "7+ years" },
      { name: "GitHub", proficiency: "Advanced", yearsUsed: "6+ years" },
      { name: "GitLab", proficiency: "Proficient", yearsUsed: "3+ years" },
    ],
  },
  {
    name: "Office & Productivity",
    description: "Essential business tools",
    icon: FileSpreadsheet,
    tools: [
      { name: "Excel", proficiency: "Expert", yearsUsed: "12+ years" },
      { name: "Google Sheets", proficiency: "Advanced", yearsUsed: "8+ years" },
      {
        name: "Power Automate",
        proficiency: "Advanced",
        yearsUsed: "5+ years",
      },
    ],
  },
];

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: any;
  activities: string[];
}

export const processWorkflow: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery & Requirements",
    description:
      "Understand your business goals, data landscape, and success metrics",
    deliverables: [
      "Requirements document",
      "Data source inventory",
      "Success metrics definition",
      "Project roadmap & timeline",
    ],
    duration: "1-2 weeks",
    icon: Target,
    activities: [
      "Stakeholder interviews",
      "Current state assessment",
      "Pain point identification",
      "Goal alignment workshop",
    ],
  },
  {
    number: 2,
    title: "Data Assessment & Audit",
    description:
      "Evaluate data quality, identify gaps, and design architecture",
    deliverables: [
      "Data quality report",
      "Architecture diagram",
      "Gap analysis",
      "Integration plan",
    ],
    duration: "1-2 weeks",
    icon: Database,
    activities: [
      "Data profiling & quality checks",
      "Schema documentation",
      "Data lineage mapping",
      "Security & compliance review",
    ],
  },
  {
    number: 3,
    title: "Pipeline Development",
    description:
      "Build automated data pipelines with transformation logic and testing",
    deliverables: [
      "ETL pipelines",
      "Data models",
      "Automated tests",
      "Documentation",
    ],
    duration: "3-5 weeks",
    icon: Workflow,
    activities: [
      "Pipeline development & testing",
      "Data transformation logic",
      "Error handling & monitoring",
      "Performance optimization",
    ],
  },
  {
    number: 4,
    title: "Dashboard Design & Development",
    description:
      "Create intuitive, actionable dashboards aligned with business needs",
    deliverables: [
      "Interactive dashboards",
      "KPI definitions",
      "User documentation",
      "Mobile-responsive design",
    ],
    duration: "2-4 weeks",
    icon: BarChart3,
    activities: [
      "Wireframe & mockup design",
      "Dashboard development",
      "User acceptance testing",
      "Performance tuning",
    ],
  },
  {
    number: 5,
    title: "Training & Handoff",
    description:
      "Empower your team with knowledge and ongoing support",
    deliverables: [
      "Training sessions",
      "Support documentation",
      "Troubleshooting guide",
      "30-day support period",
    ],
    duration: "1-2 weeks",
    icon: Users,
    activities: [
      "End-user training",
      "Admin training",
      "Q&A sessions",
      "Knowledge transfer",
    ],
  },
];

export interface IndustrySolution {
  industry: string;
  icon: any;
  description: string;
  commonChallenges: string[];
  typicalSolutions: string[];
  keyMetrics: string[];
  averageROI: string;
}

export const industrySolutions: IndustrySolution[] = [
  {
    industry: "E-Commerce & Retail",
    icon: ShoppingCart,
    description:
      "Drive revenue growth through customer analytics, inventory optimization, and marketing ROI",
    commonChallenges: [
      "High cart abandonment rates",
      "Ineffective marketing spend",
      "Inventory stockouts and overstock",
      "Customer lifetime value unknown",
      "Channel attribution unclear",
    ],
    typicalSolutions: [
      "Customer behavior analysis & segmentation",
      "Multi-touch attribution modeling",
      "Demand forecasting & inventory optimization",
      "Abandoned cart recovery automation",
      "Real-time sales dashboards",
    ],
    keyMetrics: [
      "Conversion Rate",
      "Customer Lifetime Value",
      "Cart Abandonment Rate",
      "Inventory Turnover",
      "Marketing ROI",
    ],
    averageROI: "250% within 6 months",
  },
  {
    industry: "SaaS & Technology",
    icon: Zap,
    description:
      "Reduce churn, optimize pricing, and accelerate growth with data-driven insights",
    commonChallenges: [
      "High customer churn",
      "Unclear product-market fit",
      "Inefficient customer acquisition",
      "Poor feature adoption",
      "Pricing optimization needed",
    ],
    typicalSolutions: [
      "Predictive churn modeling",
      "Product usage analytics",
      "Cohort analysis & retention tracking",
      "Feature adoption dashboards",
      "MRR/ARR forecasting models",
    ],
    keyMetrics: [
      "Monthly Churn Rate",
      "Customer Acquisition Cost",
      "LTV:CAC Ratio",
      "Net Revenue Retention",
      "Product Engagement Score",
    ],
    averageROI: "300% within 12 months",
  },
  {
    industry: "Healthcare",
    icon: Activity,
    description:
      "Improve patient outcomes, optimize operations, and ensure compliance",
    commonChallenges: [
      "Patient flow bottlenecks",
      "Resource allocation inefficiency",
      "Data silos across systems",
      "Compliance reporting overhead",
      "Readmission rates too high",
    ],
    typicalSolutions: [
      "Patient flow optimization dashboards",
      "Predictive readmission modeling",
      "Resource utilization analytics",
      "Compliance reporting automation",
      "Clinical outcomes tracking",
    ],
    keyMetrics: [
      "Patient Wait Times",
      "Bed Utilization Rate",
      "Readmission Rate",
      "Staff Efficiency",
      "Cost per Patient",
    ],
    averageROI: "180% within 18 months",
  },
  {
    industry: "Financial Services",
    icon: DollarSign,
    description:
      "Enhance risk management, detect fraud, and improve customer experience",
    commonChallenges: [
      "Fraud detection gaps",
      "Risk assessment inefficiency",
      "Customer churn in competitive market",
      "Regulatory compliance burden",
      "Cross-sell opportunities missed",
    ],
    typicalSolutions: [
      "Real-time fraud detection systems",
      "Risk scoring models",
      "Customer propensity modeling",
      "Regulatory reporting automation",
      "Portfolio analytics dashboards",
    ],
    keyMetrics: [
      "Fraud Detection Rate",
      "Risk-Adjusted Return",
      "Customer Attrition",
      "Compliance Score",
      "Cross-Sell Rate",
    ],
    averageROI: "220% within 12 months",
  },
  {
    industry: "Manufacturing",
    icon: Building2,
    description:
      "Optimize supply chain, reduce waste, and improve production efficiency",
    commonChallenges: [
      "Inventory management complexity",
      "Supply chain visibility gaps",
      "Production downtime costs",
      "Quality control inconsistency",
      "Demand forecasting accuracy",
    ],
    typicalSolutions: [
      "Predictive maintenance modeling",
      "Supply chain optimization analytics",
      "Quality control dashboards",
      "Demand forecasting with ML",
      "OEE (Overall Equipment Effectiveness) tracking",
    ],
    keyMetrics: [
      "Inventory Turnover",
      "Production Downtime",
      "Quality Defect Rate",
      "On-Time Delivery",
      "Supply Chain Cost",
    ],
    averageROI: "190% within 15 months",
  },
];

export interface ROIMetric {
  category: string;
  description: string;
  averageValue: string;
  timeframe: string;
  icon: any;
}

export const roiMetrics: ROIMetric[] = [
  {
    category: "Time Savings",
    description: "Reduction in manual reporting and data preparation",
    averageValue: "10-20 hours per week",
    timeframe: "Immediate",
    icon: Clock,
  },
  {
    category: "Cost Reduction",
    description: "Lower operational costs through automation and efficiency",
    averageValue: "15-30% reduction",
    timeframe: "3-6 months",
    icon: TrendingUp,
  },
  {
    category: "Revenue Impact",
    description: "Increased revenue from better decision-making",
    averageValue: "$500K - $2M annually",
    timeframe: "6-12 months",
    icon: DollarSign,
  },
  {
    category: "Team Productivity",
    description: "More time for strategic work vs. manual tasks",
    averageValue: "40-60% productivity gain",
    timeframe: "1-3 months",
    icon: Users,
  },
  {
    category: "Decision Speed",
    description: "Faster access to insights for critical decisions",
    averageValue: "Days to minutes",
    timeframe: "Immediate",
    icon: Zap,
  },
];

export const comparisonData = {
  before: {
    title: "Before Analytics Transformation",
    challenges: [
      "Manual Excel-based reporting taking 15+ hours weekly",
      "Data scattered across multiple systems with no single source of truth",
      "Decisions based on gut feel and outdated reports",
      "Can't answer 'why' behind the numbers, only see 'what' happened",
      "Critical metrics discovered weeks after the fact",
      "Teams working with different definitions of the same metric",
    ],
  },
  after: {
    title: "After Analytics Transformation",
    benefits: [
      "Automated dashboards updated in real-time, accessible 24/7",
      "Unified data warehouse with consistent, trustworthy metrics",
      "Data-driven decisions with predictive insights and scenario planning",
      "Deep-dive analysis capabilities answering 'why' and 'what if' questions",
      "Real-time alerts for critical metric changes and anomalies",
      "Organization-wide alignment on KPIs and definitions",
    ],
  },
};

export const faqData = [
  {
    question: "How long does a typical analytics project take?",
    answer:
      "Most projects range from 6-14 weeks depending on complexity. A simple dashboard might take 2-3 weeks, while a complete data warehouse with multiple dashboards and automated pipelines typically takes 10-14 weeks. I provide detailed timelines during the discovery phase.",
  },
  {
    question: "What if our data is messy or incomplete?",
    answer:
      "That's normal! Most companies have data quality issues. Part of my process includes data assessment and cleaning. I'll identify gaps, inconsistencies, and quality issues early, then build transformation logic to ensure reliable, accurate analytics. Data cleaning is typically 30-40% of the work.",
  },
  {
    question: "Can you work with our existing tools and systems?",
    answer:
      "Yes! I'm tool-agnostic and have experience with 20+ different platforms. Whether you use Power BI, Tableau, Snowflake, SQL Server, or any other tools, I can work within your existing tech stack. I can also recommend upgrades if your current tools are limiting your capabilities.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Every project includes 30 days of post-launch support for questions, minor adjustments, and troubleshooting. I also offer retainer-based ongoing support for dashboard maintenance, adding new metrics, training new team members, and strategic analytics consulting.",
  },
  {
    question: "How do you ensure data security and compliance?",
    answer:
      "Security is paramount. I follow industry best practices including role-based access control, data encryption, and compliance with regulations like GDPR and HIPAA when applicable. All credentials are stored securely, and I can work within your security policies and approval processes.",
  },
  {
    question: "What's your typical engagement model?",
    answer:
      "I offer both project-based and retainer engagements. Project-based works best for defined deliverables (new dashboard, data pipeline, etc.) with fixed scope and timeline. Retainer engagements suit ongoing analytics support, continuous improvement, and strategic partnership. We'll discuss what fits your needs.",
  },
  {
    question: "How much does analytics work typically cost?",
    answer:
      "Investment varies by scope, but most projects range from $15K-$75K. A simple dashboard might be $15K-$25K, while a complete analytics transformation with multiple dashboards, data warehouse, and automation could be $50K-$75K. ROI typically exceeds 200-300% within the first year.",
  },
  {
    question: "Will our team be able to maintain the solution after you leave?",
    answer:
      "Absolutely! Knowledge transfer is built into every project. I provide comprehensive documentation, training sessions for both end-users and technical staff, and create solutions that your team can maintain and extend. The goal is to make you self-sufficient, not dependent.",
  },
];
