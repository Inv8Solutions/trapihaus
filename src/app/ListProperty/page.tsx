"use client";

import Navbar from "../components/layout/Navbar";
import ListHero from "./ListHero";
import WhyList from "./WhyList";
import ListHowItWorks from "./ListHowItWorks";

export default function ListPropertyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ListHero />
        <WhyList />
        <ListHowItWorks />
      </main>
    </>
  );
}
