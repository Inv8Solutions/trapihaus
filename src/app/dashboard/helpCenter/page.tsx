"use client";

import { useState } from "react";

export default function HelpCenter() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create my first listing?",
      answer: 'To create your first listing, click on the "+ Add New Property" button in the sidebar or on your dashboard. Fill in the required information including property details, amenities, pricing, and upload high-quality photos. Once submitted, our team will review it within 24 hours.',
    },
    {
      question: "What documents do I need to host on Trapihaus?",
      answer: "You'll need a valid government-issued ID, proof of property ownership or authorization to rent, and your Tax Identification Number (TIN). For properties operating as a business, you may also need a business permit.",
    },
    {
      question: "How long does verification take?",
      answer: "Account verification typically takes 1-2 business days. Property listing verification takes up to 24 hours. You'll receive email notifications at each step of the verification process.",
    },
    {
      question: "Is there a fee to list my property?",
      answer: "Listing your property on Trapihaus is completely free. We only charge a 15% service fee on confirmed bookings, which is automatically deducted from your payouts.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 font-lexend">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-1">Help Center</h1>
        <p className="text-sm text-[#6B7280]">Find answers, guides, and support for hosting on Trapihaus</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Search for help articles, guides, or FAQs..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#1F2937] outline-none focus:border-[#1078CF] transition-colors"
          />
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Live Chat Support */}
        <button className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#1078CF] transition-colors text-left group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1078CF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#1078CF] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1F2937] mb-1">Live Chat Support</h3>
          <p className="text-sm text-[#6B7280] mb-3">Chat with our support team</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
            <span className="text-xs text-[#10B981] font-medium">Online now</span>
          </div>
        </button>

        {/* Call Us */}
        <button className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#10B981] transition-colors text-left group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#10B981] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1F2937] mb-1">Call Us</h3>
          <p className="text-sm text-[#6B7280] mb-3">+63 912 334 1243</p>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-[#6B7280]">24/7 Support</span>
          </div>
        </button>

        {/* Email Support */}
        <button className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#F68109] transition-colors text-left group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#F68109]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#F68109] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1F2937] mb-1">Email Support</h3>
          <p className="text-sm text-[#6B7280] mb-3">support@trapihaus.com</p>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-[#6B7280]">Reply within 24h</span>
          </div>
        </button>
      </div>

      {/* Getting Started Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#1078CF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-[#1F2937]">Getting Started</h2>
            <p className="text-sm text-[#6B7280]">4 articles</p>
          </div>
          <svg className="w-5 h-5 text-[#9CA3AF] ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#E5E7EB] last:border-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className="font-medium text-[#1F2937] text-sm group-hover:text-[#1078CF] transition-colors">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#6B7280] transition-transform duration-200 ${
                    expandedFAQ === index ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {expandedFAQ === index && (
                <div className="pb-4 pr-8">
                  <p className="text-sm text-[#6B7280] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Still Need Help Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#1078CF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-semibold text-[#1F2937] text-lg mb-2">Still need help?</h3>
        <p className="text-sm text-[#6B7280] mb-6 max-w-md mx-auto">
          Our support team is here to help you succeed as a host on Trapihaus. Get in touch and we&apos;ll respond as soon as possible.
        </p>
        <button className="h-11 px-6 rounded-lg bg-[#1078CF] text-white text-sm font-medium hover:bg-[#0e6dbb] transition-colors inline-flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Send Email
        </button>
      </div>
    </div>
  );
}
