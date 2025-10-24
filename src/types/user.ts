/**
 * User profile data structure stored in Firestore
 */
export interface UserProfile {
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
	displayName: string;
	phoneNumber: string;
	address: string;
	bio: string;
	photoURL: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * Partial update payload for profile
 */
export interface UpdateProfileData {
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	address?: string;
	bio?: string;
	photoURL?: string;
}
