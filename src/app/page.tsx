"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopPicks from "./components/TopPicks";
import WhyChoose from "./components/WhyChoose";
import React from "react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TopPicks />
      <WhyChoose />
    </main>
  );
}