// Simple in-memory token bucket limiter (per-IP). Suitable for single-instance demos.
// For production, back with Redis/KV and use an edge-safe algorithm.

export type LimiterResult = { allowed: true } | { allowed: false; retryAfter: number };

export function createRateLimiter({ windowMs, max }: { windowMs: number; max: number }) {
  const buckets = new Map<string, { count: number; resetAt: number }>();

  return function check(ip: string | undefined): LimiterResult {
    const key = ip || "unknown";
    const now = Date.now();
    const current = buckets.get(key);
    if (!current || now > current.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }
    if (current.count < max) {
      current.count += 1;
      return { allowed: true };
    }
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  };
}
