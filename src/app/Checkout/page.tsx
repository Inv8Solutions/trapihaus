"use client";

import { Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import Checkout from "./Checkout";

export default function CheckoutPage() {
    return (
        <>
        <Navbar />
        <main>
            <Suspense fallback={
                <div className="max-w-full mx-auto px-6 py-10 bg-[#F5F5F5]">
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1078CF]"></div>
                    </div>
                </div>
            }>
                <Checkout />
            </Suspense>
        </main>
        </>        
    );
}