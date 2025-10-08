"use client";
import Iridescence from "../../browse/Iridescence";

export default function TripsBanner() {
    return (
        <div className="px-8">
            <section className="w-full mt-8">
                <div className="relative overflow-hidden rounded-[40px] h-[170px] md:h-[180px] lg:h-[185px] flex items-center justify-center">
                    {/* Animated background */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <Iridescence color={[0.06, 0.47, 0.91]} speed={0.55} amplitude={0.05} />
                        <div className="absolute inset-0 bg-blue-600/65" />
                    </div>
                    {/* Content */}
                    <div className="relative z-10 text-center px-6 flex flex-col items-center">
                        <h1 className="text-[34px] md:text-[40px] font-extrabold text-white font-lexend tracking-tight mb-3">
                            My Trips
                        </h1>
                        <p className="text-white/95 text-[11px] md:text-sm font-lexend max-w-2xl mx-auto leading-relaxed">
                            All your bookings, past and present, organized for easy access and peace of mind.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

