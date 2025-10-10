"use client";

import { useId } from "react";
import Image from "next/image";

interface SendAMessageProps {
	title?: string;
}

const categories = [
	"Booking Issue",
	"Listing / Host Support",
	"Payments & Refunds",
	"Compliance / Accreditation",
	"General Inquiry",
];

export default function SendAMessage({ title = "Send us a Message" }: SendAMessageProps) {
	const formId = useId();

	return (
		<section className="px-8 mt-10">
			<div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
				{/* Form Card */}
				<div className="bg-white border border-[#E9E9E9] rounded-[40px] p-8 md:p-10 flex flex-col shadow-sm">
					<h2 className="text-2xl md:text-[26px] font-bold font-lexend mb-6 tracking-tight text-[#111827]">{title}</h2>

					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
						className="flex flex-col gap-6"
						aria-labelledby={`${formId}-title`}
					>
						<div className="flex flex-col gap-5">
							{/* Full Name */}
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-[#374151] font-lexend" htmlFor={`${formId}-fullname`}>
									Full Name<span className="text-red-500">*</span>
								</label>
								<input
									id={`${formId}-fullname`}
									name="fullName"
									placeholder="Juan dela Cruz"
									required
									className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-lexend placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
								/>
							</div>

							{/* Email */}
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-[#374151] font-lexend" htmlFor={`${formId}-email`}>
									Email<span className="text-red-500">*</span>
								</label>
								<input
									id={`${formId}-email`}
									type="email"
									name="email"
									placeholder="jdc@email.com"
									required
									className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-lexend placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
								/>
							</div>

							{/* Phone + Category */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="flex flex-col gap-2">
									<label className="text-sm font-medium text-[#374151] font-lexend" htmlFor={`${formId}-phone`}>
										Phone Number
									</label>
									<input
										id={`${formId}-phone`}
										type="tel"
										name="phone"
										placeholder="+63"
										className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-lexend placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
									/>
								</div>

								<div className="flex flex-col gap-2">
									<label className="text-sm font-medium text-[#374151] font-lexend" htmlFor={`${formId}-category`}>
										Category
									</label>
									<div className="relative">
										<select
											id={`${formId}-category`}
											name="category"
											defaultValue={categories[0]}
											className="appearance-none h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 pr-10 text-sm font-lexend text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
										>
											{categories.map((c) => (
												<option key={c} value={c}>
													{c}
												</option>
											))}
										</select>
										<svg
											className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-[#6B7280]"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								</div>
							</div>

							{/* Subject */}
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-[#374151] font-lexend" htmlFor={`${formId}-subject`}>
									Subject
								</label>
								<input
									id={`${formId}-subject`}
									name="subject"
									placeholder='e.g., "Change check-in time"'
									className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-lexend placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
								/>
							</div>

							{/* Message */}
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-[#374151] font-lexend" htmlFor={`${formId}-message`}>
									Message
								</label>
								<textarea
									id={`${formId}-message`}
									name="message"
									placeholder="Share Details"
									rows={5}
									className="w-full rounded-lg border border-[#E5E7EB] bg-white p-4 text-sm font-lexend placeholder:text-[#9CA3AF] resize-none focus:outline-none focus:ring-2 focus:ring-[#1078CF]/60 focus:border-[#1078CF]"
								/>
							</div>
						</div>

						{/* Actions */}
						<div className="flex flex-col gap-4">
							<div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
								<div className="flex items-center gap-3">
									<label
										htmlFor={`${formId}-file`}
										className="cursor-pointer select-none flex items-center gap-2 rounded-xl bg-[#F5F5F5] hover:bg-[#ECECEC] active:bg-[#E5E5E5] px-5 h-11 text-sm font-medium text-[#111827] font-lexend transition-colors"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="w-4 h-4"
										>
											<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
										</svg>
										Attach File
										<input id={`${formId}-file`} name="attachment" type="file" className="hidden" />
									</label>
									<button
										type="submit"
										className="md:hidden inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#1078CF] hover:bg-[#0D68B5] active:bg-[#0B5A9C] text-white text-sm font-semibold font-lexend shadow-sm transition-colors"
									>
										Send Message
									</button>
								</div>
								<button
									type="submit"
									className="hidden md:inline-flex items-center justify-center h-11 px-8 rounded-xl bg-[#1078CF] hover:bg-[#0D68B5] active:bg-[#0B5A9C] text-white text-sm font-semibold font-lexend shadow-sm transition-colors"
								>
									Send Message
								</button>
							</div>
							<p className="flex items-start gap-2 text-[11px] md:text-xs text-[#4B5563] font-lexend">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-4 h-4 mt-0.5 text-[#83C12C]"
								>
									<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
									<path d="M9 12l2 2 4-4" />
								</svg>
								Your info is protected. We&apos;ll never share your data without consent.
							</p>
						</div>
					</form>
				</div>

				{/* Image Card */}
				<div className="relative rounded-[40px] overflow-hidden border border-[#E9E9E9] bg-white min-h-[520px] flex items-center justify-center p-4">
					<Image
						src="/woman.png"
						alt="Support representative using phone"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 40vw"
						priority
					/>
				</div>
			</div>
		</section>
	);
}

