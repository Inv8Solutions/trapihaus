"use client";

import { useEffect, useMemo, useState } from "react";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarCheck,
  faCircleCheck,
  faClock,
  faUserCheck,
  faMagnifyingGlass,
  faFilter,
  faCheck,
  faTimes,
  faSignInAlt,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import type { Reservation } from "@/types/reservation";
import {
  getHostReservations,
  acceptReservation,
  declineReservation,
  checkInReservation,
  completeReservation,
} from "@/lib/services/reservations";

type StatusType = Reservation["status"];

function Stat({ icon, label, value, tint }: { icon: IconDefinition; label: string; value: number; tint: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white border border-[#E5E7EB] h-[92px] px-5">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tint}`}
           aria-hidden>
        <FontAwesomeIcon icon={icon} className="text-[18px]" />
      </div>
      <div>
        <div className="text-2xl font-bold text-[#111827] font-lexend leading-none">{value}</div>
        <div className="text-sm text-[#6B7280] font-lexend">{label}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  const styles: Record<StatusType, { bg: string; dot: string; label: string }> = {
    confirmed: { bg: "bg-[#E0ECFF] text-[#1D4ED8]", dot: "bg-[#1D4ED8]", label: "Confirmed" },
    pending: { bg: "bg-[#FFF3D6] text-[#A16207]", dot: "bg-[#F59E0B]", label: "Pending" },
    "checked-in": { bg: "bg-[#EEE5FF] text-[#6D28D9]", dot: "bg-[#7C3AED]", label: "Checked In" },
    completed: { bg: "bg-[#EAF7EE] text-[#166534]", dot: "bg-[#22C55E]", label: "Completed" },
    cancelled: { bg: "bg-[#FDECEE] text-[#991B1B]", dot: "bg-[#EF4444]", label: "Cancelled" },
    declined: { bg: "bg-[#F3F4F6] text-[#4B5563]", dot: "bg-[#6B7280]", label: "Declined" },
  };
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-lexend font-semibold ${styles[status].bg}`}>
      <span className={`h-2 w-2 rounded-full ${styles[status].dot}`} aria-hidden />
      {styles[status].label}
    </span>
  );
}

function ReservationRow({ 
  r, 
  onAccept, 
  onDecline, 
  onCheckIn, 
  onComplete 
}: { 
  r: Reservation; 
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onCheckIn: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  const guestName = `${r.guestFirstName} ${r.guestLastName}`;
  const checkInDate = r.checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const checkOutDate = r.checkOutDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="flex items-center bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4 gap-4">
      {/* Avatar */}
      <div className="h-12 w-12 rounded-full bg-[#E5E7EB] flex-shrink-0" aria-hidden />
      
      {/* Name + Listing + Status */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <div className="text-[#111827] font-lexend font-semibold truncate">{guestName}</div>
          <StatusBadge status={r.status} />
        </div>
        <div className="text-[#6B7280] text-sm font-lexend truncate">{r.propertyName}</div>
      </div>

      {/* Dates */}
      <div className="hidden md:flex items-center gap-8">
        <div>
          <div className="text-xs text-[#6B7280] font-lexend">Check-in</div>
          <div className="text-[#111827] font-lexend">{checkInDate}</div>
        </div>
        <div>
          <div className="text-xs text-[#6B7280] font-lexend">Check-out</div>
          <div className="text-[#111827] font-lexend">{checkOutDate}</div>
        </div>
      </div>

      {/* Guests */}
      <div className="hidden md:block min-w-[72px] text-center">
        <div className="text-xs text-[#6B7280] font-lexend">Guests</div>
        <div className="text-[#111827] font-lexend">{r.guests}</div>
      </div>

      {/* Amount */}
      <div className="hidden md:block min-w-[96px] text-right">
        <div className="text-xs text-[#6B7280] font-lexend">Amount</div>
        <div className="text-[#22C55E] font-lexend font-semibold">₱{r.total.toLocaleString()}</div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {r.status === "pending" && (
          <>
            <button 
              onClick={() => onAccept(r.id!)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-[#22C55E] text-[#22C55E] bg-white hover:bg-[#22C55E] hover:text-white text-sm font-lexend transition-colors"
            >
              <FontAwesomeIcon icon={faCheck} />
              Accept
            </button>
            <button 
              onClick={() => onDecline(r.id!)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-[#EF4444] text-[#EF4444] bg-white hover:bg-[#EF4444] hover:text-white text-sm font-lexend transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
              Decline
            </button>
          </>
        )}
        {r.status === "confirmed" && (
          <button 
            onClick={() => onCheckIn(r.id!)}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-[#7C3AED] text-[#7C3AED] bg-white hover:bg-[#7C3AED] hover:text-white text-sm font-lexend transition-colors"
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            Check In
          </button>
        )}
        {r.status === "checked-in" && (
          <button 
            onClick={() => onComplete(r.id!)}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-[#1D4ED8] text-[#1D4ED8] bg-white hover:bg-[#1D4ED8] hover:text-white text-sm font-lexend transition-colors"
          >
            <FontAwesomeIcon icon={faFlagCheckered} />
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReservationsPage() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType | "all">("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
        loadReservations(user.uid);
      } else {
        setCurrentUser(null);
        setReservations([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  async function loadReservations(hostId: string) {
    setLoading(true);
    try {
      const data = await getHostReservations(hostId);
      setReservations(data);
    } catch (error) {
      console.error("Failed to load reservations:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(reservationId: string) {
    if (!currentUser) return;
    try {
      await acceptReservation(reservationId, currentUser);
      await loadReservations(currentUser);
    } catch (error) {
      console.error("Failed to accept reservation:", error);
      alert(error instanceof Error ? error.message : "Failed to accept reservation");
    }
  }

  async function handleDecline(reservationId: string) {
    if (!currentUser) return;
    const reason = prompt("Reason for declining (optional):");
    try {
      await declineReservation(reservationId, currentUser, reason || undefined);
      await loadReservations(currentUser);
    } catch (error) {
      console.error("Failed to decline reservation:", error);
      alert(error instanceof Error ? error.message : "Failed to decline reservation");
    }
  }

  async function handleCheckIn(reservationId: string) {
    if (!currentUser) return;
    try {
      await checkInReservation(reservationId, currentUser);
      await loadReservations(currentUser);
    } catch (error) {
      console.error("Failed to check in reservation:", error);
      alert(error instanceof Error ? error.message : "Failed to check in reservation");
    }
  }

  async function handleComplete(reservationId: string) {
    if (!currentUser) return;
    try {
      await completeReservation(reservationId, currentUser);
      await loadReservations(currentUser);
    } catch (error) {
      console.error("Failed to complete reservation:", error);
      alert(error instanceof Error ? error.message : "Failed to complete reservation");
    }
  }

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const guestName = `${r.guestFirstName} ${r.guestLastName}`.toLowerCase();
      const propertyName = r.propertyName.toLowerCase();
      const matchesQuery = !query || guestName.includes(query.toLowerCase()) || propertyName.includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      const matchesProperty = propertyFilter === "all" || r.propertyName === propertyFilter;
      return matchesQuery && matchesStatus && matchesProperty;
    });
  }, [reservations, query, statusFilter, propertyFilter]);

  const totals = useMemo(() => {
    const total = reservations.length;
    const confirmed = reservations.filter((r) => r.status === "confirmed").length;
    const pending = reservations.filter((r) => r.status === "pending").length;
    const checkedIn = reservations.filter((r) => r.status === "checked-in").length;
    return { total, confirmed, pending, checkedIn };
  }, [reservations]);

  const uniqueProperties = useMemo(() => {
    const titles = new Set(reservations.map((r) => r.propertyName));
    return Array.from(titles);
  }, [reservations]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#6B7280] font-lexend">Loading reservations...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#6B7280] font-lexend">Please log in to view reservations.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-[22px] md:text-[24px] font-lexend font-semibold text-[#111827]">Reservations</h1>
        <p className="text-[#6B7280] text-sm mt-1 font-lexend">Manage your bookings and guest information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={faCalendarCheck} label="Total Bookings" value={totals.total} tint="bg-[#EFF6FF] text-[#1D4ED8]" />
        <Stat icon={faCircleCheck} label="Confirmed" value={totals.confirmed} tint="bg-[#EEFDF3] text-[#166534]" />
        <Stat icon={faClock} label="Pending" value={totals.pending} tint="bg-[#FFF7ED] text-[#A16207]" />
        <Stat icon={faUserCheck} label="Checked In" value={totals.checkedIn} tint="bg-[#F5F3FF] text-[#6D28D9]" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 h-12 rounded-full bg-white border border-[#E5E7EB] px-4 flex items-center gap-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#6B7280]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm font-lexend"
            placeholder="Search by name or location..."
          />
        </div>
        <button className="h-12 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend inline-flex items-center gap-2">
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </button>
        <select
          className="h-12 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusType | "all")}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked-in">Checked In</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="declined">Declined</option>
        </select>
        <select
          className="h-12 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend"
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
        >
          <option value="all">All Properties</option>
          {uniqueProperties.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#6B7280] font-lexend">
            No reservations found matching your filters.
          </div>
        ) : (
          filtered.map((r) => (
            <ReservationRow 
              key={r.id} 
              r={r}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onCheckIn={handleCheckIn}
              onComplete={handleComplete}
            />
          ))
        )}
      </div>

      {/* Footer helper */}
      <div className="text-center text-sm text-[#9CA3AF] font-lexend pt-6">
        Trapihaus - Safe, Affordable, Trusted Stays in Baguio.
      </div>
    </div>
  );
}
