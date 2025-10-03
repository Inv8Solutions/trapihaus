"use client";

import Navbar from "../components/layout/Navbar";
import Search from "./Search";

export default function About() {
  return (
    <main className="min-h-screen bg-white max-w-full overflow-hidden">
      <Navbar />
      
      <Search />

    </main>
  );
}