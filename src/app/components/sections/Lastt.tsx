"use client";
import Image from 'next/image';
export default function Lastt() {
  return (
    <section className="relative pt-24 pb-40 overflow-hidden rounded-t-[40px] mx-[24px] translate-y-2 z-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://github.com/Inv8Solutions/trapihaus/blob/master/public/lastbg.jpg?raw=true"
          alt="Baguio mountains landscape"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-lexend leading-tight">
          Ready to Experience<br />
          Trapihaus?
        </h2>
        
        <p className="text-lg md:text-xl mb-8 font-lexend opacity-90 max-w-2xl mx-auto">
          Whether you&apos;re looking for a safe, budget-friendly stay or want to earn as a host,<br />
          Trapihaus makes it simple.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-[#83C12C] hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 font-lexend text-lg min-w-[200px]">
            Browse Accommodations
          </button>
          
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 font-lexend text-lg min-w-[200px]">
            Become a Host
          </button>
        </div>
      </div>
    </section>
  );
}
