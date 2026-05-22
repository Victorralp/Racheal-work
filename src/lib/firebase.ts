import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredFirebaseValues = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

export const isFirebaseConfigured = requiredFirebaseValues.every(
  (value) =>
    typeof value === 'string' &&
    value.trim().length > 0 &&
    !value.startsWith('your_'),
);

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

// Initialize Firebase services
export const auth = app ? getAuth(app) : (null as unknown as Auth);
export const db = app ? getFirestore(app) : (null as unknown as Firestore);

// Enable offline persistence so reads can work from cache when offline
// If multiple tabs are open, persistence can fail; ignore and continue.
if (app) {
  try {
    enableIndexedDbPersistence(db).catch(() => {
      // no-op: fall back to memory cache if persistence cannot be enabled
    });
  } catch {
    // SSR or unexpected environment; ignore
  }
}

export default app;
