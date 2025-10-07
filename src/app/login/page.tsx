"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// NOTE: This UI is Firebase-ready but does not initialize auth yet.
// After adding Firebase, import signIn / related helpers from a client module.

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder: integrate Firebase auth (signInWithEmailAndPassword) here.
    setTimeout(() => setLoading(false), 800);
  };

  return (
  <main className="h-screen w-full flex flex-col lg:flex-row p-0 overflow-hidden">
      {/* Left: Form */}
  <div className="relative flex w-full lg:w-1/2 items-center justify-center px-6 md:px-14 lg:px-20 py-10 lg:py-0 lg:h-screen">
        <div className="w-full max-w-md">
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center">
            <Image src="/mainLogo.png" alt="Trapihaus main logo" width={170} height={52} priority />
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold font-lexend tracking-tight mb-2 text-[#111827]">Sign In</h1>
        <p className="text-sm text-[#6B7280] font-lexend mb-8 max-w-sm">
          Sign in to manage your bookings, explore stays, or list your property.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium font-lexend text-[#374151]">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-lexend placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
                autoComplete="email"
              />
            </div>
          {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium font-lexend text-[#374151]">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pr-11 px-4 text-sm font-lexend placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-[#6B7280] hover:text-[#4B5563]"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-10-8-10-8a18.29 18.29 0 014.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 10 8 10 8a18.34 18.34 0 01-2.16 3.19M14.12 14.12a3 3 0 01-4.24-4.24" /><path d="M1 1l22 22" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link href="/forgot-password" className="text-xs font-lexend text-[#1078CF] hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#1078CF] hover:bg-[#0D68B5] active:bg-[#0B5A9C] text-white font-semibold text-sm font-lexend transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm font-lexend text-[#374151]">
          Don’t have an account? {" "}
          <Link href="/Register" className="font-semibold text-[#111827] hover:underline">
            Sign Up
          </Link>
        </p>
        </div>
      </div>
      {/* Right: Feature Image */}
      <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[calc(100vh-48px)] overflow-hidden mt-6 mb-6 mr-6">
        <Image
          src="/apartments.jpg"
          alt="Modern furnished apartment interior with mountain view through windows"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0" />
      </div>
    </main>
  );
}
