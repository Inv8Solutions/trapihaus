"use client";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const ValueCard = ({ icon, title, description, bgColor, iconColor }: ValueCardProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
      <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4 font-lexend">{title}</h3>
      <p className="text-gray-600 font-lexend">
        {description}
      </p>
    </div>
  );
};

interface ValuesGridProps {
  title: string;
  subtitle: string;
  values: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }>;
}

export default function ValuesGrid({ title, subtitle, values }: ValuesGridProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-lexend text-[#1078CF]">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lexend">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}