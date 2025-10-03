"use client";

interface PhaseProps {
  number: string;
  title: string;
  description: string;
  color: string;
}

const Phase = ({ number, title, description, color }: PhaseProps) => {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color} mb-2 font-lexend`}>Phase {number}</div>
      <h4 className="text-lg font-semibold mb-2 font-lexend">{title}</h4>
      <p className="text-gray-600 text-sm font-lexend">{description}</p>
    </div>
  );
};

interface VisionSectionProps {
  title: string;
  description: string;
  phases: Array<{
    number: string;
    title: string;
    description: string;
    color: string;
  }>;
}

export default function VisionSection({ title, description, phases }: VisionSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-lexend text-[#1078CF]">
            {title}
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg mb-8 font-lexend leading-relaxed">
              {description}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {phases.map((phase, index) => (
                <Phase key={index} {...phase} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}