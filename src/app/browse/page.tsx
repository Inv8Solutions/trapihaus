"use client";

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Search from "./Search";
import Accomodation from "./Accomodation";
import Footerr from "../components/layout/Footerr";

export interface SearchParams {
  propertyType: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export default function About() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    propertyType: 'Hotels',
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  return (
    <>
      <main className="min-h-screen bg-white max-w-full overflow-hidden">
        <Navbar />
      
        <Search onSearch={setSearchParams} />

        <Accomodation searchParams={searchParams} />

      </main>
      <Footerr />
    </>
  );
}