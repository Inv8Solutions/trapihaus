"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopPicks from "./components/TopPicks";
import WhyChoose from "./components/WhyChoose";
import React from "react";
import Cats from "./components/Cats";

export default function Home() {
  return (
    <main className="min-h-screen bg-white max-w-full overflow-hidden mx-[24px]">
      <Navbar />
      <Hero />
      <WhyChoose />
      <TopPicks />
      <Cats />
    </main>
  );
}