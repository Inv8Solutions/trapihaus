"use client";

import NavBar from "../components/layout/Navbar";
import Listing from "./Listing";

export default function PropertyListingPage() {
    return (
        <>
        <NavBar />
        <main>
            <Listing />
        </main>
        </>        
    );
}