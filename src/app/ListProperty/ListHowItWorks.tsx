"use client";

export default function ListHowItWorks() {
  const steps = [
    {
      title: 'Register for Free',
      subtitle: 'Step 1',
      desc: 'Sign up with your email and set up your host profile.',
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        </svg>
      )
    },
    {
      title: 'Create Your Listing',
      subtitle: 'Step 2',
      desc: 'Upload photos, add details, and set your price in minutes.',
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7M9 7V5a3 3 0 013-3h0a3 3 0 013 3v2" />
        </svg>
      )
    },
    {
      title: 'Get Verified',
      subtitle: 'Step 3',
      desc: "Trapihaus checks your property for safety and trust.",
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 2l7 4v6c0 5-3.6 9-9 11-5.4-2-9-6-9-11V6l7-4z" />
        </svg>
      )
    },
    {
      title: 'Start Hosting & Earning',
      subtitle: 'Step 4',
      desc: "Accept bookings, welcome guests, and enjoy reliable payouts.",
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .843-3 1.882C9 11.157 10.343 12 12 12s3 .843 3 1.882S13.657 15.764 12 15.764 9 14.92 9 13.882M12 8V6m0 9.764v2.353M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section style={{ backgroundColor: '#F6FBEA' }} className="py-16">
      <div className="max-w-full mx-auto px-6 text-center">
        <h2 className="text-[48px] font-extrabold mb-2 font-lexend">How it <span className="text-green-600">Works</span></h2>
        <p className="text-gray-600 mb-10 font-lexend text-[20px]">Get started in four simple steps</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm aspect-square flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <p className="text-sm text-orange-500 font-semibold mb-2">{s.subtitle}</p>
              <h3 className="text-lg font-bold mb-2 font-lexend">{s.title}</h3>
              <p className="text-gray-600 text-sm font-lexend leading-relaxed max-w-[220px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
