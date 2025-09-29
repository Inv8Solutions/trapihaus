"use client";

export default function Footerr() {
  return (
    <footer className="bg-blue-600 text-white rounded-t-[40px]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 font-lexend">Trapihaus</h3>
            <p className="text-blue-100 font-lexend leading-relaxed mb-6">
              Your trusted hyperlocal marketplace for safe, compliant, and affordable stays in Baguio City.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-lexend">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  Browse Stays
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  List Your Property
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-lexend">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  Terms Of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-lexend">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-blue-100">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-lexend">Baguio City, Philippines</span>
              </li>
              <li className="flex items-center gap-3 text-blue-100">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-lexend">+63 912 4567 890</span>
              </li>
              <li className="flex items-center gap-3 text-blue-100">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-lexend">Trapihaus@Email.Com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-blue-500 mt-12 pt-8 text-center">
          <p className="text-blue-100 font-lexend">
            © 2024 Trapihaus. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
