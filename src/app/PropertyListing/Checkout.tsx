"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppImage from "../components/ui/AppImage";

export default function Checkout() {
	const searchParams = useSearchParams();
	// Mocked booking info — in a real app, this would come from prev page/state
	const PRICE_PER_NIGHT = 2500;
	const SERVICE_FEE = 500; // matches screenshot
	const VAT_RATE = 0.12; // 12%

		// Example selected details (overridden by query params if present)
		const qCheckIn = searchParams.get("checkIn");
		const qCheckOut = searchParams.get("checkOut");
		const qGuests = searchParams.get("guests");
		const qNights = searchParams.get("nights");
		const qSubtotal = searchParams.get("subtotal");
		const qTotal = searchParams.get("total");

		const checkIn = qCheckIn ?? new Date().toISOString().slice(0, 10);
		const checkOut = qCheckOut ?? new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
		const guests = Number.isFinite(Number(qGuests)) && Number(qGuests) > 0 ? Number(qGuests) : 2;

	// Guest details form
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [request, setRequest] = useState("");

	// Payment
	type Method = "card" | "cash" | "gcash";
	const [method, setMethod] = useState<Method>("card");
	const [cardName, setCardName] = useState("Juan Dela Cruz");
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvv, setCvv] = useState("");
	const [agree, setAgree] = useState(true);
	const [promo, setPromo] = useState("");

		const nights = useMemo(() => {
			if (qNights) {
				const n = Number(qNights);
				if (!Number.isNaN(n) && n > 0) return n;
			}
			const ci = new Date(checkIn);
			const co = new Date(checkOut);
			const ms = co.getTime() - ci.getTime();
			return Math.max(1, Math.ceil(ms / 86400000));
		}, [qNights, checkIn, checkOut]);

		const computedSubtotal = nights * PRICE_PER_NIGHT;
		const subtotal = qSubtotal ? Number(qSubtotal) || computedSubtotal : computedSubtotal;
		const vat = Math.round(subtotal * VAT_RATE);
		const computedTotal = subtotal + SERVICE_FEE + vat;
		const total = qTotal ? Number(qTotal) || computedTotal : computedTotal;
	const CURRENCY = String.fromCharCode(0x20b1);

	const formatDate = (iso: string) =>
		new Date(iso).toLocaleDateString(undefined, {
			weekday: "short",
			month: "short",
			day: "numeric",
			year: "numeric",
		});

	return (
		<main className="max-w-7xl mx-auto px-6 py-10">
			<header className="mb-6">
				<h1 className="text-3xl font-extrabold font-lexend">Complete your Booking</h1>
				<p className="text-gray-500 mt-1">You’re just a few steps away from your perfect stay</p>
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
				{/* Left: Forms */}
				<section className="space-y-6">
					{/* Guest Details */}
					<div className="bg-white rounded-[24px] p-6 border border-[#F3F4F6] shadow-sm">
						<h2 className="text-xl font-semibold mb-5">Guest Details</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm text-gray-600">First Name</label>
								<input value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Juan" />
							</div>
							<div>
								<label className="text-sm text-gray-600">Last Name</label>
								<input value={lastName} onChange={(e)=>setLastName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Dela Cruz" />
							</div>
							<div>
								<label className="text-sm text-gray-600">Email</label>
								<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="jdelacruz@email.com" />
							</div>
							<div>
								<label className="text-sm text-gray-600">Mobile Number</label>
								<input value={phone} onChange={(e)=>setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="+63" />
							</div>
							<div className="md:col-span-2">
								<label className="text-sm text-gray-600">Special Request (optional)</label>
								<input value={request} onChange={(e)=>setRequest(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Example: Late check-in, parking, etc" />
							</div>
						</div>
					</div>

					{/* Payment Method */}
					<div className="bg-white rounded-[24px] p-6 border border-[#F3F4F6] shadow-sm">
						<h2 className="text-xl font-semibold mb-5">Payment Method</h2>
						<div className="space-y-3">
							<label className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-3 ${method==='card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
								<span className="flex items-center gap-2 text-sm">
									<input type="radio" name="pm" checked={method==='card'} onChange={()=>setMethod('card')} />
									Debit/Credit Card
								</span>
								<span className="text-gray-300">▢</span>
							</label>
							<label className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-3 ${method==='cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
								<span className="flex items-center gap-2 text-sm">
									<input type="radio" name="pm" checked={method==='cash'} onChange={()=>setMethod('cash')} />
									Cash
								</span>
								<span className="text-gray-300">▢</span>
							</label>
							<label className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-3 ${method==='gcash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
								<span className="flex items-center gap-2 text-sm">
									<input type="radio" name="pm" checked={method==='gcash'} onChange={()=>setMethod('gcash')} />
									GCash
								</span>
								<span className="text-gray-300">▢</span>
							</label>
						</div>

						{/* Card fields */}
						{method === 'card' && (
							<div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="md:col-span-3">
									<label className="text-sm text-gray-600">Cardholder Name</label>
									<input value={cardName} onChange={(e)=>setCardName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Juan Dela Cruz" />
								</div>
								<div className="md:col-span-3">
									<label className="text-sm text-gray-600">Card Number</label>
									<input value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="4000 1234 5678 9010" />
								</div>
								<div>
									<label className="text-sm text-gray-600">Expiry</label>
									<input value={expiry} onChange={(e)=>setExpiry(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="MM/YY" />
								</div>
								<div>
									<label className="text-sm text-gray-600">CVV</label>
									<input value={cvv} onChange={(e)=>setCvv(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="123" />
								</div>
							</div>
						)}
					</div>
				</section>

				{/* Right: Booking Summary */}
				<aside className="space-y-6">
					<div className="bg-white rounded-[24px] p-6 border border-[#F3F4F6] shadow-sm">
						<h2 className="text-lg font-semibold mb-4">Booking Summary</h2>

						<div className="flex items-center gap-3 mb-4">
							<div className="relative w-20 h-16 rounded-xl overflow-hidden">
								<AppImage src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=320&q=60" alt="Room thumbnail" fillParent className="object-cover" />
							</div>
							<div className="flex-1">
								<p className="text-sm font-semibold">Loakan Heights Residences</p>
								<p className="text-xs text-gray-500">Baguio City • Transient</p>
								<span className="mt-1 inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
									<svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.07a1 1 0 01-1.415 0L3.293 9.95a1 1 0 011.414-1.414l3.1 3.1 6.364-6.364a1 1 0 011.536.021z" clipRule="evenodd" />
									</svg>
									Verified
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3 text-sm">
							<div>
								<p className="text-gray-500">Check-in</p>
								<div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
									<CalendarIcon />
									<span>{formatDate(checkIn)}</span>
								</div>
							</div>
							<div>
								<p className="text-gray-500">Check-out</p>
								<div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
									<CalendarIcon />
									<span>{formatDate(checkOut)}</span>
								</div>
							</div>
							<div className="col-span-2">
								<p className="text-gray-500">Guests</p>
								<div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
									<UserIcon />
									<span>{guests} Adults</span>
								</div>
							</div>
						</div>

						<div className="my-4 h-px bg-gray-100" />

						{/* Pricing */}
						<div className="space-y-2 text-sm">
							<Row label={`${CURRENCY}${PRICE_PER_NIGHT.toLocaleString()} x ${nights} nights`} value={`${CURRENCY}${subtotal.toLocaleString(undefined,{minimumFractionDigits:2})}`} strong={false} />
							<Row label="Service Fee" value={`${CURRENCY}${SERVICE_FEE.toLocaleString(undefined,{minimumFractionDigits:2})}`} strong={false} />
							<Row label={`VAT (${Math.round(VAT_RATE*100)}%)`} value={`${CURRENCY}${vat.toLocaleString(undefined,{minimumFractionDigits:2})}`} strong={false} />
							<div className="my-2 h-px bg-gray-100" />
							<Row label="Total" value={`${CURRENCY}${total.toLocaleString(undefined,{minimumFractionDigits:2})}`} strong />
						</div>

						{/* Promo */}
						<div className="mt-4 flex gap-2">
							<input value={promo} onChange={(e)=>setPromo(e.target.value)} placeholder="Promo/Voucher" className="flex-1 rounded-xl border border-gray-200 px-3 py-2" />
							<button className="px-4 py-2 rounded-xl border border-gray-200 text-sm">Apply</button>
						</div>
					</div>

					<div className="bg-white rounded-[24px] p-6 border border-[#F3F4F6] shadow-sm">
						<label className="flex items-start gap-3 text-sm">
							<input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="mt-1" />
							<span>
								By clicking this, I agree to Trapihaus <a className="text-blue-600 hover:underline" href="#">Terms & Conditions</a> and <a className="text-blue-600 hover:underline" href="#">Privacy Policy</a>
							</span>
						</label>
						<button disabled={!agree} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold">Pay My Booking</button>
						<p className="mt-2 text-[11px] text-gray-400">Listings are vetted for safety and compliance (Mayor’s permit / DOT: Tourist Inn / Transient accreditation where applicable).</p>
					</div>
				</aside>
			</div>
		</main>
	);
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
	return (
		<div className={`flex items-center justify-between ${strong ? 'text-base font-semibold' : ''}`}>
			<span>{label}</span>
			<span>{value}</span>
		</div>
	);
}

function CalendarIcon() {
	return (
		<svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
			<line x1="16" y1="2" x2="16" y2="6"/>
			<line x1="8" y1="2" x2="8" y2="6"/>
			<line x1="3" y1="10" x2="21" y2="10"/>
		</svg>
	);
}

function UserIcon() {
	return (
		<svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
			<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	);
}

