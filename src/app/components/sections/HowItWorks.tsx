"use client";

interface StepProps {
  number: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

const Step = ({ number, title, description, bgColor, textColor }: StepProps) => {
  return (
    <div className="flex items-start gap-4 mb-8">
      {/* Number Circle */}
      <div className={`w-16 h-16 ${bgColor} ${textColor} rounded-full flex items-center justify-center text-xl font-bold font-lexend flex-shrink-0`}>
        {number}
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-lexend">{title}</h3>
        <p className="text-gray-600 font-lexend">{description}</p>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images Section */}
          <div className="relative">
            {/* Main Top Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop&crop=center"
                alt="Modern apartment interior"
                className="w-full h-96 object-cover rounded-2xl"
              />
              
              {/* Floating Bottom Image - Positioned on bottom right */}
              <div className="absolute -bottom-16 -right-8 w-2/3 h-48">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&crop=center"
                  alt="Cozy apartment living area"
                  className="w-full h-full object-cover rounded-2xl shadow-lg border-8 border-white"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 font-lexend">
              How it <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 font-lexend">
              Finding your perfect stay in Baguio City is simple with our three-step process
            </p>

            {/* Steps */}
            <div>
              <Step
                number="1"
                title="Browse Verified Listings"
                description="Search through our curated collection of safe and compliant accommodations in Baguio City."
                bgColor="bg-blue-600"
                textColor="text-white"
              />
              
              <Step
                number="2"
                title="Book Securely"
                description="Reserve your chosen accommodation with our secure booking system and flexible payment options."
                bgColor="bg-green-500"
                textColor="text-white"
              />
              
              <Step
                number="3"
                title="Stay with Confidence"
                description="Enjoy your stay knowing you're in a verified, safe accommodation with 24/7 support available."
                bgColor="bg-orange-500"
                textColor="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
