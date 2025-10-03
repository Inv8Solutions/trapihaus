"use client";

import { useState } from 'react';
import Iridescence from './Iridescence';

export default function Search() {
  const [activeTab, setActiveTab] = useState('Hotels');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const tabs = ['Hotels', 'Apartments', 'Transients'];

  const handleSearch = () => {
    // Handle search logic here
    console.log({
      type: activeTab,
      location,
      checkIn,
      checkOut,
      guests
    });
  };

  return (
    <div className="bg-gray-50 py-8">
      {/* Blue Container with Iridescence Background */}
      <div className="max-w-full mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Iridescence Background - Only for blue container */}
          <div className="absolute inset-0 z-0">
            <Iridescence
              color={[0.2, 0.5, 1]}
              mouseReact={false}
              amplitude={0.1}
              speed={1.0}
            />
          </div>
          
          {/* Content inside blue container */}
          <div className="relative z-10 px-12 pt-12 pb-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-lexend">
                Find Your Perfect Stay in Baguio
              </h1>
              <p className="text-xl text-white/90 font-lexend">
                Discover safe, affordable, and compliant accommodations
              </p>
            </div>

            {/* Search Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              {/* Tabs */}
              <div className="flex mb-8">
                <div className="flex bg-gray-100 rounded-full p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 rounded-full font-medium transition-all duration-200 font-lexend ${
                        activeTab === tab
                          ? 'bg-[#1078CF] text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Location */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where are you going?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1078CF] focus:border-transparent font-lexend"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                  Check-in
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1078CF] focus:border-transparent font-lexend"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                  Check-out
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1078CF] focus:border-transparent font-lexend"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                  Guests
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1078CF] focus:border-transparent font-lexend appearance-none bg-white"
                  >
                    <option value="">Add guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1 flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-[#83C12C] hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 font-lexend shadow-lg hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}