"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../../components/layout/Footerr";
import WelcomeHero from "./WelcomeHero";
import RecentTrips from "./RecentTrips";
import Recommended from "./Recommended";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
    const [firstName, setFirstName] = useState<string | undefined>(undefined);

    useEffect(() => {
        const auth = getFirebaseAuth();
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setFirstName(undefined);
                return;
            }
            const display = user.displayName || "";
            let name = display.trim().split(/\s+/)[0];
            if (!name && user.email) {
                // fallback from email local part
                name = user.email.split("@")[0];
            }
            // Capitalize first letter
            if (name) name = name.charAt(0).toUpperCase() + name.slice(1);
            setFirstName(name || undefined);
        });
        return () => unsub();
    }, []);

    return (
        <>
            <Navbar />
            <main className="bg-[#F5F5F5]">
                <WelcomeHero userName={firstName ?? "there"} />
                <RecentTrips />
                <Recommended />
            </main>
            <Footer />
        </>
    );
}