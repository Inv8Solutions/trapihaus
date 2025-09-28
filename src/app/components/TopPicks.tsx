export default function TopPicks() {
  const listings = [
    {
      title: "Highland Accommodations",
      price: "₱3,170 / night",
      img: "/room1.jpg",
    },
    {
      title: "Pinescent Transient House",
      price: "₱2,405 / night",
      img: "/room2.jpg",
    },
    {
      title: "Session View Apartments",
      price: "₱5,000 / night",
      img: "/room3.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Top Picks for Students & Travelers
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {listings.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={item.img} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-blue-600 font-bold">{item.price}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
