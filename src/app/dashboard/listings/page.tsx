"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSquareParking,
  faUtensils,
  faTv,
  faSnowflake,
  faFire,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { getUserListings, updateListing } from "@/lib/services/listings";
import type { PropertyListing } from "@/types/listing";

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
  amenities?: string[]; // optional for now
  houseRules?: string[];
  cancellationPolicy?: "Flexible" | "Moderate" | "Strict";
  userId?: string; // For Firestore updates
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-white border border-[#E5E7EB] h-[92px] px-6">
      <div className="text-3xl font-bold text-[#111827] font-lexend">{value}</div>
      <div className="text-sm text-[#6B7280] font-lexend">{label}</div>
    </div>
  );
}

function ListingCard({ item, onEdit, onToggleStatus }: { item: ListingItem; onEdit: (id: string) => void; onToggleStatus: (id: string) => void }) {
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
              onClick={() => onToggleStatus(item.id)}
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
            <button
              onClick={() => onEdit(item.id)}
              className="inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-[#BEE0FF] text-[#1078CF] bg-white hover:bg-[#F1FAFF] text-sm font-lexend"
            >
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

  // Listings need to be stateful so edits can update the card
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pastedImage, setPastedImage] = useState<string | null>(null); // data URL
  const [isSaving, setIsSaving] = useState(false);
  const pasteAreaRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Multi-page (tabs) state
  const [activeTab, setActiveTab] = useState<"basic" | "details" | "amenities" | "rules">("basic");

  // Basic Info form state (prefilled when opening modal)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [price, setPrice] = useState<number | "">("");
  const [address, setAddress] = useState("");

  // Details tab state
  const [maxGuests, setMaxGuests] = useState<number>(2);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [beds, setBeds] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [checkInTime, setCheckInTime] = useState<string>("2:00 PM");
  const [checkOutTime, setCheckOutTime] = useState<string>("12:00 PM");

  // Amenities tab state
  const AMENITY_LIST = [
    { key: "wifi", label: "WiFi", icon: <FontAwesomeIcon icon={faWifi} className="w-5 h-5" /> },
    { key: "parking", label: "Parking", icon: <FontAwesomeIcon icon={faSquareParking} className="w-5 h-5" /> },
    { key: "kitchen", label: "Kitchen", icon: <FontAwesomeIcon icon={faUtensils} className="w-5 h-5" /> },
    { key: "tv", label: "TV", icon: <FontAwesomeIcon icon={faTv} className="w-5 h-5" /> },
    { key: "aircon", label: "Air Conditioning", icon: <FontAwesomeIcon icon={faSnowflake} className="w-5 h-5" /> },
    { key: "heating", label: "Heating", icon: <FontAwesomeIcon icon={faFire} className="w-5 h-5" /> },
    { key: "hotwater", label: "Hot Water", icon: <FontAwesomeIcon icon={faShower} className="w-5 h-5" /> },
  ] as const;
  const [amenities, setAmenities] = useState<string[]>([]);
  const toggleAmenity = (key: string) => {
    setAmenities((prev) => (prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]));
  };

  // Rules & Policies state
  const [houseRulesText, setHouseRulesText] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState<"Flexible" | "Moderate" | "Strict">("Moderate");
  const policyDescriptions: Record<typeof cancellationPolicy, string> = {
    Flexible: "Full refund up to 1 day before check-in",
    Moderate: "Full refund up to 5 days before check-in",
    Strict: "50% refund up to 7 days before check-in",
  };

  const openEdit = (id: string) => {
    setSelectedId(id);
    setPastedImage(null);
    // Prefill form based on selected listing
    const l = listings.find((x) => x.id === id);
    if (l) {
      setTitle(l.title);
      setDescription("");
      setPropertyType("Apartment");
      setPrice(l.pricePerNight);
      setAddress(l.location);
      setMaxGuests(l.guests);
      setBedrooms(2);
      setBeds(3);
      setBathrooms(2);
      setCheckInTime("2:00 PM");
      setCheckOutTime("12:00 PM");
      setAmenities(l.amenities ?? ["wifi", "parking", "kitchen", "tv", "aircon"]);
      setHouseRulesText((l.houseRules ?? []).join("\n"));
      setCancellationPolicy(l.cancellationPolicy ?? "Moderate");
    }
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPastedImage(null);
    setSelectedId(null);
  };

  const toggleStatus = async (id: string) => {
    const listing = listings.find((l) => l.id === id);
    if (!listing || !listing.userId) return;

    const newStatus = listing.status === "active" ? "inactive" : "active";
    const firestoreStatus = newStatus === "active" ? "approved" : "draft";

    try {
      // Update in Firestore
      await updateListing(id, listing.userId, { status: firestoreStatus });

      // Update local state
      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: newStatus, verified: newStatus === "active" } : l
        )
      );
    } catch (error) {
      console.error("Failed to update listing status:", error);
      alert("Failed to update listing status. Please try again.");
    }
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            setPastedImage(result);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    }
  };

  const saveChanges = async () => {
    if (!selectedId) return;
    
    const listing = listings.find((l) => l.id === selectedId);
    if (!listing || !listing.userId) {
      alert("Unable to save: Missing user information");
      return;
    }

    try {
      setIsSaving(true);

      // Prepare update data
      const updateData: Record<string, unknown> = {};
      
      if (title && title !== listing.title) updateData.propertyName = title;
      if (address && address !== listing.location) {
        // Parse address back to components
        const parts = address.split(",").map(s => s.trim());
        if (parts.length >= 2) {
          updateData.streetAddress = parts[0] || "";
          updateData.barangay = parts[1] || "";
          updateData.city = parts[2] || "Baguio City";
        }
      }
      if (typeof price === "number" && price !== listing.pricePerNight) {
        updateData.rate = `₱${price.toLocaleString()}`;
      }
      if (maxGuests !== listing.guests) updateData.guests = maxGuests;
      if (bedrooms) updateData.bedrooms = bedrooms;
      if (bathrooms) updateData.bathrooms = bathrooms;
      if (amenities.length > 0) updateData.amenities = amenities;
      if (houseRulesText) updateData.houseRules = houseRulesText;
      
      // Only update if there are changes
      if (Object.keys(updateData).length > 0) {
        await updateListing(selectedId, listing.userId, updateData);
      }

      // Update local state
      setListings((prev) =>
        prev.map((l) =>
          l.id === selectedId
            ? {
                ...l,
                image: pastedImage ? pastedImage : l.image,
                title: title || l.title,
                location: address || l.location,
                pricePerNight: typeof price === "number" ? price : l.pricePerNight,
                guests: maxGuests || l.guests,
                amenities,
                houseRules: houseRulesText
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
                cancellationPolicy,
              }
            : l
        )
      );

      closeModal();
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Fetch user's listings from Firestore
  useEffect(() => {
    const firebaseAuth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        try {
          setLoading(true);
          const fetchedListings = await getUserListings(user.uid);
          
          // Transform PropertyListing to ListingItem format
          const transformed: ListingItem[] = fetchedListings.map((listing: PropertyListing) => ({
            id: listing.id,
            title: listing.propertyName,
            location: `${listing.streetAddress}, ${listing.barangay}, ${listing.city}`.trim(),
            image: listing.coverPhoto || listing.photos?.[0] || "/placeholder-image.jpg",
            rating: listing.averageRating || 0,
            reviews: listing.reviewCount || 0,
            bookings: listing.totalBookings || 0,
            guests: listing.guests || 1,
            pricePerNight: parseInt(listing.rate.replace(/[^0-9]/g, "")) || 0,
            profitThisMonth: 0, // TODO: Calculate from bookings
            status: listing.status === "approved" ? "active" : "inactive",
            verified: listing.status === "approved",
            amenities: listing.amenities || [],
            houseRules: listing.houseRules ? listing.houseRules.split("\n").filter(Boolean) : [],
            cancellationPolicy: "Moderate", // TODO: Add to listing type
            userId: listing.userId, // Store userId for updates
          }));
          
          setListings(transformed);
        } catch (error) {
          console.error("Failed to fetch listings:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setListings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Focus the paste area when modal opens for quick Ctrl+V
  useEffect(() => {
    if (isModalOpen && pasteAreaRef.current) {
      pasteAreaRef.current.focus();
    }
  }, [isModalOpen]);

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
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1078CF]"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg className="w-16 h-16 text-[#D1D5DB] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-lexend font-semibold text-[#111827] mb-2">No listings found</h3>
          <p className="text-sm text-[#6B7280] font-lexend mb-4">
            {query || statusFilter !== "All Status" 
              ? "Try adjusting your filters to see more listings."
              : "Start by creating your first property listing."}
          </p>
          {!query && statusFilter === "All Status" && (
            <a
              href="/ListProperty"
              className="inline-flex items-center gap-2 px-6 h-11 rounded-lg bg-[#1078CF] text-white text-sm font-lexend hover:bg-[#0e6dbb]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Listing
            </a>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ListingCard key={item.id} item={item} onEdit={openEdit} onToggleStatus={toggleStatus} />
          ))}
        </div>
      )}

      {/* Footer helper */}
      <div className="text-center text-sm text-[#9CA3AF] font-lexend pt-6">
        Trapihaus - Safe, Affordable, Trusted Stays in Baguio.
      </div>

      {/* Edit Modal: Multi-page UI with paste/upload image support */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onKeyDown={(e) => {
            if (e.key === "Escape") closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white w-[96vw] max-w-3xl rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden">
            {/* Header */}
            <div className="px-5 md:px-6 pt-5">
              <h2 className="text-lg md:text-xl font-lexend font-semibold text-[#111827]">Edit Listing</h2>
              <p className="text-xs md:text-sm text-[#6B7280] mt-0.5">Update your property details and settings</p>

              {/* Tabs */}
              <div className="mt-4 inline-flex items-center gap-2 bg-[#F3F4F6] rounded-full p-1">
                {([
                  { key: "basic", label: "Basic Info" },
                  { key: "details", label: "Details" },
                  { key: "amenities", label: "Amenities" },
                  { key: "rules", label: "Rules & Policies" },
                ] as const).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`h-9 px-3 md:px-4 rounded-full text-sm font-lexend transition-colors ${
                      activeTab === t.key ? "bg-white text-[#111827] shadow" : "text-[#6B7280] hover:text-[#374151]"
                    }`}
                    aria-pressed={activeTab === t.key}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-5 md:px-6 py-5 max-h-[70vh] overflow-y-auto" onPaste={onPaste}>
              {activeTab === "basic" && (
                <div className="space-y-4">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="block text-sm text-[#111827] font-lexend">Property Title <span className="text-red-500">*</span></label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Cozy 2BR Apartment near Burnham Park"
                      className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="block text-sm text-[#111827] font-lexend">Description <span className="text-red-500">*</span></label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your property..."
                      className="w-full min-h-28 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                    />
                  </div>

                  {/* Type & Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-sm text-[#111827] font-lexend">Property Type <span className="text-red-500">*</span></label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                      >
                        <option>Apartment</option>
                        <option>Transient</option>
                        <option>Hotel</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm text-[#111827] font-lexend">Price per Night (₱) <span className="text-red-500">*</span></label>
                      <input
                        inputMode="numeric"
                        value={price}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "") setPrice("");
                          else {
                            const n = Number(v.replace(/[^0-9]/g, ""));
                            setPrice(Number.isNaN(n) ? "" : n);
                          }
                        }}
                        placeholder="1200"
                        className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="block text-sm text-[#111827] font-lexend">Address / Location <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#9CA3AF]">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street, Barangay, Baguio City"
                        className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg pl-9 pr-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-2">
                    <div className="text-sm text-[#111827] font-lexend">Property Images</div>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Cover preview */}
                      <div className="relative h-36 md:h-40 rounded-lg overflow-hidden bg-[#F3F4F6] border border-[#E5E7EB]">
                        {(pastedImage || listings.find((l) => l.id === selectedId)?.image) ? (
                          <Image
                            src={pastedImage || (listings.find((l) => l.id === selectedId)?.image as string)}
                            alt="Cover preview"
                            fill
                            sizes="(max-width:768px) 50vw, 300px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>

                      {/* Upload tile (also supports paste) */}
                      <div
                        ref={pasteAreaRef}
                        tabIndex={0}
                        onPaste={onPaste}
                        className="flex flex-col items-center justify-center gap-2 h-36 md:h-40 rounded-lg border border-[#D1D5DB] bg-white hover:bg-[#F9FAFB] cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Upload image"
                      >
                        <svg className="w-6 h-6 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 4v12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-[#111827] font-lexend">Upload</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            const reader = new FileReader();
                            reader.onload = () => setPastedImage(reader.result as string);
                            reader.readAsDataURL(f);
                            // reset input so same file can be chosen again later
                            e.currentTarget.value = "";
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[#6B7280] font-lexend">Upload up to 10 high-quality photos. First image will be the cover.</p>
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div className="space-y-4">
                  {/* Capacity & Rooms */}
                  <div>
                    <div className="text-sm text-[#111827] font-lexend mb-2">Capacity & Rooms</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <div className="text-sm text-[#6B7280] font-lexend">Max Guests</div>
                        <select
                          value={maxGuests}
                          onChange={(e) => setMaxGuests(Number(e.target.value))}
                          className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                        >
                          {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm text-[#6B7280] font-lexend">Bedrooms</div>
                        <select
                          value={bedrooms}
                          onChange={(e) => setBedrooms(Number(e.target.value))}
                          className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                        >
                          {Array.from({ length: 8 }, (_, i) => i + 0).map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "bedroom" : "bedrooms"}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm text-[#6B7280] font-lexend">Beds</div>
                        <select
                          value={beds}
                          onChange={(e) => setBeds(Number(e.target.value))}
                          className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "bed" : "beds"}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm text-[#6B7280] font-lexend">Bathrooms</div>
                        <select
                          value={bathrooms}
                          onChange={(e) => setBathrooms(Number(e.target.value))}
                          className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                        >
                          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "bathroom" : "bathrooms"}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-[#E5E7EB]" />

                  {/* Check-in & Check-out Times */}
                  <div>
                    <div className="text-sm text-[#111827] font-lexend mb-2">Check-in & Check-out Times</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <div className="text-sm text-[#6B7280] font-lexend">Check-in Time</div>
                        <select
                          value={checkInTime}
                          onChange={(e) => setCheckInTime(e.target.value)}
                          className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                        >
                          {["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm text-[#6B7280] font-lexend">Check-out Time</div>
                        <select
                          value={checkOutTime}
                          onChange={(e) => setCheckOutTime(e.target.value)}
                          className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                        >
                          {["10:00 AM", "11:00 AM", "12:00 PM"].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "amenities" && (
                <div className="space-y-3">
                  <div className="text-sm text-[#111827] font-lexend">Available Amenities</div>
                  <div className="text-xs text-[#6B7280] font-lexend -mt-1">Select all amenities available at your property</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {AMENITY_LIST.map((a) => {
                      const selected = amenities.includes(a.key);
                      return (
                        <button
                          key={a.key}
                          type="button"
                          onClick={() => toggleAmenity(a.key)}
                          className={`flex items-center gap-3 w-full h-12 rounded-xl border px-3 md:px-4 text-sm font-lexend text-left ${
                            selected
                              ? "border-[#60A5FA] bg-[#EFF6FF] text-[#111827]"
                              : "border-[#E5E7EB] bg-white text-[#6B7280]"
                          }`}
                          aria-pressed={selected}
                        >
                          {/* Left check/icon group */}
                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded ${
                              selected ? "bg-[#3B82F6] text-white" : "bg-white border border-[#D1D5DB]"
                            }`}
                          >
                            {/* checkmark when selected */}
                            {selected ? (
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : null}
                          </span>
                          {/* Amenity icon and label */}
                          <span className="flex items-center gap-2">
                            <span className={`text-[#6B7280] ${selected ? "text-[#2563EB]" : ""}`}>{a.icon}</span>
                            <span className="text-[#111827]">{a.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {activeTab === "rules" && (
                <div className="space-y-4">
                  {/* House Rules */}
                  <div className="space-y-1.5">
                    <div className="text-sm text-[#111827] font-lexend">House Rules</div>
                    <textarea
                      value={houseRulesText}
                      onChange={(e) => setHouseRulesText(e.target.value)}
                      placeholder="Enter house rules, one per line..."
                      className="w-full min-h-32 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                    />
                    <div className="text-xs text-[#9CA3AF] font-lexend">One rule per line for better readability</div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="space-y-1.5">
                    <div className="text-sm text-[#111827] font-lexend">Cancellation Policy</div>
                    <select
                      value={cancellationPolicy}
                      onChange={(e) => setCancellationPolicy(e.target.value as typeof cancellationPolicy)}
                      className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 text-sm font-lexend outline-none focus:border-[#BEE0FF]"
                    >
                      <option value="Flexible">Flexible</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Strict">Strict</option>
                    </select>
                    <div className="text-xs text-[#9CA3AF] font-lexend">{policyDescriptions[cancellationPolicy]}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E5E7EB] px-5 md:px-6 py-4 flex items-center justify-between bg-white">
              <button
                onClick={closeModal}
                className="h-10 px-4 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] text-sm font-lexend"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {/* future draft handling */}}
                  className="h-10 px-4 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] text-sm font-lexend"
                >
                  Save as Draft
                </button>
                <button
                  onClick={saveChanges}
                  disabled={!selectedId || isSaving}
                  className={`h-10 px-4 rounded-lg text-white text-sm font-lexend flex items-center gap-2 ${
                    selectedId && !isSaving ? "bg-[#1078CF] hover:bg-[#0e6dbb]" : "bg-[#9CA3AF] cursor-not-allowed"
                  }`}
                >
                  {isSaving && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
