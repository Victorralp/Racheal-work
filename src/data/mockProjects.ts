export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  coverImage: string;
  images: string[];
  published: boolean;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Sales Performance Dashboard",
    summary: "Power BI dashboard for tracking revenue by region and identifying underperforming branches.",
    problem: "Leadership had no visibility into underperforming branches. Sales data was scattered across 4 different Excel files with inconsistent naming conventions.",
    solution: "Merged 4 data sources using Python pandas, cleaned product names with regex patterns, built drill-down dashboard in Power BI with region, branch, and product-level filters. Implemented automatic refresh from SQL database.",
    impact: "Cut reporting time by 5hrs/week and revealed 2 loss-making regions that were previously hidden in aggregated reports. Led to strategic decision to close 1 branch and restructure another.",
    tools: ["Power BI", "SQL", "Excel", "Python"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop"
    ],
    published: true
  },
  {
    id: "2",
    title: "Marketing ROI Analysis",
    summary: "Automated reporting system to track marketing campaign performance across channels.",
    problem: "Marketing team spent 10+ hours weekly manually pulling data from Google Ads, Facebook, and email platforms to report ROI.",
    solution: "Built automated ETL pipeline using Python to extract data from APIs, transform metrics into unified KPIs, and load into SQL database. Created automated Power BI reports that refresh daily.",
    impact: "+23% Marketing ROI improvement by identifying underperforming ad sets and reallocating budget. Saved 10+ hours/week of manual reporting work.",
    tools: ["Python", "SQL", "Power BI", "APIs"],
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop"
    ],
    published: true
  },
  {
    id: "3",
    title: "Inventory Optimization Model",
    summary: "Predictive model to optimize stock levels and reduce carrying costs.",
    problem: "Company had $2M in excess inventory while simultaneously experiencing stockouts on popular items.",
    solution: "Analyzed 150k+ rows of historical sales data, built forecasting model using moving averages and seasonal decomposition, created inventory recommendations dashboard.",
    impact: "Reduced excess inventory by 35% while decreasing stockouts by 40%. Freed up $700k in working capital.",
    tools: ["Python", "Excel", "Tableau", "SQL"],
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=675&fit=crop"
    ],
    published: true
  }
];
