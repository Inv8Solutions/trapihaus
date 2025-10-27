"use client";

import { Suspense } from "react";
import NavBar from "../components/layout/Navbar";
import Listing from "./Listing";
import Footerr from "../components/layout/Footerr";

function PropertyListingContent() {
    return (
        <>
            <NavBar />
            <main>
                <Listing />
            </main>
            <Footerr />
        </>        
    );
}

export default function PropertyListingPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading property details...</p>
            </div>
        }>
            <PropertyListingContent />
        </Suspense>
    );
}