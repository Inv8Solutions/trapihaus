"use client";

import { Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import HomescreenBrowseContent from "./HomescreenBrowseContent";
import Footer from "../../components/layout/Footerr";

export interface SearchParams {
  propertyType: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export default function HomescreenBrowse() {
  return (
    <>
      <Navbar />
      <main className="">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1078CF]"></div>
          </div>
        }>
          <HomescreenBrowseContent />
        </Suspense>
      </main>
      <div className="mt-[80px]">
        <Footer />
      </div>
    </>
  );
}
