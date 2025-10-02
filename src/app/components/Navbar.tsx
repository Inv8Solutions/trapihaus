"use client";
import Link from "next/link";
import { Lexend } from "next/font/google";
import { usePathname } from "next/navigation";

const lexend = Lexend({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

export default function Navbar() {
    const pathname = usePathname();
    
    return (
        <nav className={`${lexend.className} w-full bg-blue-600 rounded-full py-3 shadow-md mt-[24px]`}>
            <div className="max-w-6xl mx-auto flex items-center">
                <Link href="/" className="flex items-center flex-none">
                    <img src="/logo.png" alt="TrapiHaus" className="h-8" />
                </Link>

                <div className="flex-1 hidden md:flex justify-center space-x-8 text-white text-[18px]">
                    <Link href="/" className={pathname === "/" ? "font-black" : "font-medium"}>Browse Stays</Link>
                    <Link href="/about" className={pathname === "/about" ? "font-black" : "font-medium"}>About</Link>
                    <Link href="#" className="font-medium">List Property</Link>
                    <Link href="#" className="font-medium">Contact</Link>
                </div>

                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-[#83C12C] hover:bg-green-500 text-white rounded-full font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300">
                        Sign In
                    </button>
                    <button className="px-4 py-2 bg-[#F68109] hover:bg-orange-500 text-white rounded-full font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
                        Register
                    </button>
                </div>
            </div>
        </nav>
    );
}
