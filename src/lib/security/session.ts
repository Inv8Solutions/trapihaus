import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export type Session =
  | {
      userId: string;
      email: string;
      name?: string;
    }
  | null;

export async function getServerSession(): Promise<Session> {
  const session = await nextAuthGetServerSession(authOptions);
  if (!session || !session.user?.email) return null;
  const s = session as typeof session & { userId?: string };
  return {
    userId: s.userId || "",
    email: session.user.email,
    name: session.user.name || undefined,
  };
}
