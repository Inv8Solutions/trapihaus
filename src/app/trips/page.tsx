"use client";
import Navbar from "../components/layout/Navbar";
import Footerr from "../components/layout/Footerr";

export default function TripsPage() {
  return (
    <main className="min-h-screen bg-white max-w-full overflow-hidden">
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black text-blue-600 mb-4">My Trips</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">You don't have any trips yet. Once you book a stay, it will appear here for quick access and management.</p>
      </section>
      <Footerr />
    </main>
  );
}
