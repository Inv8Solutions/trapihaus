"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPesoSign,
  faWallet,
  faSackDollar,
  faUserGroup,
  faDownload,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

type TabKey = "overview" | "transactions" | "settings";

function Stat({ icon, label, value, tint, valueColor }: { icon: any; label: string; value: string; tint: string; valueColor: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white border border-[#E5E7EB] h-[92px] px-5">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tint}`} aria-hidden>
        <FontAwesomeIcon icon={icon} className="text-[18px]" />
      </div>
      <div>
        <div className={`text-[18px] md:text-[20px] font-lexend font-bold ${valueColor}`}>{value}</div>
        <div className="text-sm text-[#6B7280] font-lexend">{label}</div>
      </div>
    </div>
  );
}

function LineChart({ points }: { points: number[] }) {
  // Simple line chart using SVG (8 points like the mock)
  const width = 560;
  const height = 220;
  const padding = 24;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const stepX = (width - padding * 2) / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = padding + i * stepX;
    const y = height - padding - ((p - min) / range) * (height - padding * 2);
    return [x, y] as const;
  });
  const path = coords.map((c) => c.join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-64">
      {/* grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={padding} x2={width - padding} y1={padding + i * ((height - padding * 2) / 4)} y2={padding + i * ((height - padding * 2) / 4)} stroke="#E5E7EB" strokeWidth={1} />
      ))}
      {/* path */}
      <polyline points={path} fill="none" stroke="#3B82F6" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      {/* dots */}
      {coords.map(([x, y], idx) => (
        <circle key={idx} cx={x} cy={y} r={4} fill="#3B82F6" />
      ))}
    </svg>
  );
}

export default function EarningsPage() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [period, setPeriod] = useState("This Year");

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const points = [9000, 9500, 12000, 9800, 14000, 15000, 18000, 18500];

  const total = useMemo(() => 153000, []);
  const todays = useMemo(() => 4600, []);
  const avgDaily = useMemo(() => 3200, []);
  const occupancy = useMemo(() => 0.82, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-[22px] md:text-[24px] font-lexend font-semibold text-[#111827]">Earnings</h1>
        <p className="text-[#6B7280] text-sm mt-1 font-lexend">Track your revenue and manage payouts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={faPesoSign} label="Total Earnings" value={`₱${total.toLocaleString()}`} tint="bg-[#ECFDF5] text-[#15803D]" valueColor="text-[#15803D]" />
        <Stat icon={faWallet} label="Today's Earnings" value={`₱${todays.toLocaleString()}`} tint="bg-[#EFF6FF] text-[#1D4ED8]" valueColor="text-[#1D4ED8]" />
        <Stat icon={faSackDollar} label="Avg. Daily Earnings" value={`₱${avgDaily.toLocaleString()}`} tint="bg-[#FFF7ED] text-[#A16207]" valueColor="text-[#A16207]" />
        <Stat icon={faUserGroup} label="Occupancy Rate" value={`${Math.round(occupancy * 100)}%`} tint="bg-[#F5F3FF] text-[#6D28D9]" valueColor="text-[#6D28D9]" />
      </div>

      {/* Tabs + Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {([
            { key: "overview", label: "Overview" },
            { key: "transactions", label: "Transactions" },
            { key: "settings", label: "Settings" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 h-10 rounded-full text-sm font-lexend ${
                tab === t.key ? "bg-[#E5F0FF] text-[#1078CF]" : "bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="h-10 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend inline-flex items-center gap-2">
            {period}
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button className="h-10 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faDownload} />
            Export
          </button>
        </div>
      </div>

      {/* Overview content */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <h3 className="font-lexend font-semibold">Earnings Trend</h3>
            <p className="text-sm text-[#6B7280]">Your earnings over the past 8 months</p>
            <div className="mt-4">
              <LineChart points={points} />
              <div className="mt-2 flex items-center justify-between text-xs text-[#6B7280] font-lexend">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </section>
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm min-h-[280px]" />
        </div>
      )}

      {tab === "transactions" && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm text-sm text-[#6B7280] font-lexend">
          Transactions tab placeholder
        </div>
      )}

      {tab === "settings" && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm text-sm text-[#6B7280] font-lexend">
          Settings tab placeholder
        </div>
      )}
    </div>
  );
}
