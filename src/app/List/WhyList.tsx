"use client";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  bg: string;
}

const features: Feature[] = [
  {
    title: "Built for Filipino Hosts",
    description: "Trapihaus is the first hyperlocal accommodation marketplace designed with Filipino property owners and travelers in mind.",
    icon: (
      <span className="text-2xl" role="img" aria-label="Philippines flag">
        🇵🇭
      </span>
    ),
    bg: "bg-blue-50"
  },
  {
    title: "Easy to List, Easy to Earn",
    description: "From creating your listing to receiving payments, Trapihaus makes hosting seamless and stress-free.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .843-3 1.882C9 11.157 10.343 12 12 12s3 .843 3 1.882S13.657 15.764 12 15.764 9 14.92 9 13.882M12 8V6m0 9.764v2.353M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: "bg-green-50"
  },
  {
    title: "Hosting You Can Trust",
    description: "Every property is verified for safety and compliance, giving both hosts and guests peace of mind.",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0h1.5a2.25 2.25 0 012.25 2.25v5.25a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18v-5.25A2.25 2.25 0 016.75 10.5H8.25m8.25 0H7.5" />
      </svg>
    ),
    bg: "bg-orange-50"
  }
];

export default function WhyList() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-lexend mb-4">
          Why List with <span className="text-blue-600">Trapihaus?</span>
        </h2>
        <p className="text-gray-600 text-lg font-lexend mb-16 max-w-2xl mx-auto">
          A trusted platform built for local hosts and Filipino travelers.
        </p>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {features.map(f => (
            <div key={f.title} className="flex flex-col items-center">
              <div className={`w-44 h-44 rounded-3xl ${f.bg} flex items-center justify-center mb-6`}>
                {f.icon}
              </div>
              <h3 className="font-lexend font-bold text-lg mb-3 text-gray-900">{f.title}</h3>
              <p className="text-gray-600 text-sm font-lexend leading-relaxed max-w-xs">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
