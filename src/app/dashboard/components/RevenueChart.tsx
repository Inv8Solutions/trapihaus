interface RevenueChartProps {
  data?: Array<{ label: string; value: number }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;
  const safeData = hasData ? data! : [{ label: "Aug", value: 0 }, { label: "Sep", value: 0 }, { label: "Oct", value: 0 }];
  const max = Math.max(1, ...safeData.map((d) => d.value));

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
        {safeData.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-3 w-full">
            <div
              className={`w-14 rounded-xl ${hasData ? "bg-[#1078CF]" : "bg-[#E5E7EB] animate-pulse"}`}
              style={{ height: `${hasData ? (d.value / max) * 100 : 60}%` }}
              aria-label={`${d.label} revenue`}
            />
            <p className="text-sm text-[#6B7280]">{d.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
