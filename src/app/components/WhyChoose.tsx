export default function WhyChoose() {
  const items = [
    {
      title: "Safe & Compliant",
      desc: "All accommodations are verified for compliance with local regulations.",
      icon: "🛡️",
    },
    {
      title: "Verified Local Hosts",
      desc: "Connect with trusted hosts who can share authentic local experiences.",
      icon: "✅",
    },
    {
      title: "Budget-Friendly Stays",
      desc: "Find affordable stays that meet your comfort and safety needs.",
      icon: "💰",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose TrapiHaus?</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="p-6 bg-gray-50 rounded-xl shadow">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
