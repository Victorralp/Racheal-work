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
  profileShape?: string;
  profileSize?: string;
  profilePlacement?: string;
  profilePositionX?: number;
  profilePositionY?: number;
  heroBgUrl?: string;
}

export interface UpdateSiteProfileInput {
  headshotUrl: string;
  profileShape?: string;
  profileSize?: string;
  profilePlacement?: string;
  profilePositionX?: number;
  profilePositionY?: number;
  heroBgUrl?: string;
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
    headshotUrl: typeof data.headshotUrl === 'string' ? data.headshotUrl : '',
    updatedAt: 'updatedAt' in data ? (data.updatedAt as Timestamp | null) : null,
    heroBgUrl: typeof data.heroBgUrl === 'string' ? data.heroBgUrl : '',
    profilePositionX: typeof data.profilePositionX === 'number' ? data.profilePositionX : 0,
    profilePositionY: typeof data.profilePositionY === 'number' ? data.profilePositionY : 0,
    // Add more fields if you use them
  };
};

const saveSiteProfile = async (profile: UpdateSiteProfileInput): Promise<void> => {
  await setDoc(
    PROFILE_DOC_REF,
    {
      ...profile,
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

