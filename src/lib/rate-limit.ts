// Simple token bucket / sliding window rate limiter
// Supports Upstash Redis REST if configured, otherwise falls back to in-memory rate limiting.

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const memoryStore = new Map<string, { count: number; expiresAt: number }>();

export async function checkRateLimit(
  identifier: string,
  limit = 5,
  windowSeconds = 60
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const key = `ratelimit:rsvp:${identifier}`;
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, windowSeconds],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const count = data[0]?.result || 1;
        return {
          success: count <= limit,
          limit,
          remaining: Math.max(0, limit - count),
          reset: Date.now() + windowSeconds * 1000,
        };
      }
    } catch (err) {
      console.warn("Upstash rate limit error, falling back to memory:", err);
    }
  }

  // In-memory fallback
  const now = Date.now();
  const record = memoryStore.get(identifier);

  if (!record || now > record.expiresAt) {
    memoryStore.set(identifier, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowSeconds * 1000,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: record.expiresAt,
    };
  }

  record.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - record.count,
    reset: record.expiresAt,
  };
}
