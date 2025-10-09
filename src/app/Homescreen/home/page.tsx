"use client";

import Navbar from "../components/layout/Navbar";
import Footer from "../../components/layout/Footerr";
import WelcomeHero from "./WelcomeHero";
import RecentTrips from "./RecentTrips";
import Recommended from "./Recommended";

export default function HomePage() {
    return (
        <>
        <Navbar />
        <main className="bg-[#F5F5F5]">
            <WelcomeHero />
            <RecentTrips />
            <Recommended />
        </main>
        <Footer />
        </>
);
}