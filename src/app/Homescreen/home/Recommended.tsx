"use client";
import Image from "next/image";

interface RecommendedItem {
	id: string;
	title: string;
	location: string;
	price: string;
	image: string;
	rating: number;
	featured?: boolean;
}

const recommended: RecommendedItem[] = [
	{
		id: "r1",
		title: "Skyline Executive Suite",
		location: "Baguio City Center",
		price: "$120 / night",
		image: "/hotels.jpg",
		rating: 4.8,
		featured: true,
	},
	{
		id: "r2",
		title: "Pine Grove Loft",
		location: "Outskirts, Baguio",
		price: "$92 / night",
		image: "/apartments.jpg",
		rating: 4.7,
	},
	{
		id: "r3",
		title: "Hilltop Modern Cabin",
		location: "Camp John Hay",
		price: "$140 / night",
		image: "/transients.jpg",
		rating: 4.9,
	},
	{
		id: "r4",
		title: "Botanical Garden Flat",
		location: "Botanical Area",
		price: "$110 / night",
		image: "/botanical.png",
		rating: 4.6,
	},
];

export default function Recommended() {
	return (
		<section className="w-full mx-auto px-6 pb-6 mb-20">
			<div className="flex items-center justify-between mb-6 mt-4">
				<h2 className="text-2xl md:text-3xl font-black text-[#222]">Recommended For You</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
				{recommended.map((item) => (
					<div key={item.id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
						<div className="relative aspect-[4/3] w-full overflow-hidden">
							<Image
								src={item.image}
								alt={item.title}
								fill
								className="object-cover"
								sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
							/>
							{item.featured && (
								<span className="absolute top-3 left-3 bg-[#F68109] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
									Featured
								</span>
							)}
						</div>
						<div className="px-4 pt-3 pb-4 flex flex-col flex-1">
							<h3 className="text-sm font-black text-gray-900 leading-snug mb-1 line-clamp-2">{item.title}</h3>
							<p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
									<path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
								</svg>
								{item.location}
							</p>
							<div className="flex items-center justify-between mt-auto">
								<div className="flex items-center gap-1 text-[#F7B500] font-semibold text-xs">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
									</svg>
									{item.rating.toFixed(1)}
								</div>
								<button className="px-4 py-2 rounded-full bg-[#1078CF] text-white text-xs font-semibold hover:bg-[#0d65ad] transition-colors shadow">
									View
								</button>
							</div>
							<p className="mt-2 text-xs font-semibold text-blue-600">{item.price}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

