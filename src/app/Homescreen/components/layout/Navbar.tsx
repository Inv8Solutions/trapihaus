"use client";
import Link from "next/link";
import Image from "next/image";
import { Lexend } from "next/font/google";
import { usePathname } from "next/navigation";

interface User { name: string; avatar: string }

const lexend = Lexend({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

export default function Navbar() {
    const pathname = usePathname();
    const user = null as User | null; // placeholder; integrate real auth
    
    return (
        <nav className={`${lexend.className} w-full bg-blue-600 rounded-full py-3 shadow-md mt-[24px]`}>
            <div className="max-w-6xl mx-auto flex items-center">
                <Link href="/" className="flex items-center flex-none hover:opacity-80 transition-opacity duration-200">
                    <Image src="/logo.png" alt="TrapiHaus" width={120} height={32} className="h-8 w-auto cursor-pointer" style={{ width: 'auto' }} priority />
                </Link>

                    <div className="flex-1 hidden md:flex justify-center space-x-10 text-white text-[16px]">
                            <Link href="/home" className={pathname === "/" ? "font-black" : "font-medium"}>Home</Link>
                            <Link href="/Homescreen/HomescreenBrowse" className={pathname === "/Homescreen/HomescreenBrowse" ? "font-black" : "font-medium"}>Browse</Link>
                            <Link href="/trips" className={pathname === "/trips" ? "font-black" : "font-medium"}>My Trips</Link>
                            <Link href="/List" className={pathname === "/List" ? "font-black" : "font-medium"}>List Property</Link>
                    </div>

                    {user ? (
                        <div className="flex items-center gap-2 pl-4">
                            <div className="relative">
                                <Image
                                    src={user?.avatar || "/woman.png"}
                                    alt={user?.name || "User avatar"}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full object-cover border-2 border-white/60 shadow-sm"
                                />
                            </div>
                            <button
                                aria-label="Open user menu"
                                className="text-white hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/40 rounded-full p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 pl-4">
                            <Link
                                href="/login"
                                className="px-5 py-2 rounded-full bg-[#83C12C] text-white text-sm font-semibold shadow hover:bg-[#6e9f24] transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/Register"
                                className="px-5 py-2 rounded-full bg-[#F68109] text-white text-sm font-semibold shadow hover:bg-[#d96f06] transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    )}
            </div>
        </nav>
    );
}
