// Frontend/src/auth/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * Firebase configuration
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

/**
 * Prevent multiple initialization (Fast Refresh safe)
 */
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

/**
 * Firebase Auth
 * Works on Web + Android + iOS automatically in Expo.
 */
export const auth = getAuth(app);
