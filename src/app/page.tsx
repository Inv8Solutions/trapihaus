"use client";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import TopPicks from "./components/sections/TopPicks";
import WhyChoose from "./components/sections/WhyChoose";
import Cats from "./components/sections/Cats";
import HowItWorks from "./components/sections/HowItWorks";
import JoinUs from "./components/sections/JoinUs";
import Lastt from "./components/sections/Lastt";
import Footerr from "./components/layout/Footerr";
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