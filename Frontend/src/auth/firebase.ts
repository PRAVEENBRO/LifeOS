// Frontend/src/auth/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';

import ReactNativeAsyncStorage
  from '@react-native-async-storage/async-storage';

/**
 * Firebase configuration
 * EXPO_PUBLIC_ prefix is REQUIRED for Expo
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

/**
 * Prevent multiple app initialization (important for Fast Refresh)
 */
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

/**
 * ✅ Correct Auth initialization for React Native
 * This enables persistent login sessions.
 */
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
