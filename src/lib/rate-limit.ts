/**
 * Lightweight in-memory rate limiter (fixed window) for the contact endpoint.
 *
 * This is a pragmatic default that works on a single instance. It is documented
 * in LAUNCH_CHECKLIST.md that a distributed store (e.g. Upstash Redis) is
 * required for horizontally scaled or serverless deployments where memory is not
 * shared across instances. It never throws and never blocks legitimately.
 */
interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5; // per window per key

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, now = Date.now()): RateLimitResult {
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - existing.count, retryAfterSeconds: 0 };
}

/** Best-effort cleanup so the map does not grow unbounded. Called opportunistically. */
export function pruneRateLimitBuckets(now = Date.now()): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}
