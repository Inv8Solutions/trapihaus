"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        TrapiHaus
      </Link>

      {/* Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link href="#">Browse Stays</Link>
        <Link href="#">About</Link>
        <Link href="#">List Property</Link>
        <Link href="#">Contact</Link>
      </div>

      {/* Buttons */}
      <div className="space-x-3">
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full">
          Sign In
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full">
          Register
        </button>
      </div>
    </nav>
  );
}
