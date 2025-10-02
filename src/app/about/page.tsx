"use client";

import Navbar from "../components/Navbar";
import Footerr from "../components/Footerr";

export default function About() {
  return (
    <main className="min-h-screen bg-white max-w-full overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-white mt-[24px] mb-20">
        <div className="h-[400px] bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center rounded-[40px] relative overflow-hidden mx-[24px]">
          <div className="text-center text-white max-w-4xl px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-lexend">
              About Trapihaus
            </h1>
            <p className="text-lg md:text-xl font-lexend">
              Your trusted hyperlocal marketplace for safe, compliant, and affordable stays in Baguio City
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-lexend text-[#1078CF]">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg mb-6 font-lexend leading-relaxed">
                Trapihaus is a hyperlocal digital marketplace designed to bridge the gap between accommodation 
                owners and visitors seeking quality stays in Baguio City. We provide a trusted platform where 
                students and tourists can find safe, compliant, and affordable accommodations while helping 
                local property owners reach their target market effectively.
              </p>
              <p className="text-gray-600 text-lg font-lexend leading-relaxed">
                Whether you&apos;re a student looking for budget-friendly housing near campus or a tourist 
                seeking verified accommodations, Trapihaus makes finding your perfect stay simple and secure.
              </p>
            </div>
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
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-lexend text-[#1078CF]">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lexend">
              These core values guide everything we do at Trapihaus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Safety First */}
            <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-lexend">Safety First</h3>
              <p className="text-gray-600 font-lexend">
                All accommodations are verified for safety standards and local compliance requirements.
              </p>
            </div>

            {/* Community Focus */}
            <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16,4C18.209,4 20,5.791 20,8C20,10.209 18.209,12 16,12C13.791,12 12,10.209 12,8C12,5.791 13.791,4 16,4M16,13C18.287,13 22,14.295 22,16V18H10V16C10,14.295 13.713,13 16,13M8,4C10.209,4 12,5.791 12,8C12,8.81 11.739,9.563 11.303,10.182C9.749,9.444 8.647,8.027 8.647,6.364C8.647,4.015 6.632,2 4.283,2C1.934,2 -0.081,4.015 -0.081,6.364C-0.081,8.027 1.021,9.444 2.575,10.182C2.139,9.563 1.878,8.81 1.878,8C1.878,5.791 3.669,4 5.878,4H8M8,13C10.287,13 14,14.295 14,16V18H2V16C2,14.295 5.713,13 8,13Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-lexend">Community Focus</h3>
              <p className="text-gray-600 font-lexend">
                Built by and for the Baguio community, supporting local hosts and visitors alike.
              </p>
            </div>

            {/* Affordability */}
            <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-orange-600 font-bold text-2xl">₱</span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-lexend">Affordability</h3>
              <p className="text-gray-600 font-lexend">
                Making quality accommodations accessible to students and budget-conscious travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-lexend text-[#1078CF]">
              Our Vision
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 text-lg mb-8 font-lexend leading-relaxed">
                To become the leading accommodation marketplace for students and budget travelers across the Philippines, 
                starting with our hyperlocal focus in Baguio City and expanding throughout the region.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1078CF] mb-2 font-lexend">Phase 1</div>
                  <h4 className="text-lg font-semibold mb-2 font-lexend">Baguio City MVP</h4>
                  <p className="text-gray-600 text-sm font-lexend">Validate our hyperlocal marketplace model</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#83C12C] mb-2 font-lexend">Phase 2</div>
                  <h4 className="text-lg font-semibold mb-2 font-lexend">BLISST Expansion</h4>
                  <p className="text-gray-600 text-sm font-lexend">Expand to surrounding municipalities</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F68109] mb-2 font-lexend">Phase 3</div>
                  <h4 className="text-lg font-semibold mb-2 font-lexend">Nationwide Growth</h4>
                  <p className="text-gray-600 text-sm font-lexend">Scale across Philippine destinations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-lexend text-[#1078CF]">
              Built for Baguio
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lexend">
              Created by locals who understand the unique accommodation needs of students, tourists, 
              and the Baguio community.
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
                <button className="bg-[#83C12C] hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 font-lexend">
                  Get In Touch
                </button>
                <button className="bg-[#F68109] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 font-lexend">
                  List Your Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footerr />
    </main>
  );
}