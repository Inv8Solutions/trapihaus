/**
 * Reservation/Booking Types
 * Tracks user bookings for properties
 */

export interface Reservation {
	// Document metadata
	id: string;
	userId: string; // Guest's Firebase Auth UID
	listingId: string; // Reference to PropertyListing
	status: "pending" | "confirmed" | "checked-in" | "completed" | "cancelled" | "declined";
	createdAt: Date;
	updatedAt: Date;

	// Booking Details
	checkInDate: Date;
	checkOutDate: Date;
	guests: number;
	nights: number;

	// Guest Information
	guestFirstName: string;
	guestLastName: string;
	guestEmail: string;
	guestPhone: string;
	specialRequest?: string;

	// Property Snapshot (to preserve data even if listing changes)
	propertyName: string;
	propertyLocation: string;
	propertyImage: string;
	propertyType: string;
	isVerified?: boolean;

	// Pricing
	pricePerNight: number;
	subtotal: number;
	serviceFee: number;
	vat: number;
	total: number;

	// Payment
	paymentMethod: "card" | "cash" | "gcash";
	paymentStatus: "pending" | "paid" | "refunded";
	bookingReference: string;

	// Host Information (from listing)
	hostId: string;
	hostName: string;
	hostEmail: string;
	hostPhone?: string;

	// Optional
	cancellationReason?: string;
	cancelledAt?: Date;
	reviewId?: string; // Link to review if guest left one
}

export interface CreateReservationData {
	userId: string;
	listingId: string;
	
	// Booking Details
	checkInDate: Date;
	checkOutDate: Date;
	guests: number;

	// Guest Information
	guestFirstName: string;
	guestLastName: string;
	guestEmail: string;
	guestPhone: string;
	specialRequest?: string;

	// Property Snapshot
	propertyName: string;
	propertyLocation: string;
	propertyImage: string;
	propertyType: string;
	isVerified?: boolean;

	// Pricing
	pricePerNight: number;
	serviceFee: number;
	vat: number;

	// Payment
	paymentMethod: "card" | "cash" | "gcash";

	// Host Information
	hostId: string;
	hostName: string;
	hostEmail: string;
	hostPhone?: string;
}

export interface UpdateReservationData {
	status?: Reservation["status"];
	paymentStatus?: Reservation["paymentStatus"];
	cancellationReason?: string;
	declineReason?: string;
	reviewId?: string;
}
