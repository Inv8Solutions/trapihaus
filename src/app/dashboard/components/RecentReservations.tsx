type Reservation = {
  guest: string;
  property: string;
  checkIn: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  amount: string;
};

const items: Reservation[] = [
  { guest: "Maria D.", property: "Laokan Heights", checkIn: "Oct 5", status: "Confirmed", amount: "₱3,600" },
  { guest: "John R.", property: "Pinecrest Transient", checkIn: "Oct 10", status: "Pending", amount: "₱1,200" },
  { guest: "Lara M.", property: "Burnham View Hotel", checkIn: "Oct 12", status: "Cancelled", amount: "₱0" },
];

export default function RecentReservations() {
  const badge = (s: Reservation["status"]) => {
    const map = {
      Confirmed: "bg-[#EAF6EE] text-[#22C55E]",
      Pending: "bg-[#FFF7E6] text-[#F59E0B]",
      Cancelled: "bg-[#F3F4F6] text-[#6B7280]",
    } as const;
    return <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${map[s]}`}>{s}</span>;
  };

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
      <h3 className="font-lexend font-semibold">Recent Reservations</h3>
      <p className="text-sm text-[#6B7280]">Latest Booking Activity</p>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-[#6B7280]">
            <tr>
              <th className="py-2 pr-4">Guest</th>
              <th className="py-2 pr-4">Property</th>
              <th className="py-2 pr-4">Check-in</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={`${r.guest}-${r.checkIn}`} className="border-t border-[#F3F4F6]">
                <td className="py-3 pr-4 font-medium text-[#111827]">{r.guest}</td>
                <td className="py-3 pr-4">{r.property}</td>
                <td className="py-3 pr-4">{r.checkIn}</td>
                <td className="py-3 pr-4">{badge(r.status)}</td>
                <td className="py-3 pr-4 text-right">{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
