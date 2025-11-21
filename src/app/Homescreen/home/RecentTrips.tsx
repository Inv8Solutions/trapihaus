              "use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { getUserReservations } from "@/lib/services/reservations";
import type { Reservation } from "@/types/reservation";

function formatDateRange(checkIn: Date, checkOut: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  const checkInStr = checkIn.toLocaleDateString("en-US", options);
  const checkOutStr = checkOut.toLocaleDateString("en-US", options);
  return `${checkInStr} - ${checkOutStr}`;
}

export default function RecentTrips() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserId(null);
        setReservations([]);
        setLoading(false);
        return;
      }

      setUserId(user.uid);
      try {
        // Fetch all reservations for the user (completed and past trips)
        const userReservations = await getUserReservations(user.uid, "completed");
        // Sort by most recent first and limit to 4 for display
        const recentTrips = userReservations.slice(0, 4);
        setReservations(recentTrips);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  if (loading) {
    return (
      <section className="w-full mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#222]">Your Recent Trips</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="px-5 pt-4 pb-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!userId || reservations.length === 0) {
    return (
      <section className="w-full mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#222]">Your Recent Trips</h2>
        </div>
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No trips yet</h3>
          <p className="text-gray-600 mb-6">Start exploring amazing properties and book your first trip!</p>
          <a href="/browse" className="inline-block px-6 py-3 rounded-full bg-[#1078CF] text-white font-semibold hover:bg-[#0d65ad] transition-colors">
            Browse Properties
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-[#222]">Your Recent Trips</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={reservation.propertyImage || "/apartments.jpg"}
                alt={reservation.propertyName}
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
              />
              {reservation.isVerified && (
                <span className="absolute top-3 right-3 bg-[#83C12C] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Verified
                </span>
              )}
            </div>
            <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
              <h3 className="text-[15px] font-black text-gray-900 leading-snug mb-1 line-clamp-2">{reservation.propertyName}</h3>
              <div className="text-xs text-gray-600 mb-4 space-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                  </svg>
                  {reservation.propertyLocation}
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l3 3" />
                  </svg>
                  {formatDateRange(reservation.checkInDate, reservation.checkOutDate)}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                  </svg>
                  {reservation.guests} {reservation.guests === 1 ? "guest" : "guests"}
                </div>
                <div className="flex items-center gap-1 text-gray-700 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                  </svg>
                  Booked by: {reservation.guestFirstName} {reservation.guestLastName}
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-[#222] font-bold text-sm">
                  ₱{reservation.total.toLocaleString()}
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