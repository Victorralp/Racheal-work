import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const PROFILE_DOC_REF = doc(db, "settings", "profile");
const PROFILE_QUERY_KEY = ["site-profile"];

export interface SiteProfile {
  headshotUrl: string;
  updatedAt?: Timestamp | null;
}

export interface UpdateSiteProfileInput {
  headshotUrl: string;
}

const DEFAULT_PROFILE: SiteProfile = {
  headshotUrl: "",
};

const fetchSiteProfile = async (): Promise<SiteProfile> => {
  const snapshot = await getDoc(PROFILE_DOC_REF);

  if (!snapshot.exists()) {
    return DEFAULT_PROFILE;
  }

  const data = snapshot.data();

  return {
    headshotUrl:
      typeof data.headshotUrl === "string" ? data.headshotUrl : "",
    updatedAt: "updatedAt" in data ? (data.updatedAt as Timestamp | null) : null,
  };
};

const saveSiteProfile = async ({
  headshotUrl,
}: UpdateSiteProfileInput): Promise<void> => {
  await setDoc(
    PROFILE_DOC_REF,
    {
      headshotUrl,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const useSiteProfile = () =>
  useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchSiteProfile,
  });

export const useUpdateSiteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveSiteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
};

