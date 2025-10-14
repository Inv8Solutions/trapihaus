import { initializeApp, getApps, getApp } from "firebase/app";
import {
	getAuth,
	type Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	sendPasswordResetEmail,
} from "firebase/auth";

// IMPORTANT: Define these in .env.local with NEXT_PUBLIC_ prefix (client-side access)
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

function ensureFirebaseEnv() {
	const missing: string[] = [];
	if (!firebaseConfig.apiKey) missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
	if (!firebaseConfig.authDomain) missing.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
	if (!firebaseConfig.projectId) missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
	if (!firebaseConfig.storageBucket) missing.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
	if (!firebaseConfig.messagingSenderId) missing.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
	if (!firebaseConfig.appId) missing.push("NEXT_PUBLIC_FIREBASE_APP_ID");
	if (missing.length) {
		const msg = `Firebase config missing keys: ${missing.join(", ")}. Add them to .env.local and restart dev server.`;
		if (typeof window !== "undefined") {
			// Throw on client to surface immediately during auth calls
			throw new Error(msg);
		} else if (process.env.NODE_ENV !== "production") {
			console.warn(msg);
		}
	}
}

export function getFirebaseApp() {
	// Validate configuration early
	ensureFirebaseEnv();
	return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth(): Auth {
	return getAuth(getFirebaseApp());
}

export async function signInEmailPassword(email: string, password: string) {
	const auth = getFirebaseAuth();
	return signInWithEmailAndPassword(auth, email, password);
}

export async function registerEmailPassword(displayName: string, email: string, password: string) {
	const auth = getFirebaseAuth();
	const cred = await createUserWithEmailAndPassword(auth, email, password);
	if (displayName) {
		await updateProfile(cred.user, { displayName });
	}
	return cred;
}

export async function sendResetEmail(email: string) {
	const auth = getFirebaseAuth();
	return sendPasswordResetEmail(auth, email);
}
