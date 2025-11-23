export interface Review {
	id: string;
	userId: string;
	userName: string;
	userEmail: string;
	userAvatar?: string;
	listingId: string;
	reservationId: string;
	rating: number; // 1-5
	comment: string;
	propertyName: string;
	propertyLocation: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateReviewData {
	userId: string;
	userName: string;
	userEmail: string;
	userAvatar?: string;
	listingId: string;
	reservationId: string;
	rating: number;
	comment: string;
	propertyName: string;
	propertyLocation: string;
}
