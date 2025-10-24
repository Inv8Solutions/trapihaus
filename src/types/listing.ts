/**
 * Property Listing Types
 * Matches the form structure in ListProperty/Listing.tsx
 */

export interface PropertyListing {
	// Document metadata
	id: string;
	userId: string; // Owner's Firebase Auth UID
	status: "pending" | "approved" | "rejected" | "draft";
	createdAt: Date;
	updatedAt: Date;

	// Basic Information (from host/owner)
	hostEmail: string;
	hostFirstName: string;
	hostLastName: string;
	hostPhone: string;
	hostPhoneCountry: string;

	// Property Details
	propertyType: "apartment" | "transient" | "hotel" | string;
	propertyName: string;
	description: string;
	city: string;
	barangay: string;
	streetAddress: string;
	landmark?: string;

	// Property Specifications
	bedrooms: number;
	guests: number;
	bathrooms: number;
	size?: string; // e.g., "55sqm"

	// Pricing
	rate: string; // Store as string to preserve formatting (₱2,500)
	ratePeriod: "per night" | "per week" | "per month";

	// Amenities & Rules
	amenities: string[];
	houseRules?: string;

	// Photos
	photos: string[]; // Array of Firebase Storage URLs
	coverPhoto?: string; // Primary photo URL

	// Availability
	availability: "Available for Booking" | "Temporarily Unavailable" | "Coming Soon";
	minStay: string; // e.g., "1 Night"
	maxStay: string; // e.g., "1 Week"

	// Optional: Booking statistics (for future use)
	totalBookings?: number;
	averageRating?: number;
	reviewCount?: number;
}

export interface CreateListingData {
	// Basic Information
	hostEmail: string;
	hostFirstName: string;
	hostLastName: string;
	hostPhone: string;
	hostPhoneCountry: string;

	// Property Details
	propertyType: string;
	propertyName: string;
	description: string;
	city: string;
	barangay: string;
	streetAddress: string;
	landmark?: string;

	// Property Specifications
	bedrooms: number;
	guests: number;
	bathrooms: number;
	size?: string;

	// Pricing
	rate: string;
	ratePeriod: string;

	// Amenities & Rules
	amenities: string[];
	houseRules?: string;

	// Photos
	photos: string[];

	// Availability
	availability: string;
	minStay: string;
	maxStay: string;
}

export interface UpdateListingData extends Partial<CreateListingData> {
	status?: PropertyListing["status"];
}
