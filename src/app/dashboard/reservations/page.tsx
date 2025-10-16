"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCircleCheck,
  faClock,
  faUserCheck,
  faMagnifyingGlass,
  faFilter,
  faEye,
  faEllipsisVertical,
  faUserGroup,
  faPesoSign,
} from "@fortawesome/free-solid-svg-icons";

type Status = "Confirmed" | "Pending" | "Checked-in" | "Completed" | "Cancelled";

interface ReservationItem {
  id: string;
  guestName: string;
  property: string;
  status: Status;
  checkIn: string; // ISO date or formatted
  checkOut: string;
  guests: number;
  amount: number;
}

function Stat({ icon, label, value, tint }: { icon: any; label: string; value: number; tint: string }) {
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

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, { bg: string; dot: string }> = {
    Confirmed: { bg: "bg-[#E0ECFF] text-[#1D4ED8]", dot: "bg-[#1D4ED8]" },
    Pending: { bg: "bg-[#FFF3D6] text-[#A16207]", dot: "bg-[#F59E0B]" },
    "Checked-in": { bg: "bg-[#EEE5FF] text-[#6D28D9]", dot: "bg-[#7C3AED]" },
    Completed: { bg: "bg-[#EAF7EE] text-[#166534]", dot: "bg-[#22C55E]" },
    Cancelled: { bg: "bg-[#FDECEE] text-[#991B1B]", dot: "bg-[#EF4444]" },
  };
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-lexend font-semibold ${styles[status].bg}`}>
      <span className={`h-2 w-2 rounded-full ${styles[status].dot}`} aria-hidden />
      {status}
    </span>
  );
}

function ReservationRow({ r }: { r: ReservationItem }) {
  return (
    <div className="flex items-center bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4">
      {/* Avatar */}
      <div className="h-12 w-12 rounded-full bg-[#E5E7EB] mr-3" aria-hidden />
      {/* Name + Property + Status */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <div className="text-[#111827] font-lexend font-semibold truncate">{r.guestName}</div>
          <StatusBadge status={r.status} />
        </div>
        <div className="text-[#6B7280] text-sm font-lexend truncate">{r.property}</div>
      </div>

      {/* Dates */}
      <div className="hidden md:flex items-center gap-8 mx-6">
        <div>
          <div className="text-xs text-[#6B7280] font-lexend">Check-in</div>
          <div className="text-[#111827] font-lexend">{r.checkIn}</div>
        </div>
        <div>
          <div className="text-xs text-[#6B7280] font-lexend">Check-in</div>
          <div className="text-[#111827] font-lexend">{r.checkOut}</div>
        </div>
      </div>

      {/* Guests */}
      <div className="hidden md:block min-w-[72px] text-center mr-6">
        <div className="text-xs text-[#6B7280] font-lexend">Guest</div>
        <div className="text-[#111827] font-lexend">{r.guests}</div>
      </div>

      {/* Amount */}
      <div className="hidden md:block min-w-[96px] text-right mr-4">
        <div className="text-xs text-[#6B7280] font-lexend">Amount</div>
        <div className="text-[#22C55E] font-lexend font-semibold">₱{r.amount.toLocaleString()}</div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-[#E5E7EB] text-[#111827] bg-white hover:bg-[#F9FAFB] text-sm font-lexend">
          <FontAwesomeIcon icon={faEye} />
          View
        </button>
        <button aria-label="More" className="h-9 w-9 rounded-xl border border-[#E5E7EB] text-[#6B7280] bg-white hover:bg-[#F9FAFB] flex items-center justify-center">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </div>
    </div>
  );
}

export default function ReservationsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [propertyFilter, setPropertyFilter] = useState("All Properties");

  const reservations: ReservationItem[] = [
    {
      id: "1",
      guestName: "Maria Dela Cruz",
      property: "Loakan Heights Residences",
      status: "Confirmed",
      checkIn: "Oct. 20, 2025",
      checkOut: "Oct. 21, 2025",
      guests: 4,
      amount: 3600,
    },
    {
      id: "2",
      guestName: "Maria Dela Cruz",
      property: "Loakan Heights Residences",
      status: "Pending",
      checkIn: "Oct. 20, 2025",
      checkOut: "Oct. 21, 2025",
      guests: 4,
      amount: 3600,
    },
    {
      id: "3",
      guestName: "Maria Dela Cruz",
      property: "Loakan Heights Residences",
      status: "Checked-in",
      checkIn: "Oct. 20, 2025",
      checkOut: "Oct. 21, 2025",
      guests: 4,
      amount: 3600,
    },
    {
      id: "4",
      guestName: "Maria Dela Cruz",
      property: "Loakan Heights Residences",
      status: "Completed",
      checkIn: "Oct. 20, 2025",
      checkOut: "Oct. 21, 2025",
      guests: 4,
      amount: 3600,
    },
    {
      id: "5",
      guestName: "Maria Dela Cruz",
      property: "Loakan Heights Residences",
      status: "Cancelled",
      checkIn: "Oct. 20, 2025",
      checkOut: "Oct. 21, 2025",
      guests: 4,
      amount: 3600,
    },
  ];

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchesQuery = !query || r.guestName.toLowerCase().includes(query.toLowerCase()) || r.property.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || r.status === statusFilter;
      const matchesProperty = propertyFilter === "All Properties" || r.property === propertyFilter;
      return matchesQuery && matchesStatus && matchesProperty;
    });
  }, [reservations, query, statusFilter, propertyFilter]);

  const totals = useMemo(() => {
    const total = reservations.length;
    const confirmed = reservations.filter((r) => r.status === "Confirmed").length;
    const pending = reservations.filter((r) => r.status === "Pending").length;
    const checkedIn = reservations.filter((r) => r.status === "Checked-in").length;
    return { total, confirmed, pending, checkedIn };
  }, [reservations]);

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
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Checked-in</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <select
          className="h-12 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend"
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
        >
          <option>All Properties</option>
          <option>Loakan Heights Residences</option>
          <option>Sunrise Pines Lodge</option>
          <option>Session View Apartments</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <ReservationRow key={r.id} r={r} />
        ))}
      </div>

      {/* Footer helper */}
      <div className="text-center text-sm text-[#9CA3AF] font-lexend pt-6">
        Trapihaus - Safe, Affordable, Trusted Stays in Baguio.
      </div>
    </div>
  );
}
