interface RevenueChartProps {
  data?: Array<{ label: string; value: number }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  // Get last 3 months dynamically
  const getLastThreeMonths = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const result = [];
    
    for (let i = 2; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      result.push(months[monthIndex]);
    }
    
    return result;
  };

  const lastThreeMonths = getLastThreeMonths();
  const hasData = Array.isArray(data) && data.length > 0;
  
  // Mock data for demonstration when no data is provided
  const mockData = lastThreeMonths.map((label, index) => ({
    label,
    value: [28500, 42300, 35600][index] || 0
  }));
  
  const safeData = hasData 
    ? data! 
    : mockData;
  const max = Math.max(50000, ...safeData.map((d) => d.value)); // Max scale at 50k

  // Scale labels for left side
  const scaleLabels = ["₱50k", "₱40k", "₱30k", "₱20k", "₱10k"];

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="font-lexend font-semibold text-[#1F2937]">Total Revenue</h3>
        <p className="text-sm text-[#6B7280]">For the last 3 months</p>
      </div>

      <div className="flex gap-4">
        {/* Y-axis scale on the left */}
        <div className="flex flex-col justify-between h-56 py-2">
          {scaleLabels.map((label) => (
            <div key={label} className="text-xs text-[#6B7280] font-lexend">
              {label}
            </div>
          ))}
        </div>

        {/* Chart bars */}
        <div className="flex-1 grid grid-cols-3 gap-6 items-end h-56">
          {safeData.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-3 w-full">
              <div
                className="w-full rounded-xl bg-[#1078CF]"
                style={{ height: `${(d.value / max) * 100}%` }}
                aria-label={`${d.label} revenue: ₱${d.value.toLocaleString()}`}
              />
              <p className="text-sm text-[#6B7280] font-lexend">{d.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
