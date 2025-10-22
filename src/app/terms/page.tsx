"use client";

import Navbar from "../components/layout/Navbar";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F5F5] font-lexend pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#DBEAFE] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#1078CF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#1F2937]">Terms of Service</h1>
                </div>
              </div>
              <button className="flex items-center gap-2 h-10 px-4 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                <svg className="w-4 h-4 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium text-[#374151]">Print</span>
              </button>
            </div>

            <div className="mb-8">
              <p className="text-[#6B7280] text-base">Trapihaus Host Agreement</p>
              <p className="text-[#9CA3AF] text-sm mt-1">Last Updated: October 18, 2025</p>
            </div>

            <div className="border-t border-[#E5E7EB] mb-8"></div>

        {/* Content */}
        <div className="space-y-8 text-[#374151] leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">1. Acceptance of Terms</h2>
            <p className="mb-3">
              Welcome to Trapihaus (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing and using the Trapihaus platform as a property host, you agree to comply with and be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with any part of these Terms, you may not use our platform.
            </p>
            <p>
              If you use our agree to these Terms, you also use our service as our our terms by creating an account and listing your property. Trapihaus provides a marketplace for short-term rental properties in Baguio, Philippines, and takes compliance with local laws seriously.
            </p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">2. Definitions</h2>
            <div className="space-y-2">
              <p><strong>&quot;Platform&quot;:</strong></p>
              <p className="ml-4">Means the Trapihaus website, mobile application, and all related services.</p>
              
              <p className="mt-3"><strong>&quot;Host&quot;:</strong></p>
              <p className="ml-4">Refers to any person or entity creating a listing, offering a property for booking through the Platform.</p>
              
              <p className="mt-3"><strong>&quot;Guest&quot;:</strong></p>
              <p className="ml-4">Means any individual who books or intent for a Listing.</p>
              
              <p className="mt-3"><strong>&quot;Booking&quot;:</strong></p>
              <p className="ml-4">Means the confirmed reservation made through the Platform.</p>
              
              <p className="mt-3"><strong>&quot;Service Fee&quot;:</strong></p>
              <p className="ml-4">Refers to the fee charged by Trapihaus for use of the Platform, currently set at 15% of the booking subtotal.</p>
            </div>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">3. Eligibility</h2>
            <p>You must meet the following requirements to use our service:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Be at least 18 years of age.</li>
              <li>Have the legal capacity to enter into a binding contract.</li>
              <li>Possess proper authorization to rent the property you list.</li>
              <li>Comply with all applicable laws and regulations in Baguio City, Philippines.</li>
              <li>Maintain valid and up-to-date contact information associated to Trapihaus.</li>
            </ul>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">4. Host Responsibilities</h2>
            
            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">4.1 Listing Accuracy</h3>
            <p>You must provide accurate, complete, and up-to-date information about your Listing, including:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Property details</li>
              <li>Amenities and features</li>
              <li>Availability and pricing</li>
              <li>House rules and restrictions</li>
              <li>Trapihaus reserves the right to remove or modify any listing that is inaccurate, misleading, or violates these Terms.</li>
            </ul>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">4.2 Property Standards</h3>
            <p>As a Host, you must ensure that your Listing:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Meets all safety requirements, and is in good working condition.</li>
              <li>Matches the description, photos, and amenities listed on the Platform.</li>
              <li>Has clean bedding, functioning, and heating systems.</li>
            </ul>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">4.3 Guest Communication</h3>
            <p>You are required to:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Respond promptly to all inquiries and guest requests within 24 hours and exercise professional conduct at all times.</li>
            </ul>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">5. Bookings and Reservations</h2>
            
            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">5.1 Booking Requests</h3>
            <p>When a Guest submits a booking request, either 24 hours, Failure to respond may result in penalties, including suspension of your account.</p>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">5.2 Honoring Reservations</h3>
            <p>Once you confirm a booking, you must honor that the reservation. Cancellations (a confirmed booking may result in)</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Penalties</li>
              <li>Reduced visibility of your listing</li>
              <li>Account suspension or termination</li>
              <li>Liability for guest rebooking costs</li>
            </ul>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">5.3 Check-In and Check-Out</h3>
            <p>You must:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Clearly state check-in and check-out times.</li>
              <li>You must clearly communicate check-in and check-out procedures to Guests and be available to address any questions or concerns during their stay.</li>
            </ul>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">6. Payments and Fees</h2>
            
            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.1 Service Fee</h3>
            <p>Trapihaus charges a service fee of 15% on all confirmed bookings. This fee is automatically deducted from your payout and covers:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Platform use</li>
              <li>Payment processing</li>
              <li>Customer support</li>
              <li>Platform maintenance and development</li>
              <li>Marketing and promotion</li>
              <li>Regulatory compliance assistance</li>
            </ul>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.2 Payout Schedule</h3>
            <p>Payments are typically processed within 24-48 hours after a Guest has checked-in at or stays at your selected payout schedule using method. However, there may be delays due to:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Bank processing times</li>
              <li>Pending disputes or claims</li>
              <li>Verification issues</li>
              <li>Non-conformance to payout criteria</li>
            </ul>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.3 Taxes</h3>
            <p className="mt-4">You are responsible for determining, collecting, and filing your tax obligations, including income tax, business tax, and value-added tax (VAT) as applicable. Trapihaus is not responsible for withholding or remitting any taxes on your behalf unless required by law.</p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">7. Cancellation Policy</h2>
            <p>Trapihaus offers the following cancellation policies for your Listing:</p>
            
            <div className="mt-3">
              <p className="font-semibold">Flexible</p>
              <p className="ml-4">Guests can get a full refund if they cancel at least 24 hours before check-in.</p>
            </div>

            <div className="mt-3">
              <p className="font-semibold">Moderate</p>
              <p className="ml-4">Guests can get a full refund if they cancel at least 5 days before check-in.</p>
            </div>

            <div className="mt-3">
              <p className="font-semibold">Strict</p>
              <p className="ml-4">Guests can only get a 50% refund if they cancel at least 7 days before check-in.</p>
            </div>

            <p className="mt-4">You can select the cancellation policy that best fits your preference.</p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">8. Insurance and Liability</h2>
            
            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">8.1 Host Liability</h3>
            <p>Trapihaus provides a Host Guarantee of up to ₱500,000.00 for property damage caused by Guests. This is a secondary coverage and does not substitute proper insurance. Guests have the duty to have adequate insurance to cover all liabilities arising from hosting activities.</p>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">8.2 Guest Safety</h3>
            <p>You must disclose known safety or security hazards on or around your property. We strongly recommend maintaining liability insurance for short-term rentals.</p>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">8.3 Limitation of Liability</h3>
            <p>Trapihaus is not liable for any damages, losses, or disputes arising from your property listing. You agree to indemnify and hold harmless Trapihaus and its officers for any claims brought by Guests or third parties.</p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">9. Prohibited Activities</h2>
            <p>Hosts may not:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>List properties they do not own, rent, or have permission to sublet.</li>
              <li>Discriminate against Guests based on race, religion, national origin, disability, sex, gender identity, sexual orientation, or age.</li>
              <li>Request or accept payment outside the Trapihaus platform.</li>
              <li>List properties that do not comply with local zoning, health, and safety regulations.</li>
              <li>Engage in fraudulent, misleading, or deceptive practices.</li>
              <li>Harass, threaten, or harm Guests or other users.</li>
              <li>Use the Platform for illegal activities or purposes.</li>
              <li>Use the Platform for the illegal activities.</li>
            </ul>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">10. Account Termination</h2>
            
            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">10.1 Termination by You</h3>
            <p>You may terminate your account at any time through your account settings. You must fulfill all pending reservations before account closure.</p>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">10.2 Termination by Trapihaus</h3>
            <p>We reserve the right to suspend or terminate your account if you:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Violate these Terms of Service.</li>
              <li>Engage in fraudulent or illegal activities.</li>
              <li>Receive multiple complaints from Guests.</li>
              <li>Fail to maintain acceptable standards.</li>
            </ul>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">11. Privacy and Data Protection</h2>
            <p>Your use of the Platform is subject to our Privacy Policy. By using Trapihaus, you consent to our collection, use, and sharing of your personal information as described in our Privacy Policy.</p>
            <p className="mt-3">We take data security seriously and implement industry-standard measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">12. Dispute Resolution</h2>
            
            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">12.1 Resolution Center</h3>
            <p>In the event of a dispute with a Guest, you may file a claim or request for resolution of complaints, you must use our Resolution Center to report the dispute within 48 hours of check-out or the incident.</p>

            <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">12.2 Mediation and Arbitration</h3>
            <p>If a dispute cannot be resolved through our Resolution Center, both parties agree to participate in mediation. If mediation fails, disputes will be resolved through binding arbitration in accordance with Philippine law.</p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">13. Governing Law</h2>
            <p>These Terms are governed by the laws of the Philippines. By using our Platform, you agree that any legal action or dispute will be brought exclusively in the courts of Baguio City, Philippines.</p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 14 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">14. Changes to Terms</h2>
            <p>Trapihaus reserves the right to modify these Terms at any time. We will notify you of significant changes via email or through a notice on the Platform. Continued use of the Platform after changes take effect constitutes acceptance of the new Terms.</p>
            <p className="mt-3">We may also change, delete, or update features or any part, from or at any time. You will be notified changes via the email address registered to your account. In case changes, no refund will be given if you opt to discontinue service after the change.</p>
          </section>

          <div className="border-t border-[#E5E7EB]"></div>

          {/* Section 15 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">15. Contact Information</h2>
            <p>If you have any questions or concerns about these Terms, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p><strong>Trapihaus</strong></p>
              <p>Address: Baguio City, Benguet, Philippines</p>
              <p>Phone: +63 912 456 7890</p>
              <p>Email: Trapihaus@Email.Com</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-[#F9FAFB] p-6 rounded-lg mt-8">
            <h3 className="font-semibold text-[#1F2937] mb-3">Acknowledgment</h3>
            <p>By clicking &quot;I Agree&quot; or by listing a property on Trapihaus, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. You also acknowledge that you have reviewed our Privacy Policy and agree to its terms.</p>
          </section>
        </div>
          </div>
        </div>
      </div>
    </>
  );
}
