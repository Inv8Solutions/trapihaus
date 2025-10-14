// Placeholder session utilities.
// Later you can integrate NextAuth or Firebase Admin. Keep server-only secrets off the client.

export type Session = {
  userId: string;
  email: string;
  name?: string;
} | null;

// Example: read a session from cookies or headers on the server.
export async function getServerSession(): Promise<Session> {
  // TODO: integrate with NextAuth, Firebase Admin, or your auth of choice.
  // For now, always return null (unauthenticated).
  return null;
}
