"use client";

import { Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import BrowseContent from "./BrowseContent";
import Footerr from "../components/layout/Footerr";

export interface SearchParams {
  propertyType: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export default function BrowsePage() {
  return (
    <>
      <main className="min-h-screen bg-white max-w-full overflow-hidden">
        <Navbar />
        
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1078CF]"></div>
          </div>
        }>
          <BrowseContent />
        </Suspense>

      </main>
      <Footerr />
    </>
  );
}