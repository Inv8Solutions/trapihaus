"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import {
    getUpcomingReservations,
    getPastReservations,
    getCancelledReservations,
} from "@/lib/services/reservations";
import type { Reservation } from "@/types/reservation";

function formatDateRange(checkIn: Date, checkOut: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
    const checkInStr = checkIn.toLocaleDateString("en-US", options);
    const checkOutStr = checkOut.toLocaleDateString("en-US", options);
    return `${checkInStr} - ${checkOutStr}`;
}

type TabType = "upcoming" | "past" | "cancelled";

const tabs: { key: TabType; label: string }[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
    { key: "cancelled", label: "Cancelled" },
];

export default function PastTrips() {
    const [active, setActive] = useState<TabType>("past");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [upcomingTrips, setUpcomingTrips] = useState<Reservation[]>([]);
    const [pastTrips, setPastTrips] = useState<Reservation[]>([]);
    const [cancelledTrips, setCancelledTrips] = useState<Reservation[]>([]);

    useEffect(() => {
        const auth = getFirebaseAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setUserId(null);
                setLoading(false);
                return;
            }

            setUserId(user.uid);
            try {
                const [upcoming, past, cancelled] = await Promise.all([
                    getUpcomingReservations(user.uid),
                    getPastReservations(user.uid),
                    getCancelledReservations(user.uid),
                ]);
                setUpcomingTrips(upcoming);
                setPastTrips(past);
                setCancelledTrips(cancelled);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const getCurrentTrips = (): Reservation[] => {
        switch (active) {
            case "upcoming":
                return upcomingTrips;
            case "past":
                return pastTrips;
            case "cancelled":
                return cancelledTrips;
            default:
                return [];
        }
    };

    const filtered = getCurrentTrips();

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
            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white rounded-[36px] shadow-sm border border-gray-100 p-0 overflow-hidden animate-pulse">
                            <div className="h-56 bg-gray-200" />
                            <div className="px-8 pt-6 pb-7 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                                <div className="h-3 bg-gray-200 rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-[36px] border border-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <p className="text-gray-500 text-sm">No {active} trips.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {filtered.map(reservation => (
                        <div key={reservation.id} className="bg-white rounded-[36px] shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-0 overflow-hidden">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={reservation.propertyImage || "/apartments.jpg"}
                                    alt={reservation.propertyName}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width:1024px) 100vw, 50vw"
                                />
                                {reservation.isVerified && (
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
                                    <h3 className="text-[15px] font-black text-gray-900 leading-snug">{reservation.propertyName}</h3>
                                    <div className="text-[#222] font-bold text-sm">
                                        ₱{reservation.total.toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                                        <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                                    </svg>
                                    {reservation.propertyLocation}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l3 3" />
                                    </svg>
                                    {formatDateRange(reservation.checkInDate, reservation.checkOutDate)}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700 mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                    </svg>
                                    Booked by: <span className="font-medium">{reservation.guestFirstName} {reservation.guestLastName}</span>
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

