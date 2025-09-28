"use client";
import { useState } from 'react';

interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  verified: boolean;
  type: 'apartment' | 'transient' | 'hotel';
}

const PropertyTypeTab = ({ 
  type, 
  label, 
  icon, 
  isActive, 
  onClick 
}: { 
  type: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gray-800 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {icon}
    {label}
  </button>
);

const PropertyCard = ({ listing }: { listing: Listing }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      {/* Image Container */}
      <div className="relative h-64 bg-gray-200 rounded-3xl overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&crop=center`}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-900 font-lexend">{listing.title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0 ml-3">
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-900 text-lg font-semibold">{listing.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-500 text-base font-lexend">{listing.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900 font-lexend">₱{listing.price.toLocaleString()}</span>
            <span className="text-gray-500 text-base font-lexend">per night</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 font-lexend">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TopPicks() {
  const [activeTab, setActiveTab] = useState<'apartment' | 'transient' | 'hotel'>('apartment');

  const listings: Listing[] = [
    {
      id: 1,
      title: "Highland Accommodations",
      location: "Near University of the Cordilleras",
      price: 3170,
      rating: 4.3,
      image: "/placeholder1.jpg",
      verified: true,
      type: 'apartment'
    },
    {
      id: 2,
      title: "Pinecrest Transient House",
      location: "Near Mines View Park",
      price: 2405,
      rating: 4.7,
      image: "/placeholder2.jpg",
      verified: true,
      type: 'transient'
    },
    {
      id: 3,
      title: "Session View Apartments",
      location: "Near Session Road",
      price: 5500,
      rating: 4.7,
      image: "/placeholder3.jpg",
      verified: true,
      type: 'apartment'
    },
    {
      id: 4,
      title: "Loakan Heights Residences",
      location: "Near Camp John Hay",
      price: 6300,
      rating: 4.6,
      image: "/placeholder4.jpg",
      verified: true,
      type: 'apartment'
    },
    {
      id: 5,
      title: "Sunrise Pines Lodge",
      location: "Near SM Lowa Dinagyang",
      price: 1450,
      rating: 4.8,
      image: "/placeholder5.jpg",
      verified: true,
      type: 'hotel'
    },
    {
      id: 6,
      title: "Burnham Park Residences",
      location: "Near Burnham Park",
      price: 8000,
      rating: 4.9,
      image: "/placeholder6.jpg",
      verified: true,
      type: 'apartment'
    }
  ];

  const filteredListings = listings.filter(listing => listing.type === activeTab);

  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2 font-lexend">
              Top Picks for
            </h2>
            <h3 className="text-4xl font-bold text-blue-600 font-lexend">
              Students & Travelers
            </h3>
          </div>

          {/* Property Type Tabs */}
          <div className="flex items-center gap-3">
            <PropertyTypeTab
              type="apartment"
              label="Apartment"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              isActive={activeTab === 'apartment'}
              onClick={() => setActiveTab('apartment')}
            />
            <PropertyTypeTab
              type="transient"
              label="Transient"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
              isActive={activeTab === 'transient'}
              onClick={() => setActiveTab('transient')}
            />
            <PropertyTypeTab
              type="hotel"
              label="Hotel"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              }
              isActive={activeTab === 'hotel'}
              onClick={() => setActiveTab('hotel')}
            />
            
            {/* Navigation Arrows */}
            <div className="flex items-center gap-2 ml-4">
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 text-lg">
            View All Listings
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
