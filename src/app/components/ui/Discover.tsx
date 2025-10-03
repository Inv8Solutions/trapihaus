"use client";

interface LandmarkCardProps {
  image: string;
  title: string;
  description: string;
}

const LandmarkCard = ({ image, title, description }: LandmarkCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-full">
      <div 
        className="h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-2 font-lexend">{title}</h3>
            <p className="text-xs md:text-sm opacity-90 font-lexend">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DiscoverProps {
  title?: string;
  subtitle?: string;
  landmarks?: LandmarkCardProps[];
}

export default function Discover({ 
  title = "Discover Baguio's Iconic Landmarks",
  subtitle = "Explore the city's heritage, culture, and natural beauty",
  landmarks = [
    {
      image: "/diplomat.png",
      title: "Diplomat Hotel",
      description: "A historic site known for its architecture and legacy"
    },
    {
      image: "/mines.png",
      title: "Mines View Park",
      description: "Panoramic mountain views of Baguio and Benguet"
    },
    {
      image: "/cathedral.png",
      title: "Baguio Cathedral",
      description: "A city landmark of faith and heritage"
    },
    {
      image: "/botanical.png",
      title: "Botanical Garden",
      description: "A serene showcase of Baguio's natural heritage"
    },
    {
      image: "/burnham.png",
      title: "Burnham Park",
      description: "The central hub for recreation and leisure in Baguio"
    },
    {
      image: "/lion.png",
      title: "Lions Head",
      description: "An iconic landmark welcoming travelers to Baguio"
    }
  ]
}: DiscoverProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-lexend text-[#1078CF]">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-lexend">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[900px]">
          {/* Left Column - 70% top, 30% bottom */}
          <div className="flex flex-col gap-4 h-full">
            <div className="h-[56%]">
              <LandmarkCard 
                image="/diplomat.png"
                title="Diplomat Hotel"
                description="A historic site known for its architecture and legacy"
              />
            </div>
            <div className="h-[40%]">
              <LandmarkCard 
                image="/botanical.png"
                title="Botanical Garden"
                description="A serene showcase of Baguio's natural heritage"
              />
            </div>
          </div>

          {/* Middle Column - 30% top, 70% bottom */}
          <div className="flex flex-col gap-4 h-full">
            <div className="h-[40%]">
              <LandmarkCard 
                image="/mines.png"
                title="Mines View Park"
                description="Panoramic mountain views of Baguio and Benguet"
              />
            </div>
            <div className="h-[56%]">
              <LandmarkCard 
                image="/burnham.png"
                title="Burnham Park"
                description="The central hub for recreation and leisure in Baguio"
              />
            </div>
          </div>

          {/* Right Column - 70% top, 30% bottom */}
          <div className="flex flex-col gap-4 h-full">
            <div className="h-[56%]">
              <LandmarkCard 
                image="/cathedral.png"
                title="Baguio Cathedral"
                description="A city landmark of faith and heritage"
              />
            </div>
            <div className="h-[40%]">
              <LandmarkCard 
                image="/lion.png"
                title="Lions Head"
                description="An iconic landmark welcoming travelers to Baguio"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
