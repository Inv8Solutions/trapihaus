export default function Hero() {
  return (
    <section className="relative bg-gray-100 mt-[24px]">
      {/* Background Image */}
      <div
        className="h-[600px]  bg-cover bg-center flex items-center justify-center rounded-[40px]"
        style={{ backgroundImage: "url('/trapihaus-hero.jpg')" }}
      >
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-lexend">
            Find Safe & Affordable Stays in Baguio
          </h1>
          <p className="text-lg md:text-xl mb-12 font-lexend">
            Browse verified apartments, transients, and hotels — trusted by students, tourists, and locals.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex flex-col text-left">
                <label className="text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              
              <div className="flex flex-col text-left">
                <label className="text-sm font-semibold text-gray-700 mb-2">Check in</label>
                <input
                  type="date"
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              
              <div className="flex flex-col text-left">
                <label className="text-sm font-semibold text-gray-700 mb-2">Check out</label>
                <input
                  type="date"
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              
              <div className="flex flex-col text-left">
                <label className="text-sm font-semibold text-gray-700 mb-2">Guests</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="Add guests"
                    min="1"
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 flex-1"
                  />
                  <button className="ml-4 px-8 py-3 bg-[#83C12C] hover:bg-green-600 text-white rounded-full font-semibold shadow-lg transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
