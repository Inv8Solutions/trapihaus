"use client";

import Navbar from "../components/layout/Navbar";
import ListHero from "./ListHero";

export default function ListPropertyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ListHero />
      </main>
    </>
  );
}
