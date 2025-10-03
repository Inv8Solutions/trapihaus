"use client";

import { useState } from 'react';

// Custom styles for the slider
const sliderStyles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    wi  return (
    <div className="bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <div className="max-w-7xl mx-auto px-6 pb-8">: 24px;
    height: 24px;
    border-radius: 50%;
    background: #83C12C;
    border: 4px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #83C12C;
    border: 4px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: none;
  }
`;

interface AccommodationCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  verified: boolean;
}

const AccommodationCard = ({ name, location, price, currency, rating, image, verified }: AccommodationCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        {verified && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ✓ Verified
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 font-lexend">{name}</h3>
          <div className="flex items-center text-yellow-500">
            <span className="text-sm mr-1">⭐</span>
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 font-lexend">📍 {location}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900 font-lexend">₱{price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm ml-1">per night</span>
          </div>
          <button className="bg-[#1078CF] hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200 font-lexend">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Accommodation() {
  const [selectedPropertyType, setSelectedPropertyType] = useState('Hotel');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rooms, setRooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [bookingOptions, setBookingOptions] = useState<string[]>([]);

  const accommodations = [
    {
      id: '1',
      name: 'Loakan Heights Residences',
      location: 'Near Police Station',
      price: 6300,
      currency: 'PHP',
      rating: 4.6,
      image: '/hotel1.jpg',
      verified: true
    },
    {
      id: '2',
      name: 'Sunrise Pines Lodge',
      location: 'Near Saint Louis University',
      price: 1450,
      currency: 'PHP',
      rating: 4.8,
      image: '/hotel2.jpg',
      verified: true
    },
    {
      id: '3',
      name: 'Loakan Heights Residences',
      location: 'Near Police Station',
      price: 6300,
      currency: 'PHP',
      rating: 4.6,
      image: '/hotel1.jpg',
      verified: true
    },
    {
      id: '4',
      name: 'Sunrise Pines Lodge',
      location: 'Near Saint Louis University',
      price: 1450,
      currency: 'PHP',
      rating: 4.8,
      image: '/hotel2.jpg',
      verified: true
    },
    {
      id: '5',
      name: 'Loakan Heights Residences',
      location: 'Near Police Station',
      price: 6300,
      currency: 'PHP',
      rating: 4.6,
      image: '/hotel1.jpg',
      verified: true
    },
    {
      id: '6',
      name: 'Sunrise Pines Lodge',
      location: 'Near Saint Louis University',
      price: 1450,
      currency: 'PHP',
      rating: 4.8,
      image: '/hotel2.jpg',
      verified: true
    }
  ];

  const propertyTypes = ['Hotel', 'Apartment', 'Transient'];
  const amenities = [
    { name: 'Wi-Fi', icon: '📶' },
    { name: 'Parking', icon: '🅿️' },
    { name: 'Pool', icon: '🏊' },
    { name: 'Air Conditioning', icon: '❄️' },
    { name: 'Heating', icon: '🔥' },
    { name: 'Pet Friendly', icon: '🐕' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'TV', icon: '📺' },
    { name: 'Refrigerator', icon: '🧊' },
    { name: 'Hot tub', icon: '🛁' },
    { name: 'Washing Machine', icon: '🧺' },
    { name: 'Breakfast', icon: '🍳' },
    { name: 'Room service', icon: '🛎️' }
  ];
  const ratings = [5, 4, 3, 2, 1];
  const bookingOptionsList = ['Instant Booking', 'Free Cancellation', 'Online Payment', 'Early check-in available'];

  const toggleAmenity = (amenityName: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityName) 
        ? prev.filter(a => a !== amenityName)
        : [...prev, amenityName]
    );
  };

  const toggleBookingOption = (option: string) => {
    setBookingOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="max-full mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Results Section */}
          <div className="lg:col-span-3 lg:order-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[40px] font-extrabold text-[#1078CF] font-lexend">6 accommodations found</h1>
                <p className="text-[#9E9E9E] font-lexend text-[24px]">Stays in Baguio City with trusted local hosts</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-lexend">
                  📋 List
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-lexend">
                  🗺️ Map
                </button>
              </div>
            </div>

            {/* Accommodations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accommodations.map((accommodation) => (
                <AccommodationCard key={accommodation.id} {...accommodation} />
              ))}
            </div>
          </div>

          {/* Filters Sidebar */}
          <div className="lg:col-span-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 font-lexend">Filter by:</h2>
              
              {/* Property Type */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 font-lexend">Property Type</h3>
                <div className="grid grid-cols-3 gap-2">
                  {propertyTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedPropertyType(type)}
                      className={`px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 font-lexend ${
                        selectedPropertyType === type
                          ? 'bg-[#83C12C] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 font-lexend">Your Budget For Per Night</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #83C12C 0%, #83C12C ${(priceRange[1] / 10000) * 100}%, #e5e7eb ${(priceRange[1] / 10000) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#83C12C] rounded-full border-4 border-white shadow-lg pointer-events-none"
                      style={{ left: `calc(${(priceRange[1] / 10000) * 100}% - 12px)` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Min Price ₱"
                        value={priceRange[0] || ''}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-lexend placeholder-gray-400 focus:ring-2 focus:ring-[#83C12C] focus:border-transparent"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Max Price ₱"
                        value={priceRange[1] || ''}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-lexend placeholder-gray-400 focus:ring-2 focus:ring-[#83C12C] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rooms, Beds, Bathrooms */}
              <div className="mb-6 space-y-4">
                {[
                  { label: 'Rooms', value: rooms, setter: setRooms },
                  { label: 'Beds', value: beds, setter: setBeds },
                  { label: 'Bathrooms', value: bathrooms, setter: setBathrooms }
                ].map(({ label, value, setter }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold font-lexend">{label}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setter(Math.max(0, value - 1))}
                          className="w-10 h-10 border border-gray-300 rounded-[10px] flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-lexend">{value}</span>
                        <button
                          onClick={() => setter(value + 1)}
                          className="w-10 h-10 border border-gray-300 rounded-[10px] flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 font-lexend">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map(amenity => (
                    <button
                      key={amenity.name}
                      onClick={() => toggleAmenity(amenity.name)}
                      className={`flex items-center gap-2 px-3 py-3 rounded-full text-sm font-medium transition-all duration-200 font-lexend ${
                        selectedAmenities.includes(amenity.name)
                          ? 'bg-[#83C12C] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-base">{amenity.icon}</span>
                      <span className="truncate">{amenity.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 font-lexend">Minimum Rating</h3>
                <div className="space-y-2">
                  {ratings.map(rating => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={minRating === rating}
                        onChange={(e) => setMinRating(parseInt(e.target.value))}
                        className="mr-3 text-[#1078CF]"
                      />
                      <div className="flex items-center">
                        <span className="font-lexend">{rating} stars</span>
                        <span className="ml-2 text-yellow-500">{'⭐'.repeat(rating)}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Booking Options */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 font-lexend">Booking Options</h3>
                <div className="grid grid-cols-1 gap-2">
                  {bookingOptionsList.map(option => (
                    <button
                      key={option}
                      onClick={() => toggleBookingOption(option)}
                      className={`px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 font-lexend text-left ${
                        bookingOptions.includes(option)
                          ? 'bg-[#83C12C] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
