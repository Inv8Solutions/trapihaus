"use client";

import Navbar from "../components/layout/Navbar";

export default function PrivacyPolicy() {
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
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#1F2937]">Privacy Policy</h1>
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
              <p className="text-[#6B7280] text-base">For All Users and Guests</p>
              <p className="text-[#9CA3AF] text-sm mt-1">Last Updated: October 18, 2025</p>
            </div>

            <div className="border-t border-[#E5E7EB] mb-8"></div>

            {/* Content */}
            <div className="space-y-8 text-[#374151] leading-relaxed">
              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">1. Introduction</h2>
                <p className="mb-3">
                  Welcome to Trapihaus. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, whether as a Host or Guest. By using Trapihaus, you consent to the practices described in this Policy.
                </p>
                <p>
                  If you do not agree with the terms of this Privacy Policy, please do not access or use our Platform.
                </p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">2. Information We Collect</h2>
                <p className="mb-3">We collect several types of information to provide and improve our services:</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">2.1 Information You Provide</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>Account Information:</strong> Name, email address, phone number, and date of birth.</li>
                  <li><strong>Profile Information:</strong> Profile photo, bio, and other optional details.</li>
                  <li><strong>Payment Information:</strong> Credit/debit card details, billing address, and transaction history.</li>
                  <li><strong>Identity Verification:</strong> Government-issued ID, proof of property ownership, or business permits (for Hosts).</li>
                  <li><strong>Listing Information:</strong> Property details, photos, pricing, and availability (for Hosts).</li>
                  <li><strong>Communication Data:</strong> Messages exchanged between Hosts and Guests through the Platform.</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">2.2 Automatically Collected Information</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                  <li><strong>Usage Data:</strong> Pages viewed, time spent on the Platform, and interactions with features.</li>
                  <li><strong>Location Data:</strong> Approximate location based on IP address or GPS (with your permission).</li>
                  <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience. You can manage cookie preferences in your browser settings.</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">2.3 Information from Third Parties</h3>
                <p>We may receive information from:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Payment processors (e.g., PayPal, Stripe).</li>
                  <li>Social media platforms (if you link your account).</li>
                  <li>Identity verification services.</li>
                </ul>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">3. How We Use Your Information</h2>
                <p className="mb-3">We use your information for the following purposes:</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">3.1 To Provide and Improve Services</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Facilitate bookings and payments.</li>
                  <li>Verify identities and prevent fraud.</li>
                  <li>Provide customer support and resolve disputes.</li>
                  <li>Personalize your experience based on preferences.</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">3.2 For Communication</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Send booking confirmations, receipts, and notifications.</li>
                  <li>Respond to inquiries and provide updates.</li>
                  <li>Send promotional emails (with your consent).</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">3.3 For Legal and Security Purposes</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Comply with legal obligations and regulations.</li>
                  <li>Detect, prevent, and address fraud or security issues.</li>
                  <li>Enforce our Terms of Service and policies.</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">3.4 For Marketing and Analytics</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Analyze user behavior to improve the Platform.</li>
                  <li>Conduct market research and surveys.</li>
                  <li>Display targeted advertisements (you can opt out).</li>
                </ul>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">4. How We Share Your Information</h2>
                <p className="mb-3">We do not sell your personal information. However, we may share it in the following situations:</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">4.1 With Other Users</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Hosts can see Guest names, profile photos, and booking details.</li>
                  <li>Guests can see Host names, profile photos, and property information.</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">4.2 With Service Providers</h3>
                <p>We share information with third-party vendors who help us operate, such as:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Payment processors (e.g., PayPal, Stripe).</li>
                  <li>Cloud storage providers (e.g., AWS, Google Cloud).</li>
                  <li>Email and SMS service providers.</li>
                  <li>Analytics and advertising partners.</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">4.3 For Legal Reasons</h3>
                <p>We may disclose your information if required by law, such as:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>In response to a court order, subpoena, or legal request.</li>
                  <li>To protect the rights, property, or safety of Trapihaus, our users, or the public.</li>
                  <li>To investigate and prevent fraud or illegal activities.</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">4.4 In Business Transfers</h3>
                <p>If Trapihaus is involved in a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">5. Data Security</h2>
                <p className="mb-3">We take data security seriously and use industry-standard measures to protect your information, including:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Encryption of sensitive data (e.g., payment information).</li>
                  <li>Secure servers and firewalls.</li>
                  <li>Regular security audits and updates.</li>
                  <li>Two-factor authentication (2FA) for account protection.</li>
                </ul>
                <p className="mt-3">
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                </p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">6. Your Rights and Choices</h2>
                <p className="mb-3">You have the following rights regarding your personal information:</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.1 Access and Update</h3>
                <p>You can access and update your account information at any time through your profile settings.</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.2 Delete Your Account</h3>
                <p>You can request to delete your account by contacting us at <a href="mailto:privacy@trapihaus.com" className="text-[#1078CF] hover:underline">privacy@trapihaus.com</a>. Please note that some information may be retained for legal or legitimate business purposes.</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.3 Opt-Out of Marketing</h3>
                <p>You can unsubscribe from promotional emails by clicking the "unsubscribe" link in any email or by adjusting your notification settings.</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.4 Cookie Management</h3>
                <p>You can manage or disable cookies through your browser settings. Note that disabling cookies may affect the functionality of the Platform.</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">6.5 Data Portability</h3>
                <p>You can request a copy of your data in a machine-readable format by contacting us.</p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 7 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">7. Data Retention</h2>
                <p className="mb-3">We retain your information for as long as necessary to provide our services and comply with legal obligations. Specifically:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>Account Information:</strong> Retained until you delete your account.</li>
                  <li><strong>Transaction Records:</strong> Retained for at least 7 years for tax and accounting purposes.</li>
                  <li><strong>Communication Data:</strong> Retained for as long as necessary to resolve disputes.</li>
                  <li><strong>Cookies and Usage Data:</strong> Retained for up to 2 years unless you opt out.</li>
                </ul>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 8 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">8. International Data Transfers</h2>
                <p className="mb-3">
                  Trapihaus operates primarily in the Philippines, but we may transfer your data to other countries for processing. If we do, we will ensure that appropriate safeguards are in place to protect your information, such as:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Standard contractual clauses.</li>
                  <li>Data processing agreements with third-party vendors.</li>
                  <li>Compliance with international data protection laws (e.g., GDPR).</li>
                </ul>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 9 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">9. Children&apos;s Privacy</h2>
                <p>
                  Trapihaus is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete it immediately. If you believe a child has shared their information with us, please contact us at <a href="mailto:privacy@trapihaus.com" className="text-[#1078CF] hover:underline">privacy@trapihaus.com</a>.
                </p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 10 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">10. Third-Party Links</h2>
                <p>
                  Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 11 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">11. Changes to This Privacy Policy</h2>
                <p className="mb-3">
                  We may update this Privacy Policy from time to time. When we do, we will:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Post the updated policy on this page.</li>
                  <li>Update the "Last Updated" date at the top.</li>
                  <li>Notify you via email or through a notice on the Platform (for significant changes).</li>
                </ul>
                <p className="mt-3">
                  Your continued use of Trapihaus after changes take effect constitutes acceptance of the updated Privacy Policy.
                </p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 12 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">12. Contact Us</h2>
                <p className="mb-3">If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
                <div className="space-y-1">
                  <p><strong>Trapihaus Privacy Officer</strong></p>
                  <p>Email: <a href="mailto:privacy@trapihaus.com" className="text-[#1078CF] hover:underline">privacy@trapihaus.com</a></p>
                  <p>Phone: +63 912 456 7890</p>
                  <p>Address: Baguio City, Benguet, Philippines</p>
                </div>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 13 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">13. Compliance with Philippine Data Privacy Act</h2>
                <p className="mb-3">
                  Trapihaus complies with the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines. This law governs the collection, use, and processing of personal information. As a user, you have the right to:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Be informed about how your data is collected and used.</li>
                  <li>Access and correct your personal information.</li>
                  <li>Object to the processing of your data.</li>
                  <li>Request the deletion or blocking of your data.</li>
                  <li>File a complaint with the National Privacy Commission (NPC) if you believe your rights have been violated.</li>
                </ul>
                <p className="mt-3">
                  For more information about your rights under the Data Privacy Act, visit the National Privacy Commission website at <a href="https://www.privacy.gov.ph" className="text-[#1078CF] hover:underline" target="_blank" rel="noopener noreferrer">www.privacy.gov.ph</a>.
                </p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 14 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">14. Cookies Policy</h2>
                <p className="mb-3">Trapihaus uses cookies and similar tracking technologies to enhance your experience. Here&apos;s what you need to know:</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">What Are Cookies?</h3>
                <p>Cookies are small text files stored on your device when you visit our Platform. They help us remember your preferences and improve functionality.</p>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">Types of Cookies We Use:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for the Platform to function properly (e.g., login sessions).</li>
                  <li><strong>Performance Cookies:</strong> Help us analyze how users interact with the Platform (e.g., Google Analytics).</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences (e.g., language settings).</li>
                  <li><strong>Advertising Cookies:</strong> Used to display relevant ads based on your interests (you can opt out).</li>
                </ul>

                <h3 className="font-semibold text-[#1F2937] mt-4 mb-2">Managing Cookies:</h3>
                <p>You can control cookies through your browser settings. Disabling cookies may affect the functionality of the Platform.</p>
              </section>

              <div className="border-t border-[#E5E7EB]"></div>

              {/* Section 15 */}
              <section>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-3">15. Your Privacy Matters</h2>
                <p className="mb-3">
                  At Trapihaus, we are committed to protecting your privacy and ensuring that your personal information is handled responsibly. We encourage you to:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Review this Privacy Policy regularly to stay informed about how we use your data.</li>
                  <li>Use strong passwords and enable two-factor authentication (2FA) to secure your account.</li>
                  <li>Be cautious about sharing personal information online.</li>
                  <li>Contact us if you have any questions or concerns about your privacy.</li>
                </ul>
                <p className="mt-3">
                  Thank you for trusting Trapihaus. We value your privacy and are dedicated to providing a safe and secure platform for all users.
                </p>
              </section>

              {/* Acknowledgment */}
              <section className="bg-[#F9FAFB] p-6 rounded-lg mt-8">
                <h3 className="font-semibold text-[#1F2937] mb-3">Acknowledgment</h3>
                <p>
                  By using Trapihaus, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our practices, please discontinue use of the Platform.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
