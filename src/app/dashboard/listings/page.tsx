"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

interface ListingItem {
  id: string;
  title: string;
  location: string;
  image: string; // prefer unsplash with query for perf
  rating: number;
  reviews: number;
  bookings: number;
  guests: number;
  pricePerNight: number;
  profitThisMonth: number;
  status: "active" | "inactive";
  verified: boolean;
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-white border border-[#E5E7EB] h-[92px] px-6">
      <div className="text-3xl font-bold text-[#111827] font-lexend">{value}</div>
      <div className="text-sm text-[#6B7280] font-lexend">{label}</div>
    </div>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1 text-white">
      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-sm font-lexend font-semibold">{value.toFixed(1)}</span>
    </div>
  );
}

function SmallStat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1 text-[#111827] text-sm font-lexend">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function ListingCard({ item }: { item: ListingItem }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm">
      <div className="relative h-52">
        <Image
          src={item.image}
          alt={`${item.title} photo`}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          priority={false}
        />
        {item.verified && (
          <div className="absolute top-3 right-3 bg-[#83C12C] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Image src="/Vector (1).png" alt="Verified" width={16} height={16} className="w-4 h-4" />
            Verified
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1">
          <h3 className="font-lexend font-bold text-[#111827] text-[18px] leading-tight">{item.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-[#6B7280] text-sm font-lexend mt-1">
          <svg className="w-4 h-4 text-[#1078CF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{item.location}</span>
        </div>

        <hr className="border-t border-gray-100 my-4" />

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" aria-hidden>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-lg font-lexend font-semibold text-[#F5A623]">{item.rating.toFixed(1)}</span>
            </div>
            <div className="text-sm text-[#6B7280] mt-1">{item.reviews} Reviews</div>
          </div>

          <div className="flex flex-col items-center border-l border-gray-100 pl-4">
            <div className="text-xl font-lexend font-bold text-[#111827]">{item.bookings}</div>
            <div className="text-sm text-[#6B7280]">bookings</div>
          </div>

          <div className="flex flex-col items-center border-l border-gray-100 pl-4">
            <div className="text-xl font-lexend font-bold text-[#111827]">{item.guests}</div>
            <div className="text-sm text-[#6B7280]">guests</div>
          </div>
        </div>

        <hr className="border-t border-gray-100 mb-4" />

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[#9CA3AF] font-lexend">Profit This Month</div>
            <div className="text-[#83C12C] text-2xl font-lexend font-bold">₱{item.profitThisMonth.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#9CA3AF] font-lexend">Price per Night</div>
            <div className="text-[#F68109] text-2xl font-lexend font-bold">₱{item.pricePerNight.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              role="switch"
              aria-checked={item.status === "active"}
              className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
                item.status === "active" ? "bg-[#22C55E]" : "bg-gray-200"
              }`}
            >
              <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${item.status === "active" ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className="text-sm font-lexend text-[#111827]">Active</span>
          </div>
          <div>
            <button className="inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-[#BEE0FF] text-[#1078CF] bg-white hover:bg-[#F1FAFF] text-sm font-lexend">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 3.5a2.121 2.121 0 113 3L8 18l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyListingsPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const listings: ListingItem[] = [
    {
      id: "1",
      title: "Loakan Heights Residences",
      location: "Near Camp John Hay",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=820&h=560&fit=crop&crop=center&auto=format",
      rating: 4.6,
      reviews: 24,
      bookings: 18,
      guests: 4,
      pricePerNight: 4200,
      profitThisMonth: 12000,
      status: "active",
      verified: true,
    },
    {
      id: "2",
      title: "Sunrise Pines Lodge",
      location: "Near Saint Louis University",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=820&h=560&fit=crop&crop=center&auto=format",
      rating: 4.8,
      reviews: 30,
      bookings: 22,
      guests: 5,
      pricePerNight: 4500,
      profitThisMonth: 9000,
      status: "active",
      verified: true,
    },
    {
      id: "3",
      title: "Session View Apartments",
      location: "Near Session Road",
      image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d55?w=820&h=560&fit=crop&crop=center&auto=format",
      rating: 4.5,
      reviews: 12,
      bookings: 10,
      guests: 3,
      pricePerNight: 3800,
      profitThisMonth: 6000,
      status: "inactive",
      verified: true,
    },
  ];

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesQuery = !query || l.title.toLowerCase().includes(query.toLowerCase()) || l.location.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || l.status === statusFilter.toLowerCase();
      // typeFilter placeholder for future expansion
      const matchesType = typeFilter === "All Types" || true;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [listings, query, statusFilter, typeFilter]);

  const totals = useMemo(() => {
    const total = listings.length;
    const active = listings.filter((l) => l.status === "active").length;
    const inactive = listings.filter((l) => l.status === "inactive").length;
    const verified = listings.filter((l) => l.verified).length;
    return { total, active, inactive, verified };
  }, [listings]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-[22px] md:text-[24px] font-lexend font-semibold text-[#111827]">My Listings</h1>
        <p className="text-[#6B7280] text-sm mt-1 font-lexend">Manage your properties and track their performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Listings" value={totals.total} />
        <StatCard label="Active Listings" value={totals.active} />
        <StatCard label="Inactive" value={totals.inactive} />
        <StatCard label="Verified" value={totals.verified} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 h-12 rounded-full bg-white border border-[#E5E7EB] px-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm font-lexend"
            placeholder="Search by name or location..."
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="h-12 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Types</option>
            <option>Apartment</option>
            <option>Transient</option>
            <option>Hotel</option>
          </select>
          <select
            className="h-12 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>

      {/* Footer helper */}
      <div className="text-center text-sm text-[#9CA3AF] font-lexend pt-6">
        Trapihaus - Safe, Affordable, Trusted Stays in Baguio.
      </div>
    </div>
  );
}
