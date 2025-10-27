"use client";

import NavBar from "../components/layout/Navbar";
import Listing from "./Listing";
import Footerr from "../components/layout/Footerr";

export default function PropertyListingPage() {
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