"use client";

import Navbar from "../components/layout/Navbar";
import Footerr from "../../components/layout/Footerr";
import TripsBanner from "./TripsBanner";
import PastTrips from "./PastTrips";

export default function MyTrips() {
    return (
        <>
            <Navbar />
            <main className="">
                <TripsBanner />
                <PastTrips />
            </main>
            <Footerr />
        </>
    );
}
