"use client";

import Navbar from "../components/layout/Navbar";
import Footerr from "../components/layout/Footerr";
import AboutHero from "../components/ui/AboutHero";
import MissionSection from "../components/ui/MissionSection";
import ValuesGrid from "../components/ui/ValuesGrid";
import VisionSection from "../components/ui/VisionSection";
import ContactSection from "../components/ui/ContactSection";

export default function About() {
  // Values data
  const valuesData = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z" />
        </svg>
      ),
      title: "Safety First",
      description: "All accommodations are verified for safety standards and local compliance requirements.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16,4C18.209,4 20,5.791 20,8C20,10.209 18.209,12 16,12C13.791,12 12,10.209 12,8C12,5.791 13.791,4 16,4M16,13C18.287,13 22,14.295 22,16V18H10V16C10,14.295 13.713,13 16,13M8,4C10.209,4 12,5.791 12,8C12,8.81 11.739,9.563 11.303,10.182C9.749,9.444 8.647,8.027 8.647,6.364C8.647,4.015 6.632,2 4.283,2C1.934,2 -0.081,4.015 -0.081,6.364C-0.081,8.027 1.021,9.444 2.575,10.182C2.139,9.563 1.878,8.81 1.878,8C1.878,5.791 3.669,4 5.878,4H8M8,13C10.287,13 14,14.295 14,16V18H2V16C2,14.295 5.713,13 8,13Z" />
        </svg>
      ),
      title: "Community Focus",
      description: "Built by and for the Baguio community, supporting local hosts and visitors alike.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <span className="text-2xl font-bold">₱</span>,
      title: "Affordability",
      description: "Making quality accommodations accessible to students and budget-conscious travelers.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  // Mission content
  const missionParagraphs = [
    "Trapihaus is a hyperlocal digital marketplace designed to bridge the gap between accommodation owners and visitors seeking quality stays in Baguio City. We provide a trusted platform where students and tourists can find safe, compliant, and affordable accommodations while helping local property owners reach their target market effectively.",
    "Whether you&apos;re a student looking for budget-friendly housing near campus or a tourist seeking verified accommodations, Trapihaus makes finding your perfect stay simple and secure."
  ];

  // Vision phases
  const visionPhases = [
    {
      number: "1",
      title: "Baguio City MVP",
      description: "Validate our hyperlocal marketplace model",
      color: "text-[#1078CF]"
    },
    {
      number: "2", 
      title: "BLISST Expansion",
      description: "Expand to surrounding municipalities",
      color: "text-[#83C12C]"
    },
    {
      number: "3",
      title: "Nationwide Growth", 
      description: "Scale across Philippine destinations",
      color: "text-[#F68109]"
    }
  ];

  // Contact buttons
  const contactButtons = [
    {
      text: "Get In Touch",
      bgColor: "bg-[#83C12C]",
      hoverColor: "hover:bg-green-600"
    },
    {
      text: "List Your Property",
      bgColor: "bg-[#F68109]", 
      hoverColor: "hover:bg-orange-600"
    }
  ];

  return (
    <main className="min-h-screen bg-white max-w-full overflow-hidden">
      <Navbar />
      
      <AboutHero 
        title="About Trapihaus"
        subtitle="Your trusted hyperlocal marketplace for safe, compliant, and affordable stays in Baguio City"
      />

      <MissionSection 
        title="Our Mission"
        paragraphs={missionParagraphs}
      />

      <ValuesGrid 
        title="Our Values"
        subtitle="These core values guide everything we do at Trapihaus"
        values={valuesData}
      />

      <VisionSection 
        title="Our Vision"
        description="To become the leading accommodation marketplace for students and budget travelers across the Philippines, starting with our hyperlocal focus in Baguio City and expanding throughout the region."
        phases={visionPhases}
      />

      <ContactSection 
        title="Built for Baguio"
        description="Created by locals who understand the unique accommodation needs of students, tourists, and the Baguio community."
        buttons={contactButtons}
      />

      <Footerr />
    </main>
  );
}