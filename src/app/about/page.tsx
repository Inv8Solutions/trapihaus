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
import Lastt from "../components/sections/Lastt";

export default function About() {

  // Mission content
  const missionParagraphs = [
    "Trapihaus started in Baguio with a simple idea: make local stays safer, more affordable, and compliant for everyone — from students to tourists.",
    "We recognized that students and travelers needed trustworthy accommodation options, while local hosts wanted a reliable platform to offer their spaces. Our hyperlocal approach ensures we understand the unique needs of the Baguio community.",
    "Today, we're building bridges between those who need quality accommodations and those who provide them, creating a sustainable ecosystem that benefits everyone."
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
      <Lastt />
      <Footerr />
    </main>
  );
}