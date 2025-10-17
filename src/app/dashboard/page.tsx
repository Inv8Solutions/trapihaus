import SummaryCards from "@/app/dashboard/components/SummaryCards";
import RevenueChart from "@/app/dashboard/components/RevenueChart";
import RecentReservations from "@/app/dashboard/components/RecentReservations";
import LatestReviews from "@/app/dashboard/components/LatestReviews";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <RevenueChart />
        <LatestReviews />
      </div>

      <RecentReservations />
    </div>
  );
}
// hello