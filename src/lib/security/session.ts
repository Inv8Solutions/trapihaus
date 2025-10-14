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
  return {
    userId: (session as any).userId || "",
    email: session.user.email,
    name: session.user.name || undefined,
  };
}
