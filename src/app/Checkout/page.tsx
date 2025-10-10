"use client";

import Navbar from "../components/layout/Navbar";
import Checkout from "./Checkout";

export default function CheckoutPage() {
    return (
        <>
        <Navbar />
        <main>
            <Checkout />
        </main>
        </>        
    );
}