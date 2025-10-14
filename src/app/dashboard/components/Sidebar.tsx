"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/listings", label: "My Listings", icon: "📋" },
  { href: "/dashboard/reservations", label: "Reservations", icon: "🗓️" },
  { href: "/dashboard/earnings", label: "Earnings", icon: "₱" },
  { href: "/dashboard/messages", label: "Messages", icon: "💬" },
  { href: "/dashboard/reviews", label: "Reviews", icon: "⭐" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  { href: "/dashboard/help", label: "Help Center", icon: "❓" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-white border-r border-[#E5E7EB] min-h-screen p-4">
      <div className="text-[#1078CF] font-lexend font-bold text-xl mb-6">Trapihaus</div>
      <nav className="flex-1 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl font-lexend text-sm transition-colors ${
                active ? "bg-[#1078CF] text-white" : "text-[#374151] hover:bg-[#F3F4F6]"
              }`}
            >
              <span className="text-lg" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <button className="mt-4 inline-flex items-center justify-center h-11 rounded-xl bg-[#F68109] text-white font-lexend text-sm font-semibold shadow px-4">
        Add New Property
      </button>
    </aside>
  );
}
