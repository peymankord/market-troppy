// ══════════════════════════════════════════════════
// Rate Limiting سبک (In-Memory Sliding Window)
// نکته: در Production چند-نمونه‌ای از Upstash Redis استفاده کنید
// ══════════════════════════════════════════════════

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

// پاک‌سازی دوره‌ای حافظه (هر ۱۰ دقیقه)
const GC_INTERVAL = 10 * 60 * 1000;
declare global {
  // eslint-disable-next-line no-var
  var __rateLimitGc: ReturnType<typeof setInterval> | undefined;
}
if (!globalThis.__rateLimitGc) {
  globalThis.__rateLimitGc = setInterval(() => {
    const now = Date.now();
    buckets.forEach((bucket, key) => {
      if (bucket.resetAt < now) buckets.delete(key);
    });
  }, GC_INTERVAL);
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - bucket.count };
}

/** استخراج IP کلاینت از هدرهای ریکوئست */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
