"use client";

import { useState } from "react";
import AppImage from "../components/ui/AppImage";

export default function Listing() {
	const [guests, setGuests] = useState(0);
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");

	// Bedroom images from Unsplash to match the provided visuals
	const mainImage =
		"https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80";
	const thumbs = [
		"https://images.unsplash.com/photo-1505691723518-36a5ac3b2b8b?auto=format&fit=crop&w=800&q=80",
		"https://images.unsplash.com/photo-1505692794403-34f9a53f1a5f?auto=format&fit=crop&w=800&q=80",
		"https://images.unsplash.com/photo-1505693314120-6e2b274e82ab?auto=format&fit=crop&w=800&q=80",
	];

	// Mock details beneath About section
	const offers = [
		{ label: "Wi‑Fi", icon: (
			<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
				<path d="M5 12a10 10 0 0114 0" />
				<path d="M8.5 15.5a6 6 0 016 0" />
				<path d="M12 19h.01" />
			</svg>
		)},
		{ label: "Air Conditioning", icon: (
			<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
				<path d="M12 2v20M2 12h20" />
				<path d="M4 4l4 4M20 4l-4 4M4 20l4-4M20 20l-4-4" />
			</svg>
		)},
		{ label: "Heating", icon: (
			<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
				<path d="M12 3v8a4 4 0 104 4" />
			</svg>
		)},
		{ label: "Pet Friendly", icon: (
			<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
				<circle cx="9" cy="8" r="2" />
				<circle cx="15" cy="8" r="2" />
				<circle cx="7" cy="12" r="2" />
				<circle cx="17" cy="12" r="2" />
				<path d="M12 13c2.5 0 4.5 1.5 4.5 3.5S14.5 20 12 20s-4.5-1-4.5-3.5S9.5 13 12 13z" />
			</svg>
		)},
		{ label: "TV", icon: (
			<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
				<rect x="2" y="6" width="20" height="14" rx="2" />
				<path d="M12 2l4 4M12 2L8 6" />
			</svg>
		)},
		{ label: "Breakfast", icon: (
			<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
				<path d="M3 10h14a4 4 0 010 8H3z" />
				<path d="M17 10V6a3 3 0 013-3h1v7" />
			</svg>
		)},
	];

	const reviews = Array.from({ length: 3 }, () => ({
		name: "Reynold Galvin",
		initials: "RG",
		date: "September 2025",
		rating: 5,
		text:
			"Loakan Heights Residences felt like home. The place was clean, safe, and very affordable. Perfect for my semester stay in Baguio, and the host was super accommodating. I'll definitely book again through Trapihauss!",
	}));

	return (
		<main className="max-w-full mx-auto px-6 py-10 bg-[#F5F5F5]">
			{/* Page header */}
			<header className="mb-6 flex items-start justify-between gap-4">
				<div>
					<h1 className="text-3xl md:text-[32px] leading-tight font-extrabold font-lexend">Loakan Heights Residences</h1>
					<div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
						<span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">
							{/* check icon */}
							<svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.07a1 1 0 01-1.415 0L3.293 9.95a1 1 0 011.414-1.414l3.1 3.1 6.364-6.364a1 1 0 011.536.021z" clipRule="evenodd" />
							</svg>
							Verified
						</span>
						<span className="inline-flex items-center gap-2">
							<svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
								<path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
							</svg>
							Near Camp John Hay
						</span>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50">
						<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
							<path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"/>
							<path d="M16 6l-4-4-4 4"/>
							<path d="M12 2v14"/>
						</svg>
						Share
					</button>
					<button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50">
						<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
							<path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
						</svg>
						Save
					</button>
				</div>
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-10 items-start">
				{/* Left Sidebar (Booking Card) */}
				<aside className="space-y-6">
					<div className="bg-white rounded-[28px] p-6 shadow-md border border-[#F3F4F6] top-8 transition-transform duration-300 will-change-transform"
						style={{
							transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
						}}
					>
						<div className="flex items-center justify-between bg-[#F9FAFB] p-5 rounded-[20px] mb-5">
							<div>
								<div className="text-2xl font-bold font-lexend">{String.fromCharCode(0x20b1)}2,500</div>
								<div className="text-xs text-gray-500">per night</div>
							</div>
							<div className="text-sm text-yellow-500 flex items-center gap-2">
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
									<path d="M12 .587l3.668 7.431L23.4 9.748l-5.7 5.556L18.82 24 12 19.897 5.18 24l1.12-8.696L.6 9.748l7.732-1.73z" />
								</svg>
								<span className="font-medium text-gray-700">4.6</span>
								<span className="text-gray-400 text-xs">(17 Reviews)</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3 mb-3">
							<label className="text-xs text-gray-600">Check-in</label>
							<label className="text-xs text-gray-600">Check-out</label>
							<div className="relative">
								<svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
									<line x1="16" y1="2" x2="16" y2="6"/>
									<line x1="8" y1="2" x2="8" y2="6"/>
									<line x1="3" y1="10" x2="21" y2="10"/>
								</svg>
								<input
									type="date"
									value={checkIn}
									onChange={(e) => setCheckIn(e.target.value)}
									placeholder="mm/dd/yyyy"
									className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm"
								/>
							</div>
							<div className="relative">
								<svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
									<line x1="16" y1="2" x2="16" y2="6"/>
									<line x1="8" y1="2" x2="8" y2="6"/>
									<line x1="3" y1="10" x2="21" y2="10"/>
								</svg>
								<input
									type="date"
									value={checkOut}
									onChange={(e) => setCheckOut(e.target.value)}
									placeholder="mm/dd/yyyy"
									className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm"
								/>
							</div>
						</div>

						<div className="mb-4">
							<div className="text-xs text-gray-600 mb-1">Guest</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1">
									<button
										type="button"
										aria-label="decrease guests"
										onClick={() => setGuests((g) => Math.max(0, g - 1))}
										className="w-7 h-7 rounded-md bg-gray-100"
									>
										-
									</button>
									<div className="w-8 text-center text-sm font-medium">{guests}</div>
									<button
										type="button"
										aria-label="increase guests"
										onClick={() => setGuests((g) => g + 1)}
										className="w-7 h-7 rounded-md bg-gray-100"
									>
										+
									</button>
								</div>
								<button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium">Check Availability</button>
							</div>
						</div>
						<div className="border-t border-gray-100 pt-4">
							<div className="flex items-center gap-3">
								<AppImage src="/woman.png" alt="Photo of host, Mika De Guzman" width={48} height={48} className="rounded-full object-cover" />
								<div>
									<div className="text-sm font-semibold">Hosted by Mika De Guzman</div>
									<div className="text-xs text-gray-500">Verified Host</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-[28px] p-6 shadow-md border border-[#F3F4F6]">
						<h3 className="text-lg font-semibold mb-3">About the Accommodation</h3>
						<p className="text-sm text-gray-600 leading-relaxed mb-3">
							Experience modern comfort in the cool highlands of Baguio at Loakan Heights Residences. Nestled near the Loakan area, this property offers a perfect mix of accessibility and serenity — just 15 minutes from Session Road and 10 minutes from the Baguio Airport.
						</p>
						<ul className="text-sm text-gray-600 space-y-2">
							<li>• Spacious rooms and apartments</li>
							<li>• Walking distance to local eateries and transport hubs</li>
							<li>• Quiet neighborhood with a refreshing mountain view</li>
							<li>• Budget-friendly rates with flexible options</li>
						</ul>
					</div>

					{/* What this place offers */}
					<div className="bg-white rounded-[28px] p-6 shadow-md border border-[#F3F4F6]">
						<h3 className="text-lg font-semibold mb-4">What this place offers</h3>
						<div className="flex flex-wrap gap-2">
							{offers.map((o) => (
								<span key={o.label} className="inline-flex items-center gap-2 rounded-full bg-[#F9FAFB] text-gray-700 text-xs px-3 py-2 border border-gray-100">
									{o.icon}
									{o.label}
								</span>
							))}
						</div>
					</div>

					{/* Where you'll be section */}
					<div className="bg-white rounded-[28px] p-6 shadow-md border border-[#F3F4F6]">
						<h3 className="text-lg font-semibold mb-4">Where you'll be</h3>
						<div className="mb-4 inline-flex items-center gap-2 text-gray-600 text-sm">
							<svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
								<path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
							</svg>
							Near Camp John Hay
						</div>
						<div className="h-48 rounded-2xl border border-gray-200 bg-[#F3F4F6] flex items-center justify-center text-gray-400 text-sm">
							Google Maps
						</div>
					</div>

					{/* Reviews */}
					<div className="bg-white rounded-[28px] p-6 shadow-md border border-[#F3F4F6]">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold">Reviews</h3>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
									<path d="M12 .587l3.668 7.431L23.4 9.748l-5.7 5.556L18.82 24 12 19.897 5.18 24l1.12-8.696L.6 9.748l7.732-1.73z" />
								</svg>
								<span className="font-medium">4.6</span>
								<span className="text-gray-400 text-xs">(17 Reviews)</span>
							</div>
						</div>
						<div className="mt-4 divide-y divide-gray-100">
							{reviews.map((r, idx) => (
								<div key={idx} className="py-5">
									<div className="flex items-start gap-3 mb-2">
										<div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-semibold">{r.initials}</div>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<p className="text-sm font-medium">{r.name}</p>
												<p className="text-xs text-gray-500">{r.date}</p>
											</div>
											<div className="flex items-center gap-1 text-yellow-500 my-1">
												{Array.from({ length: r.rating }).map((_, i) => (
													<svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
														<path d="M12 .587l3.668 7.431L23.4 9.748l-5.7 5.556L18.82 24 12 19.897 5.18 24l1.12-8.696L.6 9.748l7.732-1.73z" />
													</svg>
												))}
											</div>
											<p className="text-sm text-gray-600 leading-relaxed">“{r.text}”</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</aside>

				{/* Right: Gallery */}
				<section>
					<div className="bg-white rounded-[28px] p-6 shadow-lg border border-[#F3F4F6]">
						<div className="flex flex-col gap-6">
							{/* Big image on top */}
							<div className="relative w-full h-[480px] rounded-[28px] overflow-hidden shadow-sm">
								<AppImage
									src={mainImage}
									alt="Cozy bedroom with single bed, warm lighting, and window view"
									fillParent
									priority
									sizes="(max-width: 768px) 100vw, 60vw"
									className="object-cover rounded-[28px]"
								/>
							</div>

							{/* Thumbnails below (square, dynamic) */}
							<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
								{thumbs.map((t, i) => (
									<div key={t} className="relative overflow-hidden rounded-[18px] aspect-square">
										<AppImage src={t} alt={`Bedroom thumbnail ${i + 1}`} fillParent className="object-cover rounded-[18px]" />
										{i === thumbs.length - 1 && (
											<div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium rounded-[18px]">View all Photos</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

