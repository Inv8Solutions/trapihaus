"use client";

interface AboutHeroProps {
  title: string;
  subtitle: string;
  bgImage?: string;
}

export default function AboutHero({ 
  title, 
  subtitle, 
  bgImage = "/about_hero_img.jpg" 
}: AboutHeroProps) {
  return (
    <section className="relative bg-white mt-[24px] mb-20">
      <div 
        className="h-[400px] flex items-center justify-center rounded-[40px] relative overflow-hidden mx-[24px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Gradient overlay from black bottom to transparent top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[40px]"></div>
        
        <div className="text-center text-white max-w-4xl px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 font-lexend">
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