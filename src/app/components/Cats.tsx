"use client";

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
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
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
      <div className="max-w-7xl mx-auto px-6">
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
            image="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop&crop=center"
          />
            
            <CategoryCard
            title="Transients"
            description="Affordable short stays, perfect for quick trips."
            image="https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=600&h=400&fit=crop&crop=center"
            />
          {/* Bottom Row - Hotels spanning full width */}
          <CategoryCard
            title="Hotels"
            description="Full service comfort with modern convenience."
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&crop=center"
            className="md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
}
