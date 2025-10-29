import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface DemoMetric {
  label: string;
  value: string;
  change?: string;
}

export interface DemoDataPoint {
  label: string;
  value: string;
}

export interface DemoInsight {
  title: string;
  detail: string;
}

export interface DemoProject {
  id: string;
  title: string;
  summary: string;
  description: string;
  coverImage?: string;
  metrics: DemoMetric[];
  dataPoints: DemoDataPoint[];
  insights: DemoInsight[];
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export const DEMO_PROJECTS_QUERY_KEY = ["demo-projects"];

const asString = (value: unknown): string =>
  typeof value === "string" ? value : "";

const fetchDemoProjects = async (): Promise<DemoProject[]> => {
  const demoProjectsRef = collection(db, "demoProjects");
  const demoProjectsQuery = query(demoProjectsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(demoProjectsQuery);

  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data() as DocumentData;

    return {
      id: docSnapshot.id,
      title: asString(data.title),
      summary: asString(data.summary),
      description: asString(data.description),
      coverImage: asString(data.coverImage),
      metrics: Array.isArray(data.metrics)
        ? (data.metrics as unknown[]).map((metric) => {
            const metricRecord = metric as Record<string, unknown>;
            return {
              label: asString(metricRecord?.label),
              value: asString(metricRecord?.value),
              change: asString(metricRecord?.change),
            };
          })
        : [],
      dataPoints: Array.isArray(data.dataPoints)
        ? (data.dataPoints as unknown[]).map((item) => {
            const itemRecord = item as Record<string, unknown>;
            return {
              label: asString(itemRecord?.label),
              value: asString(itemRecord?.value),
            };
          })
        : [],
      insights: Array.isArray(data.insights)
        ? (data.insights as unknown[]).map((insight) => {
            const insightRecord = insight as Record<string, unknown>;
            return {
              title: asString(insightRecord?.title),
              detail: asString(insightRecord?.detail),
            };
          })
        : [],
      createdAt:
        data.createdAt instanceof Timestamp ? data.createdAt : null,
      updatedAt:
        data.updatedAt instanceof Timestamp ? data.updatedAt : null,
    };
  });
};

export const useDemoProjects = () =>
  useQuery({
    queryKey: DEMO_PROJECTS_QUERY_KEY,
    queryFn: fetchDemoProjects,
  });
