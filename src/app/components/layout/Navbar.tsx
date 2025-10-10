"use client";
import Link from "next/link";
import Image from "next/image";
import { Lexend } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

interface User { name: string; avatar: string }

const lexend = Lexend({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

export default function Navbar() {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getFirebaseAuth();
        const unsub = onAuthStateChanged(auth, (fbUser) => {
            if (!fbUser) {
                setUser(null);
                return;
            }
            const name = fbUser.displayName || fbUser.email || "Guest";
            const avatar = fbUser.photoURL || "/woman.png"; // placeholder until admin panel provides uploads
            setUser({ name, avatar });
        });
        return () => unsub();
    }, []);

    // Close on outside click / Escape
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
        }
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") setMenuOpen(false); }
        if (menuOpen) {
            document.addEventListener("mousedown", onDocClick);
            document.addEventListener("keydown", onKey);
        }
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);
    
    return (
    <nav className={`${lexend.className} w-full bg-blue-600 rounded-full py-3 shadow-md mt-[24px] relative z-[9999]`}>
            <div className="max-w-6xl mx-auto flex items-center">
                <Link href="/" className="flex items-center flex-none hover:opacity-80 transition-opacity duration-200">
                    <Image src="/logo.png" alt="TrapiHaus" width={120} height={32} className="h-8 w-auto cursor-pointer" style={{ width: 'auto' }} priority />
                </Link>

                <div className="flex-1 hidden md:flex justify-center space-x-10 text-white text-[16px]">
                        <Link href="/" className={pathname === "/" ? "font-black" : "font-medium"}>Home</Link>
                        <Link href="/browse" className={pathname === "/browse" ? "font-black" : "font-medium"}>Browse Accommodations</Link>
                        <Link href="/trips" className={pathname === "/trips" ? "font-black" : "font-medium"}>My Trips</Link>
                        <Link href="/List" className={pathname === "/List" ? "font-black" : "font-medium"}>List Property</Link>
                </div>

                {user ? (
                    <div className="relative pl-4" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            className="flex items-center gap-2 group"
                        >
                            <Image
                                src={user?.avatar || "/woman.png"}
                                alt={user?.name || "User avatar"}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover border-2 border-white/60 shadow-sm"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white group-hover:opacity-80">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {menuOpen && (
                            <div role="menu" className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden z-[9999]">
                                <Link href="/Homescreen/MyTrips" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Trips</Link>
                                <Link href="/List" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">List Property</Link>
                                <div className="h-px bg-gray-100" />
                                <button
                                    onClick={async () => {
                                        try {
                                            await signOut(getFirebaseAuth());
                                            setMenuOpen(false);
                                            router.push("/");
                                        } catch (e) {
                                            // eslint-disable-next-line no-console
                                            console.error("Sign out failed", e);
                                        }
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
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
