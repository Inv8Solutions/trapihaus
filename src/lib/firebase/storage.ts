import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirebaseApp } from "@/lib/auth/firebaseClient";

/**
 * Get Firebase Storage instance
 */
export function getFirebaseStorage() {
	return getStorage(getFirebaseApp());
}

/**
 * Upload user profile photo to Firebase Storage via API route
 * Uses server-side upload to bypass CORS issues
 * @param userId - User's unique ID
 * @param file - Image file to upload
 * @returns Download URL of uploaded image
 */
export async function uploadProfilePhoto(userId: string, file: File): Promise<string> {
	// Validate file
	if (!file.type.startsWith("image/")) {
		throw new Error("File must be an image");
	}
	
	const maxSize = 2 * 1024 * 1024; // 2MB
	if (file.size > maxSize) {
		throw new Error("Image must be less than 2MB");
	}
	
	// Use API route for server-side upload (bypasses CORS)
	const formData = new FormData();
	formData.append("file", file);
	formData.append("userId", userId);
	
	const response = await fetch("/api/upload/profile-photo", {
		method: "POST",
		body: formData,
	});
	
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to upload photo");
	}
	
	const data = await response.json();
	return data.url;
}

/**
 * Delete old profile photo from storage
 * @param photoURL - Full URL of the photo to delete
 */
export async function deleteProfilePhoto(photoURL: string): Promise<void> {
	if (!photoURL || !photoURL.includes("firebase")) {
		return; // Not a Firebase Storage URL
	}
	
	try {
		const storage = getFirebaseStorage();
		const photoRef = ref(storage, photoURL);
		await deleteObject(photoRef);
	} catch (error) {
		console.error("Failed to delete old profile photo:", error);
		// Don't throw - not critical if old photo deletion fails
	}
}
