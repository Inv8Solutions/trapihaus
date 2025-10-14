export default function RevenueChart() {
  const data = [
    { month: "August", value: 40 },
    { month: "September", value: 50 },
    { month: "October", value: 35 },
  ];

  const max = Math.max(...data.map((d) => d.value));

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="font-lexend font-semibold">Total Revenue</h3>
          <p className="text-sm text-[#6B7280]">For the last 3 months</p>
        </div>
        <div className="text-xs text-[#6B7280]">₱10k ₱20k ₱30k ₱40k ₱50k</div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6 items-end h-56">
        {data.map((d) => (
          <div key={d.month} className="flex flex-col items-center gap-3">
            <div
              className="w-14 rounded-xl bg-[#1078CF]"
              style={{ height: `${(d.value / max) * 100}%` }}
              aria-label={`${d.month} revenue`}
            />
            <p className="text-sm text-[#6B7280]">{d.month}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
