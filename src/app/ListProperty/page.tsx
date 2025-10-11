"use client";

import Navbar from "../components/layout/Navbar";
import Footerr from "../components/layout/Footerr";
import Listing from "./Listing";

export default function ListPropertyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <Listing />
      </main>
      <Footerr />
    </>
  );
}