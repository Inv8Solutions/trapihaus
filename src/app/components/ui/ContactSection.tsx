"use client";

interface ContactSectionProps {
  title: string;
  description: string;
  buttons: Array<{
    text: string;
    bgColor: string;
    hoverColor: string;
    onClick?: () => void;
  }>;
  bgColor?: string;
}

export default function ContactSection({ 
  title, 
  description, 
  buttons,
  bgColor = "bg-gray-50" 
}: ContactSectionProps) {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-lexend text-[#1078CF]">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lexend">
            {description}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-lexend text-[#1078CF]">Contact Us</h3>
            <p className="text-gray-600 font-lexend mb-6">
              Have questions about Trapihaus or want to list your property? 
              We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {buttons.map((button, index) => (
                <button 
                  key={index}
                  onClick={button.onClick}
                  className={`${button.bgColor} ${button.hoverColor} text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 font-lexend`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}