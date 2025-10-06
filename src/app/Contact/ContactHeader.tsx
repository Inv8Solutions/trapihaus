"use client";

import Iridescence from "../browse/Iridescence";

interface ContactHeaderProps {
	title?: string;
	subtitle?: string;
}

export default function ContactHeader({
	title = "Contact Us",
	subtitle = "We’re here to help with bookings, listings, payments, and compliance.",
}: ContactHeaderProps) {
	return (
		<div className="px-8">
            <section className="w-full mt-8">
                <div className="relative overflow-hidden rounded-[40px] h-[160px] md:h-[180px] lg:h-[190px] flex items-center justify-center">
                    {/* Animated background */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <Iridescence color={[0.06, 0.47, 0.91]} speed={0.7} amplitude={0.07} />
                        {/* Subtle overlay to keep text legible */}
                        <div className="absolute inset-0 bg-blue-600/50" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-6">
                        <h1 className="text-[65px] md:text-[72px] font-extrabold text-white font-lexend tracking-tight mb-2">{title}</h1>
                        <p className="text-[#F5F5F5] text-[20px] md:text-base font-lexend max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
                    </div>
                </div>
            </section>
        </div>
	);
}

