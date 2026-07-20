import { NextResponse } from 'next/server';
import { contactSchema, flattenContactErrors } from '@/lib/validation';
import { deliverContactSubmission } from '@/lib/email';
import { pruneRateLimitBuckets, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
// Never statically optimize a mutation endpoint.
export const dynamic = 'force-dynamic';

/** Resolve a best-effort client identifier for rate limiting. */
function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  return `contact:${ip}`;
}

export async function POST(request: Request) {
  // Guard content type.
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ ok: false, message: 'Unsupported content type.' }, { status: 415 });
  }

  // Rate limit before doing any work.
  pruneRateLimitBuckets();
  const limit = rateLimit(clientKey(request));
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  // Parse JSON safely.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: if the hidden field is filled, accept silently without processing.
  // This avoids signalling to bots that they were detected.
  if (
    payload &&
    typeof payload === 'object' &&
    'companyWebsite' in payload &&
    typeof (payload as Record<string, unknown>).companyWebsite === 'string' &&
    (payload as Record<string, unknown>).companyWebsite !== ''
  ) {
    return NextResponse.json({ ok: true, message: 'Thank you.' }, { status: 200 });
  }

  // Validate against the shared schema (server-side source of truth).
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Please correct the highlighted fields.',
        errors: flattenContactErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  // Deliver via the configured provider abstraction.
  const result = await deliverContactSubmission(parsed.data);
  if (!result.ok) {
    // Do not leak provider internals.
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not submit your message right now. Please try again or email us directly.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { ok: true, message: 'Your inquiry has been received.' },
    { status: 200 },
  );
}

/** Reject non-POST methods explicitly. */
export function GET() {
  return NextResponse.json({ ok: false, message: 'Method not allowed.' }, { status: 405 });
}
