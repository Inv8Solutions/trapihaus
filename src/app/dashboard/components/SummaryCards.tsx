interface SummaryCardsProps {
  userName?: string; // e.g., "Juan"
  stats?: {
    activeListings?: number;
    reservationsThisMonth?: number;
    reservationsChangeText?: string; // e.g., "+10% from last month"
    totalEarnings?: number; // in PHP cents or units; we'll render as-is for now
    earningsChangeText?: string; // e.g., "+1.2% from yesterday"
  };
}

export default function SummaryCards({ userName = "User", stats }: SummaryCardsProps) {
  const SkeletonValue = () => (
    <div role="status" aria-label="loading" className="h-12 w-24 rounded bg-[#F3F4F6] animate-pulse" />
  );

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-sm">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-lexend font-bold text-[#1F2937] mb-2">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-base font-lexend text-[#9CA3AF]">
          Here&apos;s a quick summary of your listings and earnings.
        </p>
      </div>

      {/* Colored Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Active Listings Card */}
      <div className="bg-[#E8F4FF] rounded-3xl p-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1078CF] mb-6">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </div>
        <div>
          {stats?.activeListings != null ? (
            <p className="text-5xl font-lexend font-bold text-[#1F2937] leading-none mb-3">{stats.activeListings}</p>
          ) : (
            <SkeletonValue />
          )}
          <p className="text-base font-lexend font-medium text-[#6B7280]">Active Listings</p>
        </div>
      </div>

      {/* Reservations this Month Card */}
      <div className="bg-[#FFF4E8] rounded-3xl p-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F68109] mb-6">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
          </svg>
        </div>
        <div>
          {stats?.reservationsThisMonth != null ? (
            <p className="text-5xl font-lexend font-bold text-[#1F2937] leading-none mb-3">{stats.reservationsThisMonth}</p>
          ) : (
            <SkeletonValue />
          )}
          <p className="text-base font-lexend font-medium text-[#6B7280]">Reservations this Month</p>
          {stats?.reservationsChangeText ? (
            <p className="text-sm font-lexend font-medium text-[#1078CF] mt-2">{stats.reservationsChangeText}</p>
          ) : null}
        </div>
      </div>

      {/* Total Earnings Card */}
      <div className="bg-[#F0F9E8] rounded-3xl p-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#83C12C] mb-6">
          <span className="text-3xl font-bold text-white" aria-hidden="true">₱</span>
        </div>
        <div>
          {stats?.totalEarnings != null ? (
            <p className="text-5xl font-lexend font-bold text-[#1F2937] leading-none mb-3">₱{stats.totalEarnings.toLocaleString()}</p>
          ) : (
            <SkeletonValue />
          )}
          <p className="text-base font-lexend font-medium text-[#6B7280]">Total Earnings</p>
          {stats?.earningsChangeText ? (
            <p className="text-sm font-lexend font-medium text-[#83C12C] mt-2">{stats.earningsChangeText}</p>
          ) : null}
        </div>
      </div>
    </div>
    </section>
  );
}
