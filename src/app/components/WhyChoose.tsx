"use client";
import { useState, useEffect } from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  hasConnector?: boolean;
  connectorColor?: string;
  index: number;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  bgColor, 
  iconColor, 
  hasConnector, 
  connectorColor,
  index 
}: FeatureProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`flex flex-col items-center text-center transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className={`w-32 h-32 ${bgColor} rounded-3xl flex items-center justify-center mb-8 relative 
        hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl`}>
        <div className={`${iconColor} transition-all duration-300`}>
          {icon}
        </div>
        
        {hasConnector && (
          <ConnectorLine color={connectorColor || '#83C12C'} />
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-black mb-4 font-lexend hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-500 font-lexend leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
};

const ConnectorLine = ({ color }: { color: string }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hidden md:block absolute left-full top-1/2 w-64 h-32 -translate-y-1/2 z-10">
      <svg className="w-full h-full" viewBox="0 0 256 128" fill="none">
        {/* Main curved path that fully reaches the next card */}
        <path
          d="M16 64 Q128 24 240 64"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
          className={`transition-all duration-1000 ${
            animate ? 'stroke-dashoffset-0' : 'stroke-dashoffset-64'
          }`}
        />
        
        {/* Dots along the curve */}
        <circle 
          cx="64" 
          cy="48" 
          r="3" 
          fill={color} 
          className={`transition-all duration-300 delay-500 ${
            animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`} 
        />
        <circle 
          cx="128" 
          cy="36" 
          r="3" 
          fill={color} 
          className={`transition-all duration-300 delay-700 ${
            animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`} 
        />
        <circle 
          cx="192" 
          cy="48" 
          r="3" 
          fill={color} 
          className={`transition-all duration-300 delay-900 ${
            animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`} 
        />
      </svg>
    </div>
  );
};

const ShieldIcon = () => (
  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
  </svg>
);

const PesoIcon = () => (
  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
    <span className="text-white font-bold text-2xl">₱</span>
  </div>
);

const SectionHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <h2 className="text-4xl md:text-5xl font-bold text-[#1078CF] mb-6 font-lexend">
        Why Choose Trapihaus?
      </h2>
      <p className="text-gray-500 text-lg font-lexend">
        We're dedicated to providing safe, affordable, and verified accommodations for everyone visiting Baguio City
      </p>
    </div>
  );
};

export default function WhyChoose() {
  const features = [
    {
      icon: <ShieldIcon />,
      title: "Safe & Compliant",
      description: "All accommodations are verified for safety standards and local compliance requirements.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      hasConnector: true,
      connectorColor: "#83C12C"
    },
    {
      icon: <CheckIcon />,
      title: "Verified Local Hosts",
      description: "Connect with trusted local hosts who know Baguio City and care about your experience.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      hasConnector: true,
      connectorColor: "#F68109"
    },
    {
      icon: <PesoIcon />,
      title: "Budget-Friendly Stays",
      description: "Find accommodations that fit your budget without sacrificing comfort and safety.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hasConnector: false
    }
  ];

  return (
    <section className="py-20 bg-white text-center px-6">
      <SectionHeader />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 items-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
              hasConnector={feature.hasConnector}
              connectorColor={feature.connectorColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
