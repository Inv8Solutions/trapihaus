import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prefer a server-only key; fallback to NEXT_PUBLIC_* for convenience in dev
const API_KEY = process.env.FIREBASE_WEB_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString() || "";
        const password = credentials?.password?.toString() || "";
        if (!email || !password) return null;

        if (!API_KEY) {
          // Fail fast with a clear message
          throw new Error("Missing Firebase API key. Set FIREBASE_WEB_API_KEY or NEXT_PUBLIC_FIREBASE_API_KEY.");
        }

        // Sign in via Firebase Identity Toolkit REST API
        const resp = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, returnSecureToken: true }),
            // Avoid sending cookies cross-domain
            cache: "no-store",
          }
        );

        if (!resp.ok) {
          return null;
        }
        const data = (await resp.json()) as {
          localId: string;
          email: string;
          displayName?: string;
          idToken: string;
          refreshToken: string;
        };

        return {
          id: data.localId,
          email: data.email,
          name: data.displayName || data.email.split("@")[0],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as any).id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = (token as any).name as string | undefined;
        session.user.email = (token as any).email as string | undefined;
        (session as any).userId = (token as any).uid as string | undefined;
      }
      return session;
    },
  },
};
