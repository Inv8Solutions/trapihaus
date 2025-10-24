import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/security/session";
import Sidebar from "@/app/dashboard/components/Sidebar";
import Header from "@/app/dashboard/components/Header";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  // Basic server-side gate. In production, require auth; in dev, show demo.
  if (process.env.NODE_ENV === "production" && !session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#111827]">
      {/* Optional demo banner when unauthenticated in dev */}
      {!session && process.env.NODE_ENV !== "production" ? (
        <div className="w-full bg-[#FFF7E6] text-[#8A6100] text-sm px-4 py-2 text-center">
          Demo mode: no session detected. In production, this page requires login.
        </div>
      ) : null}

      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Header />
          <main className="px-4 md:px-6 lg:px-8 pb-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
