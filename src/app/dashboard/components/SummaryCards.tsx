interface SummaryCardsProps {
  stats?: {
    activeListings?: number;
    reservationsThisMonth?: number;
    reservationsChangeText?: string; // e.g., "+10% from last month"
    totalEarnings?: number; // in PHP cents or units; we'll render as-is for now
    earningsChangeText?: string; // e.g., "+1.2% from yesterday"
  };
}

export default function SummaryCards({ stats }: SummaryCardsProps) {
  const SkeletonValue = () => (
    <div role="status" aria-label="loading" className="h-8 w-20 rounded bg-[#F3F4F6] animate-pulse" />
  );

  const Value = ({ children }: { children: React.ReactNode }) => (
    <p className="text-3xl font-lexend font-bold leading-none">{children}</p>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-[#6B7280]">Active Listings</p>
        <div className="mt-2 flex items-end gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#E8F1FF] flex items-center justify-center text-[#1078CF]" aria-hidden>🏢</div>
          {stats?.activeListings != null ? <Value>{stats.activeListings}</Value> : <SkeletonValue />}
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-[#6B7280]">Reservations this Month</p>
        <div className="mt-2 flex items-end gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#FFF4E8] flex items-center justify-center text-[#F68109]" aria-hidden>📅</div>
          <div>
            {stats?.reservationsThisMonth != null ? (
              <Value>{stats.reservationsThisMonth}</Value>
            ) : (
              <SkeletonValue />
            )}
            {stats?.reservationsChangeText ? (
              <p className="text-xs text-[#22C55E] mt-1">{stats.reservationsChangeText}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-[#6B7280]">Total Earnings</p>
        <div className="mt-2 flex items-end gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#EDF9E2] flex items-center justify-center text-[#83C12C]" aria-hidden>₱</div>
          <div>
            {stats?.totalEarnings != null ? (
              <Value>₱{stats.totalEarnings.toLocaleString()}</Value>
            ) : (
              <SkeletonValue />
            )}
            {stats?.earningsChangeText ? (
              <p className="text-xs text-[#22C55E] mt-1">{stats.earningsChangeText}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
