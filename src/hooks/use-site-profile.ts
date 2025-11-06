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

const LOCAL_CACHE_KEY = 'site-profile-cache';

const fetchSiteProfile = async (): Promise<SiteProfile> => {
  try {
    const snapshot = await getDoc(PROFILE_DOC_REF);
    if (!snapshot.exists()) {
      // If no remote doc, try local cache, then default
      try {
        const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_CACHE_KEY) : null;
        if (cached) return JSON.parse(cached) as SiteProfile;
      } catch {}
      return DEFAULT_PROFILE;
    }
    const data = snapshot.data();
    const result: SiteProfile = {
      headshotUrl: typeof data.headshotUrl === 'string' ? data.headshotUrl : '',
      updatedAt: 'updatedAt' in data ? (data.updatedAt as Timestamp | null) : null,
      heroBgUrl: typeof data.heroBgUrl === 'string' ? data.heroBgUrl : '',
      profilePositionX: typeof data.profilePositionX === 'number' ? data.profilePositionX : 0,
      profilePositionY: typeof data.profilePositionY === 'number' ? data.profilePositionY : 0,
    };
    // Cache locally to support offline reads
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(result));
      }
    } catch {}
    return result;
  } catch (err) {
    // Offline or network blocked; serve cached/default
    try {
      const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_CACHE_KEY) : null;
      if (cached) return JSON.parse(cached) as SiteProfile;
    } catch {}
    return DEFAULT_PROFILE;
  }
};

const saveSiteProfile = async (profile: UpdateSiteProfileInput): Promise<void> => {
  // Always attempt to write remotely
  await setDoc(
    PROFILE_DOC_REF,
    {
      ...profile,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  // Also update local cache so UI reflects changes if user goes offline
  try {
    const cached: SiteProfile = {
      headshotUrl: profile.headshotUrl ?? '',
      heroBgUrl: profile.heroBgUrl ?? '',
      profilePositionX: profile.profilePositionX ?? 0,
      profilePositionY: profile.profilePositionY ?? 0,
      updatedAt: null,
    };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(cached));
    }
  } catch {}
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
