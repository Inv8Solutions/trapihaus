import SummaryCards from "@/app/dashboard/components/SummaryCards";
import RevenueChart from "@/app/dashboard/components/RevenueChart";
import RecentReservations from "@/app/dashboard/components/RecentReservations";
import LatestReviews from "@/app/dashboard/components/LatestReviews";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-[65%_35%] gap-6">
        <SummaryCards />
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <RecentReservations />
        <LatestReviews />
      </div>
    </div>
  );
} 