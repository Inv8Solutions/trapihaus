"use client";
import Image from "next/image";

interface TripItem {
  id: string;
  title: string;
  location: string;
  dateRange: string;
  image: string;
  rating: number;
  verified?: boolean;
}

const trips: TripItem[] = [
  {
    id: "1",
    title: "Lokan Heights Residences",
    location: "Near Camp John Hay",
    dateRange: "September 25-28, 2025",
    image: "/apartments.jpg",
    rating: 4.6,
    verified: true,
  },
  {
    id: "2",
    title: "Lokan Heights Residences",
    location: "Near Camp John Hay",
    dateRange: "September 25-28, 2025",
    image: "/apartments.jpg",
    rating: 4.6,
    verified: true,
  },
  {
    id: "3",
    title: "Lokan Heights Residences",
    location: "Near Camp John Hay",
    dateRange: "September 25-28, 2025",
    image: "/apartments.jpg",
    rating: 4.6,
    verified: true,
  },
];

export default function RecentTrips() {
  return (
    <section className="w-full mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-[#222]">Your Recent Trips</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={trip.image}
                alt={trip.title}
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                priority
              />
              {trip.verified && (
                <span className="absolute top-3 right-3 bg-[#83C12C] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Verified
                </span>
              )}
            </div>
            <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
              <h3 className="text-[15px] font-black text-gray-900 leading-snug mb-1 line-clamp-2">{trip.title}</h3>
              <div className="text-xs text-gray-600 mb-4 space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                  </svg>
                  {trip.location}
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l3 3" />
                  </svg>
                  {trip.dateRange}
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-[#F7B500] font-semibold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  {trip.rating.toFixed(1)}
                </div>
                <button className="px-5 py-2 rounded-full bg-[#1078CF] text-white text-xs font-semibold hover:bg-[#0d65ad] transition-colors shadow">
                  Book Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Utility to hide scrollbar (Tailwind plugin could be added later)
// Add this to globals if reused: .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }