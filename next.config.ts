import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Content Security Policy: relaxed in dev to avoid breaking HMR, stricter in prod
const cspDev = [
  "default-src 'self'",
  // Allow inline scripts in dev for Next.js HMR/dev overlays. Remove in prod.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://apis.google.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://images.unsplash.com https://github.com https://firebasestorage.googleapis.com https://*.tile.openstreetmap.org https://cdnjs.cloudflare.com data: blob:",
  "font-src 'self' data:",
  // Allow websockets for HMR in dev, Firebase endpoints, and Google APIs
  "connect-src 'self' ws: wss: https://auth.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com https://firebase.googleapis.com https://www.googleapis.com https://firebasestorage.googleapis.com https://storage.googleapis.com",
  "frame-src 'self' https://accounts.google.com https://apis.google.com https://content-firebaseappcheck.googleapis.com https://trapihaus.firebaseapp.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const cspProd = [
  "default-src 'self'",
  // Allow minimal inline scripts required by Next.js runtime and Google APIs for Firebase Auth
  "script-src 'self' 'unsafe-inline' https://apis.google.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://images.unsplash.com https://github.com https://firebasestorage.googleapis.com https://ui-avatars.com https://*.tile.openstreetmap.org https://cdnjs.cloudflare.com data: blob:",
  "font-src 'self' data:",
  // Allow Firebase endpoints, Google APIs, and Firebase Storage
  "connect-src 'self' https://auth.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com https://firebase.googleapis.com https://www.googleapis.com https://firebasestorage.googleapis.com https://storage.googleapis.com",
  "frame-src 'self' https://accounts.google.com https://apis.google.com https://content-firebaseappcheck.googleapis.com https://trapihaus.firebaseapp.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: isDev ? cspDev : cspProd },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
    // Add formats for better optimization
    formats: ["image/webp", "image/avif"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      // Serve an existing asset as favicon to avoid 404s
      { source: "/favicon.ico", destination: "/logo.png" },
    ];
  },
};

export default nextConfig;
