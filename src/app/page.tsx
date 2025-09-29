"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopPicks from "./components/TopPicks";
import WhyChoose from "./components/WhyChoose";
import Cats from "./components/Cats";
import HowItWorks from "./components/HowItWorks";
import JoinUs from "./components/JoinUs";
import Lastt from "./components/Lastt";
import Footerr from "./components/Footerr";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white max-w-full overflow-hidden">
      <Navbar />
      <Hero />
      <WhyChoose />
      <TopPicks />
      <Cats />
      <HowItWorks />
      <JoinUs />
      <Lastt />
      <Footerr />
    </main>
  );
}