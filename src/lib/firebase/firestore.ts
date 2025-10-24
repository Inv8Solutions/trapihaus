import { getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/auth/firebaseClient";

/**
 * Get Firestore instance
 * Server-side: Use Firebase Admin SDK instead
 * Client-side: Use this function
 */
export function getFirestoreClient() {
	return getFirestore(getFirebaseApp());
}
