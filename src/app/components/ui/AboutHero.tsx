"use client";

interface AboutHeroProps {
  title: string;
  subtitle: string;
  bgColor?: string;
}

export default function AboutHero({ 
  title, 
  subtitle, 
  bgColor = "bg-gradient-to-r from-blue-600 to-blue-500" 
}: AboutHeroProps) {
  return (
    <section className="relative bg-white mt-[24px] mb-20">
      <div className={`h-[400px] ${bgColor} flex items-center justify-center rounded-[40px] relative overflow-hidden mx-[24px]`}>
        <div className="text-center text-white max-w-4xl px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-lexend">
            {title}
          </h1>
          <p className="text-lg md:text-xl font-lexend">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}