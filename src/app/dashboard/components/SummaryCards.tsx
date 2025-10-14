export default function SummaryCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-[#6B7280]">Active Listings</p>
        <div className="mt-2 flex items-end gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#E8F1FF] flex items-center justify-center text-[#1078CF]">🏢</div>
          <p className="text-3xl font-lexend font-bold">10</p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-[#6B7280]">Reservations this Month</p>
        <div className="mt-2 flex items-end gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#FFF4E8] flex items-center justify-center text-[#F68109]">📅</div>
          <div>
            <p className="text-3xl font-lexend font-bold leading-none">16</p>
            <p className="text-xs text-[#22C55E] mt-1">+10% from last month</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-[#6B7280]">Total Earnings</p>
        <div className="mt-2 flex items-end gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#EDF9E2] flex items-center justify-center text-[#83C12C]">₱</div>
          <div>
            <p className="text-3xl font-lexend font-bold leading-none">₱32,561</p>
            <p className="text-xs text-[#22C55E] mt-1">+1.2% from yesterday</p>
          </div>
        </div>
      </div>
    </section>
  );
}
