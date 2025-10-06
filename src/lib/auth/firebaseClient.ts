// Firebase client initialization placeholder.
// When enabling Firebase, install: npm i firebase
// Then populate environment variables (never hardcode secrets):
// FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID,
// FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID

// This file stays tree-shakable and safe; only client-side code imports it.

// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// } as const;

// export function getFirebaseApp() {
//   return getApps().length ? getApp() : initializeApp(firebaseConfig);
// }

// export function getFirebaseAuth() {
//   return getAuth(getFirebaseApp());
// }

// Example usage in a client component:
// const auth = getFirebaseAuth();
// signInWithEmailAndPassword(auth, email, password)

export {}; // Keeps module clean until Firebase is activated.
