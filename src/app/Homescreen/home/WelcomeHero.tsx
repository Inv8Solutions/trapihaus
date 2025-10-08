"use client";

import Iridescence from "../../browse/Iridescence";

interface WelcomeHeroProps {
    userName?: string;
}

export default function WelcomeHero({ userName = "Carl" }: WelcomeHeroProps) {
	return (
		<div className="px-8">
            <section className="w-full mt-8">
                                <div className="relative overflow-hidden rounded-[40px] h-[220px] md:h-[240px] lg:h-[250px] flex items-center justify-center">
                    {/* Animated background */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <Iridescence color={[0.06, 0.47, 0.91]} speed={0.7} amplitude={0.07} />
                                                <div className="absolute inset-0 bg-blue-600/60" />
                    </div>

                    {/* Content */}
                                        <div className="relative z-10 text-center px-6 flex flex-col items-center">
                                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-lexend tracking-tight mb-4">
                                                    Welcome back, {userName}!
                                                </h1>
                                                <p className="text-white/90 text-sm md:text-base font-lexend mb-6">Ready for your next trip?</p>
                                                <button className="px-8 py-3 rounded-full bg-[#83C12C] text-white font-semibold text-sm md:text-base shadow hover:bg-[#6e9f24] transition-colors">
                                                    Plan your Next Trip
                                                </button>
                    </div>
                </div>
            </section>
        </div>
	);
}

