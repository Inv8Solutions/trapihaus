"use client";
import Image from "next/image";
interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

const CategoryCard = ({ title, description, image, className = "" }: CategoryCardProps) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden group cursor-pointer ${className}`}>
      {/* Background Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
          priority={false}
        />
        {/* Gradient Overlay - Black to Transparent from bottom to top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 font-lexend">{title}</h3>
        <p className="text-sm opacity-90 font-lexend">{description}</p>
      </div>
    </div>
  );
};

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-full mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-[48px] font-bold mb-4 font-lexend">
            <span className="text-blue-600">Find the Stay</span> That Fits You
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lexend">
            Choose from budget-friendly apartments, flexible transient houses, or trusted hotels for your Baguio experience.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryCard
            title="Apartments"
            description="A comfortable space built for longer stays."
            image="https://github.com/Inv8Solutions/trapihaus/blob/master/public/apartments.jpg?raw=true"
          />
            
            <CategoryCard
            title="Transients"
            description="Affordable short stays, perfect for quick trips."
            image="https://github.com/Inv8Solutions/trapihaus/blob/master/public/transients.jpg?raw=true"
            />
          {/* Bottom Row - Hotels spanning full width */}
          <CategoryCard
            title="Hotels"
            description="Full service comfort with modern convenience."
            image="https://github.com/Inv8Solutions/trapihaus/blob/master/public/hotels.jpg?raw=true"
            className="md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
}
