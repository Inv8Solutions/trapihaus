"use client";

import Navbar from "../components/layout/Navbar";
import Footerr from "../components/layout/Footerr";
import AboutHero from "../components/ui/AboutHero";
import WhoWeAre from "../components/ui/WhoWeAre";
import MissionVision from "../components/ui/MissionVision";
import Cats from "../components/sections/Cats";
import HowItWorks from "../components/sections/HowItWorks";
import JoinUs from "../components/sections/JoinUs";
import Discover from "../components/ui/Discover";

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
    "Trapihaus started in Baguio with a simple idea: make local stays safer, more affordable, and compliant for everyone — from students to tourists.",
    "We recognized that students and travelers needed trustworthy accommodation options, while local hosts wanted a reliable platform to offer their spaces. Our hyperlocal approach ensures we understand the unique needs of the Baguio community.",
    "Today, we're building bridges between those who need quality accommodations and those who provide them, creating a sustainable ecosystem that benefits everyone."
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
        subtitle="Building safe, affordable, and compliant stays for students and travelers in Baguio and beyond."
      />

      <WhoWeAre 
        title="Our Mission"
        paragraphs={missionParagraphs}
      />

      <MissionVision 
        missionText="To connect travelers with safe and affordable accommodations while supporting compliant local hosts. We strive to create a marketplace where trust, transparency, and community values are at the forefront of every interaction."
        visionText="To become the most trusted local accommodation marketplace across the Philippines. We envision a future where every Filipino city has access to our platform, connecting quality accommodations with travelers while fostering economic growth in local communities."
        missionImage="/mission.jpg"
        visionImage="/vision.jpg"
      />

      <Cats />

      <HowItWorks />

      <Discover />

      <JoinUs />

      <Footerr />
    </main>
  );
}