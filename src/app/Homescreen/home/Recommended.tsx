"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getApprovedListings } from "@/lib/services/listings";
import type { PropertyListing } from "@/types/listing";

interface RecommendedItem {
	id: string;
	title: string;
	location: string;
	price: number; // numeric price for calculations
	image: string;
	rating: number;
	verified?: boolean;
	ratePeriod: string;
}

export default function Recommended() {
	const [recommended, setRecommended] = useState<RecommendedItem[]>([]);
	const [loading, setLoading] = useState(true);
	const phpFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 });
	const router = useRouter();

	const handleBookNow = (item: RecommendedItem) => {
		const params = new URLSearchParams({
			id: item.id,
			title: item.title,
			location: item.location,
			price: item.price.toString(),
			rating: item.rating.toString(),
			image: item.image,
			verified: item.verified ? 'true' : 'false',
			ratePeriod: item.ratePeriod
		});
		router.push(`/PropertyListing?${params.toString()}`);
	};

	useEffect(() => {
		async function fetchRecommendedListings() {
			try {
				// Fetch up to 8 approved listings
				const listings = await getApprovedListings(8);
				
				// Transform Firebase listings to RecommendedItem format
				const items: RecommendedItem[] = listings
					.filter(listing => listing.status === "approved")
					.map((listing: PropertyListing) => {
						// Parse price from string (remove currency symbols and commas)
						const priceString = listing.rate.replace(/[₱,\s]/g, '');
						const price = parseFloat(priceString) || 0;

						return {
							id: listing.id,
							title: listing.propertyName,
							location: `${listing.barangay}, ${listing.city}`,
							price: price,
							image: listing.coverPhoto || listing.photos[0] || "/apartments.jpg",
							rating: listing.averageRating || 4.5,
							verified: listing.status === "approved",
							ratePeriod: listing.ratePeriod || "per month"
						};
					})
					// Sort by rating (highest first) for truly "recommended" items
					.sort((a, b) => b.rating - a.rating)
					.slice(0, 4); // Show top 4 recommendations

				setRecommended(items);
			} catch (error) {
				console.error("Error fetching recommended listings:", error);
				// Keep empty array on error
			} finally {
				setLoading(false);
			}
		}

		fetchRecommendedListings();
	}, []);

	return (
		<section className="w-full mx-auto px-6 pb-6 mb-20">
			<div className="flex items-center justify-between mb-6 mt-4">
				<h2 className="text-2xl md:text-3xl font-black text-[#222]">Recommended For You</h2>
			</div>
			
			{loading ? (
				<div className="flex items-center justify-center py-12">
					<p className="text-gray-500">Loading recommendations...</p>
				</div>
			) : recommended.length === 0 ? (
				<div className="flex items-center justify-center py-12">
					<p className="text-gray-500">No recommendations available at the moment.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
					{recommended.map((item) => (
						<div key={item.id} className="bg-white rounded-[32px] shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 p-0 flex flex-col">
							<div className="relative w-full h-52 overflow-hidden">
								<Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover"
									sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
								/>
								{item.verified && (
									<span className="absolute top-3 right-3 bg-[#83C12C] text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
										<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
											<path fillRule='evenodd' d='M16.704 5.29a.75.75 0 010 1.06l-7.09 7.1a.75.75 0 01-1.07 0L3.296 8.5a.75.75 0 111.06-1.06l4.008 4.007 6.56-6.56a.75.75 0 011.06 0z' clipRule='evenodd' />
										</svg>
										Verified
									</span>
								)}
							</div>
							<div className="px-6 pt-5 pb-6 flex flex-col flex-1">
								<div className="flex items-start justify-between mb-2 gap-4">
									<h3 className="text-[15px] font-black text-gray-900 leading-snug">{item.title}</h3>
									<div className="flex items-center gap-1 text-[#F7B500] font-semibold text-sm flex-none">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
										</svg>
										{item.rating.toFixed(1)}
									</div>
								</div>
								<div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
										<path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
									</svg>
									{item.location}
								</div>
								<div className="flex items-end justify-between mt-auto gap-4">
									<p className="text-[20px] font-black text-gray-900 leading-none">
										{phpFormatter.format(item.price)}
										<span className="text-gray-500 text-xs font-medium block mt-1">{item.ratePeriod}</span>
									</p>
									<button 
										onClick={() => handleBookNow(item)}
										className="px-5 py-2 rounded-full bg-[#1078CF] text-white text-xs font-semibold hover:bg-[#0d65ad] transition-colors shadow flex-none"
									>
										Book Now
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}

