"use client";

interface MissionSectionProps {
  title: string;
  paragraphs: string[];
  imagePlaceholder?: boolean;
}

export default function MissionSection({ 
  title, 
  paragraphs, 
  imagePlaceholder = true 
}: MissionSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-lexend text-[#1078CF]">
              {title}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={`text-gray-600 text-lg font-lexend leading-relaxed ${
                  index < paragraphs.length - 1 ? 'mb-6' : ''
                }`}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
          
          {imagePlaceholder && (
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-[#1078CF] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white text-4xl font-bold">T</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1078CF] font-lexend">Trapihaus</h3>
                  <p className="text-gray-600 font-lexend">Connecting Communities</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}