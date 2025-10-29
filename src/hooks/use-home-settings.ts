import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const HOME_SETTINGS_DOC = doc(db, "settings", "home");
const HOME_SETTINGS_QUERY_KEY = ["home-settings"];

export interface HeroStat {
  value: string;
  label: string;
}

export interface HomeSkill {
  name: string;
  level: string;
}

export interface HomeAccomplishment {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

export interface HomeCapability {
  icon: string;
  title: string;
  description: string;
}

export interface HomeProcessStep {
  title: string;
  description: string;
}

export interface HomeSettings {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  trustHeading: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  heroStats: HeroStat[];
  trustLogos: string[];
  accomplishments: HomeAccomplishment[];
  skills: HomeSkill[];
  capabilities: HomeCapability[];
  impactTitle: string;
  impactSubtitle: string;
  impactMetrics: HeroStat[];
  accomplishmentsTitle: string;
  accomplishmentsSubtitle: string;
  skillsTitle: string;
  skillsSubtitle: string;
  capabilitiesTitle: string;
  capabilitiesSubtitle: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: HomeProcessStep[];
  selectedWorkTitle: string;
  selectedWorkSubtitle: string;
  selectedWorkCtaLabel: string;
  selectedWorkCtaLink: string;
  ctaHeadline: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaButtonLink: string;
  updatedAt?: Timestamp | null;
}

export interface UpdateHomeSettingsInput extends HomeSettings {}

const DEFAULT_HOME_SETTINGS: HomeSettings = {
  heroBadge: "Data Analyst • Business Intelligence • Automation",
  heroTitle: "I turn raw data into decisions.",
  heroHighlight: "Rachael Olarinoye",
  heroSubtitle:
    "and I help businesses make more money and waste less time. I build executive dashboards, automate workflows, and turn data chaos into strategic decisions that actually impact the bottom line.",
  trustHeading: "Trusted by teams at",
  primaryCtaLabel: "See Interactive Demo",
  primaryCtaLink: "/interactive",
  secondaryCtaLabel: "Work With Me",
  secondaryCtaLink: "/contact",
  heroStats: [
    { value: "$700K+", label: "Capital freed for clients" },
    { value: "12x", label: "Faster reporting turnaround" },
    { value: "10+", label: "Executive dashboards shipped" },
  ],
  trustLogos: ["Flutterwave", "Sterling Bank", "PiggyVest", "Workcrate"],
  accomplishments: [
    {
      icon: "Trophy",
      title: "Top 5% Data Analyst",
      description:
        "Recognized for exceptional performance in delivering high-impact analytics projects",
      highlight: "Elite Performer",
    },
    {
      icon: "Award",
      title: "$700K+ Capital Freed",
      description:
        "Optimized inventory management system, unlocking significant working capital",
      highlight: "Major Win",
    },
    {
      icon: "Star",
      title: "23% ROI Increase",
      description:
        "Transformed marketing analytics, driving measurable profit improvement",
      highlight: "Revenue Driver",
    },
    {
      icon: "Briefcase",
      title: "5+ Years Experience",
      description:
        "Proven track record across multiple industries and business functions",
      highlight: "Seasoned Pro",
    },
  ],
  skills: [
    { name: "Power BI", level: "Expert" },
    { name: "SQL", level: "Expert" },
    { name: "Python", level: "Advanced" },
    { name: "Excel", level: "Expert" },
    { name: "Tableau", level: "Advanced" },
    { name: "Data Cleaning", level: "Expert" },
  ],
  capabilities: [
    {
      icon: "Database",
      title: "Data Engineering",
      description:
        "Build pipelines that collect and organize data automatically—no more manual exports eating up your team's time",
    },
    {
      icon: "BarChart3",
      title: "Executive Dashboards",
      description:
        "Real-time dashboards that show you exactly where money is being made (or lost) so you can act fast",
    },
    {
      icon: "FileSpreadsheet",
      title: "Data Cleaning & Quality",
      description:
        "Fix the mess in your data so you can trust your numbers and make confident decisions",
    },
    {
      icon: "Code2",
      title: "SQL & Python Automation",
      description:
        "Automate the boring stuff. Save hours every week and redirect that time to high-value work",
    },
    {
      icon: "TrendingUp",
      title: "Business Intelligence",
      description:
        "Get clear recommendations backed by data—not guesswork. Know exactly what to do next to increase revenue",
    },
    {
      icon: "Sparkles",
      title: "Process Optimization",
      description:
        "Cut operational waste and streamline workflows. More efficiency = more profit",
    },
  ],
  impactTitle: "Proven Business Impact",
  impactSubtitle: "Real results from real projects",
  impactMetrics: [
    { value: "+23%", label: "Marketing ROI improvement" },
    { value: "10+ hrs", label: "Manual reporting time saved / month" },
    { value: "150k+ rows", label: "Records cleaned and automated" },
  ],
  accomplishmentsTitle: "Why Teams Trust Me",
  accomplishmentsSubtitle: "Data storytelling that turns into action",
  skillsTitle: "Technical Expertise",
  skillsSubtitle: "Tools I use daily to deliver results",
  capabilitiesTitle: "What I Deliver",
  capabilitiesSubtitle: "Analytics, automation, and strategy in one place",
  processTitle: "My Process",
  processSubtitle: "Fast, focused, and always ROI-driven",
  processSteps: [
    {
      title: "Understand the Money",
      description: "Identify the revenue opportunity or cost leak worth solving first.",
    },
    {
      title: "Fix the Data",
      description: "Clean and model the data so leadership can trust every number.",
    },
    {
      title: "Find the Insights",
      description: "Surface the drivers that explain performance and unlock action.",
    },
    {
      title: "Show You the Money",
      description: "Translate findings into projected impact and a clear execution plan.",
    },
  ],
  selectedWorkTitle: "Selected Work",
  selectedWorkSubtitle: "Real projects with measurable business impact",
  selectedWorkCtaLabel: "View All Projects",
  selectedWorkCtaLink: "/projects",
  ctaHeadline: "Your competitors are using their data better than you.",
  ctaDescription:
    "Let's fix that. I turn data into revenue, cut operational waste, and give you the insights that actually move your business forward. Fast response guaranteed—because time is money.",
  ctaButtonLabel: "Let's Talk Numbers",
  ctaButtonLink: "/contact",
};

const sanitizeArray = <T,>(value: unknown, fallback: T[]): T[] => {
  if (!Array.isArray(value)) return fallback;
  return value;
};

const fetchHomeSettings = async (): Promise<HomeSettings> => {
  const snapshot = await getDoc(HOME_SETTINGS_DOC);

  if (!snapshot.exists()) {
    return DEFAULT_HOME_SETTINGS;
  }

  const data = snapshot.data();

  return {
    heroBadge:
      typeof data.heroBadge === "string"
        ? data.heroBadge
        : DEFAULT_HOME_SETTINGS.heroBadge,
    heroTitle:
      typeof data.heroTitle === "string"
        ? data.heroTitle
        : DEFAULT_HOME_SETTINGS.heroTitle,
    heroHighlight:
      typeof data.heroHighlight === "string"
        ? data.heroHighlight
        : DEFAULT_HOME_SETTINGS.heroHighlight,
    heroSubtitle:
      typeof data.heroSubtitle === "string"
        ? data.heroSubtitle
        : DEFAULT_HOME_SETTINGS.heroSubtitle,
    trustHeading:
      typeof data.trustHeading === "string"
        ? data.trustHeading
        : DEFAULT_HOME_SETTINGS.trustHeading,
    primaryCtaLabel:
      typeof data.primaryCtaLabel === "string"
        ? data.primaryCtaLabel
        : DEFAULT_HOME_SETTINGS.primaryCtaLabel,
    primaryCtaLink:
      typeof data.primaryCtaLink === "string"
        ? data.primaryCtaLink
        : DEFAULT_HOME_SETTINGS.primaryCtaLink,
    secondaryCtaLabel:
      typeof data.secondaryCtaLabel === "string"
        ? data.secondaryCtaLabel
        : DEFAULT_HOME_SETTINGS.secondaryCtaLabel,
    secondaryCtaLink:
      typeof data.secondaryCtaLink === "string"
        ? data.secondaryCtaLink
        : DEFAULT_HOME_SETTINGS.secondaryCtaLink,
    heroStats: sanitizeArray<HeroStat>(
      data.heroStats,
      DEFAULT_HOME_SETTINGS.heroStats,
    ),
    trustLogos: sanitizeArray<string>(
      data.trustLogos,
      DEFAULT_HOME_SETTINGS.trustLogos,
    ),
    accomplishments: sanitizeArray<HomeAccomplishment>(
      data.accomplishments,
      DEFAULT_HOME_SETTINGS.accomplishments,
    ),
    skills: sanitizeArray<HomeSkill>(
      data.skills,
      DEFAULT_HOME_SETTINGS.skills,
    ),
    capabilities: sanitizeArray<HomeCapability>(
      data.capabilities,
      DEFAULT_HOME_SETTINGS.capabilities,
    ),
    impactTitle:
      typeof data.impactTitle === "string"
        ? data.impactTitle
        : DEFAULT_HOME_SETTINGS.impactTitle,
    impactSubtitle:
      typeof data.impactSubtitle === "string"
        ? data.impactSubtitle
        : DEFAULT_HOME_SETTINGS.impactSubtitle,
    impactMetrics: sanitizeArray<HeroStat>(
      data.impactMetrics,
      DEFAULT_HOME_SETTINGS.impactMetrics,
    ),
    accomplishmentsTitle:
      typeof data.accomplishmentsTitle === "string"
        ? data.accomplishmentsTitle
        : DEFAULT_HOME_SETTINGS.accomplishmentsTitle,
    accomplishmentsSubtitle:
      typeof data.accomplishmentsSubtitle === "string"
        ? data.accomplishmentsSubtitle
        : DEFAULT_HOME_SETTINGS.accomplishmentsSubtitle,
    skillsTitle:
      typeof data.skillsTitle === "string"
        ? data.skillsTitle
        : DEFAULT_HOME_SETTINGS.skillsTitle,
    skillsSubtitle:
      typeof data.skillsSubtitle === "string"
        ? data.skillsSubtitle
        : DEFAULT_HOME_SETTINGS.skillsSubtitle,
    capabilitiesTitle:
      typeof data.capabilitiesTitle === "string"
        ? data.capabilitiesTitle
        : DEFAULT_HOME_SETTINGS.capabilitiesTitle,
    capabilitiesSubtitle:
      typeof data.capabilitiesSubtitle === "string"
        ? data.capabilitiesSubtitle
        : DEFAULT_HOME_SETTINGS.capabilitiesSubtitle,
    processTitle:
      typeof data.processTitle === "string"
        ? data.processTitle
        : DEFAULT_HOME_SETTINGS.processTitle,
    processSubtitle:
      typeof data.processSubtitle === "string"
        ? data.processSubtitle
        : DEFAULT_HOME_SETTINGS.processSubtitle,
    processSteps: sanitizeArray<HomeProcessStep>(
      data.processSteps,
      DEFAULT_HOME_SETTINGS.processSteps,
    ),
    selectedWorkTitle:
      typeof data.selectedWorkTitle === "string"
        ? data.selectedWorkTitle
        : DEFAULT_HOME_SETTINGS.selectedWorkTitle,
    selectedWorkSubtitle:
      typeof data.selectedWorkSubtitle === "string"
        ? data.selectedWorkSubtitle
        : DEFAULT_HOME_SETTINGS.selectedWorkSubtitle,
    selectedWorkCtaLabel:
      typeof data.selectedWorkCtaLabel === "string"
        ? data.selectedWorkCtaLabel
        : DEFAULT_HOME_SETTINGS.selectedWorkCtaLabel,
    selectedWorkCtaLink:
      typeof data.selectedWorkCtaLink === "string"
        ? data.selectedWorkCtaLink
        : DEFAULT_HOME_SETTINGS.selectedWorkCtaLink,
    ctaHeadline:
      typeof data.ctaHeadline === "string"
        ? data.ctaHeadline
        : DEFAULT_HOME_SETTINGS.ctaHeadline,
    ctaDescription:
      typeof data.ctaDescription === "string"
        ? data.ctaDescription
        : DEFAULT_HOME_SETTINGS.ctaDescription,
    ctaButtonLabel:
      typeof data.ctaButtonLabel === "string"
        ? data.ctaButtonLabel
        : DEFAULT_HOME_SETTINGS.ctaButtonLabel,
    ctaButtonLink:
      typeof data.ctaButtonLink === "string"
        ? data.ctaButtonLink
        : DEFAULT_HOME_SETTINGS.ctaButtonLink,
    updatedAt:
      data.updatedAt instanceof Timestamp ? data.updatedAt : null,
  };
};

const saveHomeSettings = async (
  payload: UpdateHomeSettingsInput,
): Promise<void> => {
  await setDoc(
    HOME_SETTINGS_DOC,
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const useHomeSettings = () =>
  useQuery({
    queryKey: HOME_SETTINGS_QUERY_KEY,
    queryFn: fetchHomeSettings,
  });

export const useUpdateHomeSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveHomeSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_SETTINGS_QUERY_KEY });
    },
  });
};

export const getDefaultHomeSettings = () => DEFAULT_HOME_SETTINGS;
