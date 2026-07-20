import { describe, expect, it } from 'vitest';
import { rateLimit } from '@/lib/rate-limit';

describe('rateLimit', () => {
  it('allows up to the limit then blocks within a window', () => {
    const key = 'test:1.2.3.4';
    const now = 1_000_000;
    const results = [];
    for (let i = 0; i < 6; i += 1) {
      results.push(rateLimit(key, now));
    }
    // First five allowed, sixth blocked.
    expect(results.slice(0, 5).every((r) => r.ok)).toBe(true);
    expect(results[5]!.ok).toBe(false);
    expect(results[5]!.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('resets after the window elapses', () => {
    const key = 'test:5.6.7.8';
    const start = 2_000_000;
    for (let i = 0; i < 5; i += 1) rateLimit(key, start);
    const blocked = rateLimit(key, start);
    expect(blocked.ok).toBe(false);
    const afterWindow = rateLimit(key, start + 61_000);
    expect(afterWindow.ok).toBe(true);
  });
});
