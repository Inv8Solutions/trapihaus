export default function Hero() {
  return (
    <section className="relative bg-gray-100">
      {/* Background Image */}
      <div
        className="h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Safe & Affordable Stays in Baguio
          </h1>
          <p className="mb-6">
            Browse verified apartments, transients, and hotels — trusted by
            students, locals, and tourists.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-full flex items-center p-2 shadow-md">
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 w-40 rounded-l-full focus:outline-none text-gray-800"
            />
            <input
              type="date"
              className="px-4 py-2 border-l border-gray-200 focus:outline-none text-gray-800"
            />
            <input
              type="date"
              className="px-4 py-2 border-l border-gray-200 focus:outline-none text-gray-800"
            />
            <input
              type="number"
              placeholder="Guests"
              className="px-4 py-2 border-l border-gray-200 focus:outline-none text-gray-800"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full ml-2">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
