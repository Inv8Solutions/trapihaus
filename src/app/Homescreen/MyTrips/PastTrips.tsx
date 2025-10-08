"use client";
import Image from "next/image";
import { useState } from "react";

interface TripCardData {
    id: string;
    title: string;
    location: string;
    dateRange: string;
    image: string;
    rating: number;
    verified?: boolean;
    status: "upcoming" | "past" | "cancelled";
}

const trips: TripCardData[] = [
    {
        id: "1",
        title: "Loakan Heights Residences",
        location: "Near Camp John Hay",
        dateRange: "September 25-28, 2025",
        image: "/apartments.jpg",
        rating: 4.6,
        verified: true,
        status: "past",
    },
    {
        id: "2",
        title: "Loakan Heights Residences",
        location: "Near Camp John Hay",
        dateRange: "July 12-15, 2025",
        image: "/apartments.jpg",
        rating: 4.6,
        verified: true,
        status: "past",
    },
    {
        id: "3",
        title: "Loakan Heights Residences",
        location: "Near Camp John Hay",
        dateRange: "May 02-05, 2025",
        image: "/apartments.jpg",
        rating: 4.6,
        verified: true,
        status: "cancelled",
    },
];

const tabs: { key: TripCardData["status"]; label: string }[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
    { key: "cancelled", label: "Cancelled" },
];

export default function PastTrips() {
    const [active, setActive] = useState<TripCardData["status"]>("past");
    const filtered = trips.filter(t => t.status === active);

    return (
        <div className="px-8 py-10 mb-20">
            {/* Tabs */}
            <div className="flex gap-8 mb-10">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActive(tab.key)}
                        className={`px-10 py-6 rounded-[28px] text-sm md:text-base font-semibold font-lexend shadow-sm transition-colors border ${active === tab.key ? "bg-white text-gray-900" : "bg-white/60 text-gray-500 hover:text-gray-700"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
                <p className="text-gray-500 text-sm">No {active} trips.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {filtered.map(trip => (
                        <div key={trip.id} className="bg-white rounded-[36px] shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-0 overflow-hidden">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={trip.image}
                                    alt={trip.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width:1024px) 100vw, 50vw"
                                    priority
                                />
                                {trip.verified && (
                                    <span className="absolute top-3 right-3 bg-[#83C12C] text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
                                            <path fillRule='evenodd' d='M16.704 5.29a.75.75 0 010 1.06l-7.09 7.1a.75.75 0 01-1.07 0L3.296 8.5a.75.75 0 111.06-1.06l4.008 4.007 6.56-6.56a.75.75 0 011.06 0z' clipRule='evenodd' />
                                        </svg>
                                        Verified
                                    </span>
                                )}
                            </div>
                            <div className="px-8 pt-6 pb-7">
                                <div className="flex items-start justify-between mb-2 gap-4">
                                    <h3 className="text-[15px] font-black text-gray-900 leading-snug">{trip.title}</h3>
                                    <div className="flex items-center gap-1 text-[#F7B500] font-semibold text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
                                        </svg>
                                        {trip.rating.toFixed(1)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                                        <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                                    </svg>
                                    {trip.location}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l3 3" />
                                    </svg>
                                    {trip.dateRange}
                                </div>
                                <div className="flex justify-end">
                                    <button className="px-6 py-2 rounded-full bg-[#1078CF] text-white text-xs font-semibold hover:bg-[#0d65ad] transition-colors shadow">
                                        Book Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

