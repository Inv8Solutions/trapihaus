"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { createListing, submitListingForReview } from "@/lib/services/listings";
import type { CreateListingData } from "@/types/listing";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BasicInfoData {
	email: string;
	firstName: string;
	lastName: string;
	phoneCountry: string;
	phoneNumber: string;
	password: string;
}

interface PropertyDetailsData {
	propertyType: string; // apartment | transient | hotel | etc
	propertyName: string;
	description: string;
	city: string;
	barangay: string;
	streetAddress: string;
	landmark?: string;
}

interface PhotosPricingData {
	bedrooms: number;
	guests: number;
	bathrooms: number;
	size: string; // optional size e.g. 55sqm
	rate: string; // numeric string for now
	ratePeriod: string; // per night / per week etc.
	amenities: string[];
	houseRules: string;
	// photos placeholder: store File names or data URLs later
	photos: string[];
}

interface ContactAvailabilityData {
	availability: string; // Available for Booking, Temporarily Unavailable etc.
	minStay: string; // e.g. 1 Night
	maxStay: string; // e.g. 1 Week
}

interface ListingState {
	basic: BasicInfoData;
	property: PropertyDetailsData;
	photos: PhotosPricingData;
	contact: ContactAvailabilityData;
}

const initialState: ListingState = {
	basic: {
		email: "",
		firstName: "",
		lastName: "",
		phoneCountry: "+63",
		phoneNumber: "",
		password: "",
	},
		property: {
			propertyType: "",
			propertyName: "",
			description: "",
			city: "",
			barangay: "",
			streetAddress: "",
			landmark: "",
		},
		photos: {
			bedrooms: 0,
			guests: 0,
			bathrooms: 0,
			size: "",
			rate: "",
			ratePeriod: "per night",
			amenities: [],
			houseRules: "",
			photos: [],
		},
		contact: {
			availability: "Available for Booking",
			minStay: "1 Night",
			maxStay: "1 Week",
		},
};

type StepKey = keyof ListingState;

interface StepDef {
	key: StepKey;
	title: string;
	subtitle: string;
	icon: React.ReactNode;
}

const steps: StepDef[] = [
	{
		key: "basic",
		title: "Basic Information",
		subtitle: "Create your Trapihaus host account by filling in your personal details.",
		icon: (
			<svg
				className="w-5 h-5 text-[#F68109]"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M13 16h-1v-4h-1m1-4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
				/>
			</svg>
		),
	},
		{
			key: "property",
			title: "Property Details",
			subtitle: "Add your property details to make your listing stand out.",
			icon: (
			<svg
				className="w-5 h-5 text-[#F68109]"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 12l9-9 9 9M4 10v10h6v-6h4v6h6V10"
				/>
			</svg>
		),
	},
	{
		key: "photos",
		title: "Photos & Pricing",
		subtitle: "Add attractive visuals & set your rates.",
		icon: (
			<svg
				className="w-5 h-5 text-[#F68109]"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 5h4l2-2h6l2 2h4v14H3z" />
				<circle cx="12" cy="13" r="4" strokeWidth={2} stroke="currentColor" />
			</svg>
		),
	},
	{
		key: "contact",
		title: "Contact & Availability",
		subtitle: "Let guests know how & when to reach you.",
		icon: (
			<svg
				className="w-5 h-5 text-[#F68109]"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 5h18M8 5v14m8-14v14M5 19h14" />
			</svg>
		),
	},
];

// Validation helpers for password rules (basic info step)
const passwordRuleChecks = {
	lowercase: (pwd: string) => /[a-z]/.test(pwd),
	uppercase: (pwd: string) => /[A-Z]/.test(pwd),
	number: (pwd: string) => /\d/.test(pwd),
	special: (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
	length: (pwd: string) => pwd.length >= 8,
};

export default function Listing() {
	const router = useRouter();
	const [data, setData] = useState<ListingState>(initialState);
	const [current, setCurrent] = useState(0);
	const [showPassword, setShowPassword] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	
	// Photo upload states
	const [uploadingPhotos, setUploadingPhotos] = useState(false);
	const [photoFiles, setPhotoFiles] = useState<File[]>([]);
	const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
	const [uploadError, setUploadError] = useState<string | null>(null);

	// Check authentication status
	useEffect(() => {
		const auth = getFirebaseAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
				// Pre-fill basic info if user is authenticated
				setData((prev) => {
					if (!prev.basic.email && user.email) {
						return {
							...prev,
							basic: { ...prev.basic, email: user.email }
						};
					}
					return prev;
				});
			} else {
				setUserId(null);
			}
		});
		return () => unsubscribe();
	}, []);

	const step = steps[current];

	const passwordStatus = useMemo(() => {
		const pwd = data.basic.password;
		return Object.entries(passwordRuleChecks).reduce<Record<string, boolean>>(
			(acc, [k, fn]) => {
				acc[k] = fn(pwd);
				return acc;
			},
			{}
		);
	}, [data.basic.password]);

	const updateBasic = useCallback(
		(patch: Partial<BasicInfoData>) => {
			setData((prev) => ({ ...prev, basic: { ...prev.basic, ...patch } }));
		},
		[]
	);

	const updateProperty = useCallback(
		(patch: Partial<PropertyDetailsData>) => {
			setData((prev) => ({ ...prev, property: { ...prev.property, ...patch } }));
		},
		[]
	);

	const updatePhotos = useCallback(
		(patch: Partial<PhotosPricingData>) => {
			setData((prev) => ({ ...prev, photos: { ...prev.photos, ...patch } }));
		},
		[]
	);

	const updateContact = useCallback(
		(patch: Partial<ContactAvailabilityData>) => {
			setData((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));
		},
		[]
	);

	// Handle photo file selection
	const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		
		if (files.length === 0) return;

		// Validate total photos (max 10)
		if (photoFiles.length + files.length > 10) {
			setUploadError("Maximum 10 photos allowed");
			return;
		}

		// Validate file types and sizes
		const validFiles: File[] = [];
		let hasError = false;

		files.forEach((file) => {
			if (!file.type.startsWith("image/")) {
				setUploadError("All files must be images");
				hasError = true;
				return;
			}

			const maxSize = 5 * 1024 * 1024; // 5MB
			if (file.size > maxSize) {
				setUploadError("Each image must be less than 5MB");
				hasError = true;
				return;
			}

			validFiles.push(file);
		});

		if (hasError) return;

		// Add to photo files
		setPhotoFiles((prev) => [...prev, ...validFiles]);

		// Create previews
		validFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPhotoPreviews((prev) => [...prev, reader.result as string]);
			};
			reader.readAsDataURL(file);
		});

		setUploadError(null);
	};

	// Remove photo
	const removePhoto = (index: number) => {
		setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
		setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
	};

	// Upload photos to Firebase Storage
	const uploadPhotos = async (): Promise<string[]> => {
		if (photoFiles.length === 0) return [];
		if (!userId) throw new Error("User ID is required");

		setUploadingPhotos(true);
		const uploadedUrls: string[] = [];

		try {
			for (const file of photoFiles) {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("userId", userId);

				const response = await fetch("/api/upload/listing-photo", {
					method: "POST",
					body: formData,
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.error || "Failed to upload photo");
				}

				const data = await response.json();
				uploadedUrls.push(data.url);
			}

			return uploadedUrls;
		} finally {
			setUploadingPhotos(false);
		}
	};

	const goNext = () => {
		setCurrent((c) => Math.min(c + 1, steps.length - 1));
	};
	const goBack = () => {
		setCurrent((c) => Math.max(c - 1, 0));
	};

	const handleFinish = async () => {
		if (!userId) {
			setSubmitError("You must be logged in to create a listing");
			return;
		}

		setIsSubmitting(true);
		setSubmitError(null);

		try {
			// Upload photos first if any
			let photoUrls: string[] = [];
			if (photoFiles.length > 0) {
				photoUrls = await uploadPhotos();
			}

			// Prepare listing data
			const listingData: CreateListingData = {
				// Basic Information
				hostEmail: data.basic.email,
				hostFirstName: data.basic.firstName,
				hostLastName: data.basic.lastName,
				hostPhone: data.basic.phoneNumber,
				hostPhoneCountry: data.basic.phoneCountry,

				// Property Details
				propertyType: data.property.propertyType,
				propertyName: data.property.propertyName,
				description: data.property.description,
				city: data.property.city,
				barangay: data.property.barangay,
				streetAddress: data.property.streetAddress,
				landmark: data.property.landmark,

				// Property Specifications
				bedrooms: data.photos.bedrooms,
				guests: data.photos.guests,
				bathrooms: data.photos.bathrooms,
				size: data.photos.size,

				// Pricing
				rate: data.photos.rate,
				ratePeriod: data.photos.ratePeriod,

				// Amenities & Rules
				amenities: data.photos.amenities,
				houseRules: data.photos.houseRules,

				// Photos (uploaded URLs)
				photos: photoUrls,

				// Availability
				availability: data.contact.availability,
				minStay: data.contact.minStay,
				maxStay: data.contact.maxStay,
			};

			// Create the listing in Firestore
			const listingId = await createListing(userId, listingData);

			// Submit for review (change status from draft to pending)
			await submitListingForReview(listingId, userId);

			setSubmitSuccess(true);

			// Redirect to dashboard listings page after 2 seconds
			setTimeout(() => {
				router.push("/dashboard/listings");
			}, 2000);
		} catch (error) {
			console.error("Failed to create listing:", error);
			setSubmitError(
				error instanceof Error 
					? error.message 
					: "Failed to create listing. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderBasic = () => {
		return (
			<div className="space-y-6">
				<div className="grid grid-cols-1 gap-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="email">
							Email*
						</label>
						<input
							id="email"
							type="email"
							required
							value={data.basic.email}
							onChange={(e) => updateBasic({ email: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="Email"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="firstName">
								First Name*
							</label>
							<input
								id="firstName"
								type="text"
								required
								value={data.basic.firstName}
								onChange={(e) => updateBasic({ firstName: e.target.value })}
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
								placeholder="First Name"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="lastName">
								Last Name*
							</label>
							<input
								id="lastName"
								type="text"
								required
								value={data.basic.lastName}
								onChange={(e) => updateBasic({ lastName: e.target.value })}
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
								placeholder="Last Name"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="phone">
							Phone number*
						</label>
						<div className="flex items-stretch rounded-md border border-gray-300 overflow-hidden">
							<select
								aria-label="Country code"
								value={data.basic.phoneCountry}
								onChange={(e) => updateBasic({ phoneCountry: e.target.value })}
								className="bg-gray-50 px-2 text-sm outline-none focus:ring-2 focus:ring-[#1078CF]"
							>
								<option value="+63">+63</option>
								<option value="+1">+1</option>
								<option value="+44">+44</option>
							</select>
							<input
								id="phone"
								type="tel"
								value={data.basic.phoneNumber}
								onChange={(e) => updateBasic({ phoneNumber: e.target.value })}
								className="flex-1 px-3 py-2 text-sm outline-none"
								placeholder="Enter phone number"
							/>
							<div className="flex items-center pr-3 text-emerald-600" aria-hidden>
								{data.basic.phoneNumber.length >= 7 && (
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								)}
							</div>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="password">
							Password*
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={data.basic.password}
								onChange={(e) => updateBasic({ password: e.target.value })}
								placeholder="Enter password"
								className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							/>
							<button
								type="button"
								onClick={() => setShowPassword((s) => !s)}
								className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									{showPassword ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a18.6 18.6 0 013.23-4.755m3.01-2.544A9.96 9.96 0 0112 5c7 0 10 7 10 7a18.56 18.56 0 01-1.67 2.625M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2 2l20 20M9.88 9.88A3 3 0 0114.12 14.12M6.1 6.1C4.24 7.49 2.9 9.3 2 12c0 0 3 7 10 7 2 0 3.79-.56 5.35-1.44M9.88 9.88L2 2"
										/>
									)}
								</svg>
							</button>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
						{[
							{ key: "lowercase", label: "One lowercase character" },
							{ key: "number", label: "One number" },
							{ key: "uppercase", label: "One uppercase character" },
							{ key: "special", label: "One special character" },
							{ key: "length", label: "8 characters minimum" },
						].map((rule) => (
							<div key={rule.key} className="flex items-center gap-1">
								<svg
									className={`w-3.5 h-3.5 ${
										passwordStatus[rule.key] ? "text-emerald-600" : "text-gray-400"
									}`}
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span>{rule.label}</span>
							</div>
						))}
					</div>
					<div className="rounded-md bg-gray-100 p-4 text-xs leading-relaxed text-gray-600">
						<strong className="font-semibold">Privacy Note:</strong> Your contact information will only be shared with verified guests after
						booking confirmation. We never share your details publicly or with third parties.
					</div>
				</div>
			</div>
		);
	};

		const renderProperty = () => {
			const propertyTypes = [
				{ value: "apartment", label: "Apartment", icon: (
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V5h6v16M13 21V9h6v12M9 9h2M9 13h2" /></svg>
				) },
				{ value: "transient", label: "Transient", icon: (
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 11h16M4 15h16M4 7h16M8 3v18" /></svg>
				) },
				{ value: "hotel", label: "Hotel", icon: (
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 21V8a2 2 0 012-2h3V5a2 2 0 114 0v1h3a2 2 0 012 2v13M4 21h16M9 11h.01M9 15h.01M15 11h.01M15 15h.01" /></svg>
				) },
			];

			return (
				<div className="space-y-6">
					<div>
						<p className="block text-sm font-medium mb-2">Property Type</p>
						<div className="flex flex-wrap gap-3">
							{propertyTypes.map((pt) => {
								const active = data.property.propertyType === pt.value;
								return (
									<button
										key={pt.value}
										type="button"
										onClick={() => updateProperty({ propertyType: pt.value })}
										className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
											active
												? "border-[#F68109] bg-[#FFF5EC] text-[#F68109] focus:ring-[#F68109]"
												: "border-gray-300 bg-white text-gray-600 hover:bg-gray-50 focus:ring-gray-300"
										}`}
										aria-pressed={active}
									>
										<span className="text-[#F68109]">{pt.icon}</span>
										{pt.label}
									</button>
								);
							})}
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="propertyName">Property Name*</label>
						<input
							id="propertyName"
							type="text"
							value={data.property.propertyName}
							onChange={(e) => updateProperty({ propertyName: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="e.g., Highlands Apartments"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="propertyDescription">Property Description</label>
						<textarea
							id="propertyDescription"
							value={data.property.description}
							onChange={(e) => updateProperty({ description: e.target.value })}
							className="w-full min-h-[110px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="Describe your Property"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="city">City/Municipality</label>
						<input
							id="city"
							type="text"
							value={data.property.city}
							onChange={(e) => updateProperty({ city: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="Enter city or municipality"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="barangay">Barangay</label>
						<div className="relative">
							<select
								id="barangay"
								value={data.property.barangay}
								onChange={(e) => updateProperty({ barangay: e.target.value })}
								className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF] bg-white"
							>
								<option value="">Select Barangay</option>
								<option value="Asin Road">Asin Road</option>
								<option value="Bakakeng">Bakakeng</option>
								<option value="Camp 7">Camp 7</option>
								<option value="Irisan">Irisan</option>
								<option value="Loakan">Loakan</option>
							</select>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
							</span>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="streetAddress">Street Address</label>
						<input
							id="streetAddress"
							type="text"
							value={data.property.streetAddress}
							onChange={(e) => updateProperty({ streetAddress: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="Enter street address"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="landmark">Landmark (Optional)</label>
						<input
							id="landmark"
							type="text"
							value={data.property.landmark}
							onChange={(e) => updateProperty({ landmark: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="e.g., Near Burnham Park"
						/>
					</div>
				</div>
			);
		};

		const renderPhotos = () => {
			// Defensive: ensure amenities array always exists (in case of partial rehydration)
			const safeAmenities = Array.isArray(data.photos.amenities) ? data.photos.amenities : [];
			const increment = (field: keyof PhotosPricingData) => {
				setData((prev) => ({
					...prev,
					photos: {
						...prev.photos,
						[field]: typeof prev.photos[field] === 'number' ? (prev.photos[field] as number) + 1 : prev.photos[field],
					},
				}));
			};
			const decrement = (field: keyof PhotosPricingData) => {
				setData((prev) => ({
					...prev,
					photos: {
						...prev.photos,
						[field]: typeof prev.photos[field] === 'number' ? Math.max(0, (prev.photos[field] as number) - 1) : prev.photos[field],
					},
				}));
			};

			const counters: { label: string; field: keyof PhotosPricingData }[] = [
				{ label: 'Number of Bedrooms', field: 'bedrooms' },
				{ label: 'Maximum Guests', field: 'guests' },
				{ label: 'Number of Bathrooms', field: 'bathrooms' },
			];

			const amenitiesList = [
				'Wi-Fi','Parking','Pool','Air Conditioning','Heating','Pet Friendly','Kitchen','TV','Refrigerator','Hot tub','Washing Machine','Room service','Breakfast'
			];

			const toggleAmenity = (a: string) => {
				setData((prev) => {
					const currentAmenities = Array.isArray(prev.photos.amenities) ? prev.photos.amenities : [];
					const exists = currentAmenities.includes(a);
					return {
						...prev,
						photos: {
							...prev.photos,
							amenities: exists
								? currentAmenities.filter((x) => x !== a)
								: [...currentAmenities, a],
						},
					};
				});
			};

			return (
				<div className="space-y-8">
					{/* Counters */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{counters.map((c) => (
							<div key={c.field} className="flex flex-col gap-2">
								<p className="text-sm font-medium">{c.label}</p>
								<div className="flex items-center gap-4">
									<button type="button" onClick={() => decrement(c.field)} className="h-8 w-8 rounded-md border flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50" aria-label={`Decrease ${c.label}`}>
										-
									</button>
									<span className="w-6 text-center text-sm font-medium">{data.photos[c.field] as number}</span>
									<button type="button" onClick={() => increment(c.field)} className="h-8 w-8 rounded-md border flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50" aria-label={`Increase ${c.label}`}>
										+
									</button>
								</div>
							</div>
						))}
					</div>

					<div>
						<label htmlFor="size" className="block text-sm font-medium mb-1">Property Size (Optional)</label>
						<input
							id="size"
							type="text"
							value={data.photos.size}
							onChange={(e) => updatePhotos({ size: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="e.g., 55sqm"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="md:col-span-2">
							<label htmlFor="rate" className="block text-sm font-medium mb-1">Accommodation Rate</label>
							<input
								id="rate"
								type="text"
								value={data.photos.rate}
								onChange={(e) => updatePhotos({ rate: e.target.value })}
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
								placeholder="₱2,500"
							/>
							<p className="text-[11px] text-gray-500 mt-1">Set a competitive rate. You can adjust this anytime after listing.</p>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="ratePeriod">&nbsp;</label>
							<div className="relative">
								<select
									id="ratePeriod"
									value={data.photos.ratePeriod}
									onChange={(e) => updatePhotos({ ratePeriod: e.target.value })}
									className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF] bg-white"
								>
									<option value="per night">per night</option>
									<option value="per week">per week</option>
									<option value="per month">per month</option>
								</select>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
								</span>
							</div>
						</div>
					</div>

					<div>
						<p className="text-sm font-medium mb-2">Amenities & Features (Select all that apply)</p>
						<div className="flex flex-wrap gap-2">
							{amenitiesList.map((a) => {
								const active = safeAmenities.includes(a);
								return (
									<button
										key={a}
										type="button"
										onClick={() => toggleAmenity(a)}
										className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${active ? 'bg-[#F6FBEA] border-[#83C12C] text-[#2d4f05]' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
										aria-pressed={active}
									>
										{a}
									</button>
								);
							})}
						</div>
					</div>

					<div>
						<p className="text-sm font-medium mb-2">Property Photos (Up to 10 photos)</p>
						
						{uploadError && (
							<div className="mb-3 rounded-md bg-red-50 border border-red-200 p-3 flex items-center gap-2 text-xs text-red-600">
								<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
								{uploadError}
							</div>
						)}

						{/* Photo Previews */}
						{photoPreviews.length > 0 && (
							<div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
								{photoPreviews.map((preview, idx) => (
									<div key={idx} className="relative group h-32">
										<Image 
											src={preview} 
											alt={`Preview ${idx + 1}`} 
											fill
											sizes="(max-width: 768px) 50vw, 25vw"
											className="object-cover rounded-md border border-gray-200"
										/>
										<button
											type="button"
											onClick={() => removePhoto(idx)}
											className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
											aria-label="Remove photo"
										>
											<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
										{idx === 0 && (
											<span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded z-10">
												Cover
											</span>
										)}
									</div>
								))}
							</div>
						)}

						{/* Upload Button */}
						{photoFiles.length < 10 && (
							<div className="border border-dashed rounded-md p-8 text-center text-sm text-gray-500">
								<svg className="w-6 h-6 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2h-3.172a2 2 0 01-1.414-.586l-1.828-1.828A2 2 0 0010.172 3H6a2 2 0 00-2 2v13a2 2 0 002 2z" />
								</svg>
								<p className="mb-2">Select photos to upload</p>
								<p className="text-[11px] text-gray-400 mb-4">
									{photoFiles.length > 0 
										? `${photoFiles.length} photo${photoFiles.length > 1 ? 's' : ''} selected (${10 - photoFiles.length} remaining)`
										: 'JPG, PNG or GIF (max 5MB each)'
									}
								</p>
								<label className="inline-block px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-medium cursor-pointer">
									Choose Files
									<input
										type="file"
										multiple
										accept="image/*"
										onChange={handlePhotoSelect}
										className="hidden"
									/>
								</label>
							</div>
						)}
					</div>

					<div>
						<label htmlFor="houseRules" className="block text-sm font-medium mb-1">House Rules (Optional)</label>
						<input
							id="houseRules"
							type="text"
							value={data.photos.houseRules}
							onChange={(e) => updatePhotos({ houseRules: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="e.g., No Smoking, Quiet hours from 10PM-7AM..."
						/>
					</div>
				</div>
			);
		};

		const renderContact = () => (
			<div className="space-y-8">
				<div>
					<label className="block text-sm font-medium mb-1" htmlFor="availability">Property Availability</label>
					<div className="relative">
						<select
							id="availability"
							value={data.contact.availability}
							onChange={(e) => updateContact({ availability: e.target.value })}
							className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF] bg-white"
						>
							<option value="Available for Booking">Available for Booking</option>
							<option value="Temporarily Unavailable">Temporarily Unavailable</option>
							<option value="Coming Soon">Coming Soon</option>
						</select>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
						</span>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="minStay">Minimum Stay</label>
						<input
							id="minStay"
							type="text"
							value={data.contact.minStay}
							onChange={(e) => updateContact({ minStay: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="1 Night"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="maxStay">Maximum Stay</label>
						<input
							id="maxStay"
							type="text"
							value={data.contact.maxStay}
							onChange={(e) => updateContact({ maxStay: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1078CF]"
							placeholder="1 Week"
						/>
					</div>
				</div>
				<div className="rounded-md bg-gray-100 p-4 text-[11px] leading-relaxed text-gray-600">
					By submitting, you agree to Trapihaus Terms of Service and Privacy Policy. We&apos;ll review your listing within 24 hours and notify you via email.
				</div>
			</div>
		);

	const content = () => {
		switch (step.key) {
			case "basic":
				return renderBasic();
			case "property":
				return renderProperty();
			case "photos":
				return renderPhotos();
			case "contact":
				return renderContact();
			default:
				return null;
		}
	};

	return (
		<section className="w-full bg-[#F7F7F7] py-10 px-4 md:px-8 mb-16">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
				{/* Sidebar Steps */}
				<aside className="w-full lg:w-1/3 xl:w-1/4">
					<div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
						<ol className="relative space-y-8">
							{steps.map((s, idx) => {
								const active = idx === current;
								const completed = idx < current;
								return (
									<li key={s.key} className="flex items-start gap-4">
										<div className="flex flex-col items-center">
											<button
												type="button"
												onClick={() => setCurrent(idx)}
												className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium transition ${
													active
														? "border-[#F68109] text-[#F68109] bg-[#FFF5EC]"
														: completed
														? "border-emerald-500 bg-emerald-50 text-emerald-600"
														: "border-gray-300 bg-white text-gray-500"
												}`}
												aria-current={active ? "step" : undefined}
											>
												{idx + 1}
											</button>
											{idx !== steps.length - 1 && (
												<span className={`mt-2 h-10 w-px ${completed ? "bg-emerald-500" : "bg-gray-300"}`} />
											)}
										</div>
										<div className="flex-1 pt-0.5">
											<p
												className={`text-xs font-medium tracking-wide uppercase mb-0.5 ${
													active ? "text-[#F68109]" : "text-gray-500"
												}`}
											>
												Step {idx + 1}
											</p>
											<p className="font-semibold text-sm mb-1">{s.title}</p>
											<p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
												{s.subtitle}
											</p>
										</div>
									</li>
								);
							})}
						</ol>
					</div>
				</aside>
				{/* Main Card */}
				<div className="flex-1">
					<div className="rounded-xl bg-white p-8 shadow-sm border border-gray-100 flex flex-col min-h-[560px]">
						<header className="mb-8">
							<h2 className="text-xl md:text-2xl font-bold mb-1">{step.title}</h2>
							<p className="text-sm text-gray-600 max-w-prose">{step.subtitle}</p>
						</header>

						{/* Success Message */}
						{submitSuccess && (
							<div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
								<svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
								</svg>
								<div className="flex-1">
									<p className="text-sm font-medium text-emerald-800 mb-1">Listing submitted successfully!</p>
									<p className="text-xs text-emerald-600">Your property listing has been submitted for review. Redirecting to dashboard...</p>
								</div>
							</div>
						)}

						{/* Error Message */}
						{submitError && (
							<div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
								<svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
								<div className="flex-1">
									<p className="text-sm font-medium text-red-800 mb-1">Error submitting listing</p>
									<p className="text-xs text-red-600">{submitError}</p>
								</div>
								<button 
									type="button"
									onClick={() => setSubmitError(null)}
									className="text-red-400 hover:text-red-600"
									aria-label="Dismiss error"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						)}

						<div className="flex-1">{content()}</div>
						<div className="mt-10 flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
							<button
								type="button"
								onClick={goBack}
								disabled={current === 0 || isSubmitting}
								className={`px-8 py-3 rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
									current === 0 || isSubmitting
										? "bg-gray-200 text-gray-500 cursor-not-allowed"
										: "bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-400"
								}`}
							>
								Back
							</button>
							{current < steps.length - 1 ? (
								<button
									type="button"
									onClick={goNext}
									disabled={isSubmitting}
									className="px-10 py-3 rounded-full bg-[#83C12C] text-white text-sm font-medium hover:bg-[#6ba31d] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#83C12C] disabled:bg-gray-300 disabled:cursor-not-allowed"
								>
									Next
								</button>
							) : (
								<button
									type="button"
									onClick={handleFinish}
									disabled={isSubmitting || submitSuccess}
									className="px-10 py-3 rounded-full bg-[#83C12C] text-white text-sm font-medium hover:bg-[#6ba31d] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#83C12C] disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
								>
									{isSubmitting ? (
										<>
											<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
											</svg>
											<span>{uploadingPhotos ? `Uploading photos (${photoFiles.length})...` : 'Submitting...'}</span>
										</>
									) : (
										<span>Finish</span>
									)}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}