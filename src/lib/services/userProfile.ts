/**
 * User Profile Service
 * Client-side service for managing user profile data
 */

import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { updateProfile as updateFirebaseAuthProfile } from "firebase/auth";
import { getFirestoreClient } from "@/lib/firebase/firestore";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { uploadProfilePhoto, deleteProfilePhoto } from "@/lib/firebase/storage";
import type { UserProfile, UpdateProfileData } from "@/types/user";

/**
 * Get user profile from Firestore
 * @param userId - User's unique ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
	const db = getFirestoreClient();
	const userRef = doc(db, "users", userId);
	const userSnap = await getDoc(userRef);
	
	if (!userSnap.exists()) {
		return null;
	}
	
	return userSnap.data() as UserProfile;
}

/**
 * Create initial user profile in Firestore
 * Called after user registration
 */
export async function createUserProfile(
	userId: string,
	email: string,
	displayName: string,
	photoURL?: string
): Promise<void> {
	const db = getFirestoreClient();
	const userRef = doc(db, "users", userId);
	
	const nameParts = displayName.split(" ");
	const firstName = nameParts[0] || "";
	const lastName = nameParts.slice(1).join(" ") || "";
	
	const profile: UserProfile = {
		uid: userId,
		email,
		firstName,
		lastName,
		displayName,
		phoneNumber: "",
		address: "",
		bio: "",
		photoURL: photoURL || "/woman.png",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	
	await setDoc(userRef, profile);
}

/**
 * Update user profile in Firestore and Firebase Auth
 * @param userId - User's unique ID
 * @param data - Profile data to update
 */
export async function updateUserProfile(
	userId: string,
	data: UpdateProfileData
): Promise<void> {
	const db = getFirestoreClient();
	const userRef = doc(db, "users", userId);
	
	// Prepare update object
	const updateData: Record<string, unknown> = {
		...data,
		updatedAt: serverTimestamp(),
	};
	
	// Update displayName if firstName or lastName changed
	if (data.firstName !== undefined || data.lastName !== undefined) {
		const currentProfile = await getUserProfile(userId);
		const firstName = data.firstName ?? currentProfile?.firstName ?? "";
		const lastName = data.lastName ?? currentProfile?.lastName ?? "";
		updateData.displayName = `${firstName} ${lastName}`.trim();
	}
	
	// Update Firestore
	await updateDoc(userRef, updateData);
	
	// Update Firebase Auth profile if displayName or photoURL changed
	const auth = getFirebaseAuth();
	const currentUser = auth.currentUser;
	
	if (currentUser) {
		const authUpdate: { displayName?: string; photoURL?: string } = {};
		
		if (updateData.displayName && typeof updateData.displayName === "string") {
			authUpdate.displayName = updateData.displayName;
		}
		
		if (data.photoURL) {
			authUpdate.photoURL = data.photoURL;
		}
		
		if (Object.keys(authUpdate).length > 0) {
			await updateFirebaseAuthProfile(currentUser, authUpdate);
		}
	}
}

/**
 * Upload and update user profile photo
 * @param userId - User's unique ID
 * @param file - Image file to upload
 * @param currentPhotoURL - Current photo URL to delete
 */
export async function updateProfilePhoto(
	userId: string,
	file: File,
	currentPhotoURL?: string
): Promise<string> {
	// Upload new photo
	const newPhotoURL = await uploadProfilePhoto(userId, file);
	
	// Update profile with new photo URL
	await updateUserProfile(userId, { photoURL: newPhotoURL });
	
	// Delete old photo if it exists and is not default
	if (currentPhotoURL && !currentPhotoURL.includes("/woman.png")) {
		await deleteProfilePhoto(currentPhotoURL);
	}
	
	return newPhotoURL;
}

/**
 * Initialize user profile if it doesn't exist
 * Call this on login to ensure profile exists
 */
export async function ensureUserProfile(
	userId: string,
	email: string,
	displayName: string,
	photoURL?: string
): Promise<UserProfile> {
	let profile = await getUserProfile(userId);
	
	if (!profile) {
		await createUserProfile(userId, email, displayName, photoURL);
		profile = await getUserProfile(userId);
	}
	
	return profile!;
}
