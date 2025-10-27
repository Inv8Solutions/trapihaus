import type { NextAuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// Prefer a server-only key; fallback to NEXT_PUBLIC_* for convenience in dev
const API_KEY = process.env.FIREBASE_WEB_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";

// Validate required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  console.warn(
    "[NextAuth] NEXTAUTH_SECRET is not set. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""
  );
}

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === "production") {
  console.warn(
    "[NextAuth] NEXTAUTH_URL is not set. This is required in production."
  );
}

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
      type AppToken = JWT & { uid?: string };
      const t = token as AppToken;
      if (user) {
        const u = user as Pick<User, "id" | "name" | "email">;
        t.uid = (u as { id?: string }).id;
        t.name = u.name ?? t.name;
        t.email = u.email ?? t.email;
      }
      return t;
    },
    async session({ session, token }) {
      type AppToken = JWT & { uid?: string };
      const t = token as AppToken;
      if (session.user) {
        // Narrow and set fields in-place without using any
        const su = session.user as { id?: string; name?: string | null; email?: string | null };
        su.name = (t.name as string | undefined) ?? su.name ?? undefined;
        su.email = (t.email as string | undefined) ?? su.email ?? undefined;
        su.id = t.uid ?? su.id;
      }
      return session;
    },
  },
};
