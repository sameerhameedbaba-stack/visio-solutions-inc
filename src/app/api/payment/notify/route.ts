import {
  buildNotification,
  maxNotificationBodyBytes,
  type PaymentNotification,
} from '@/lib/payment-notification';

export const runtime = 'nodejs';
// A callback endpoint must never be statically optimized.
export const dynamic = 'force-dynamic';

/**
 * Instant Payment Notification (IPN) receiver for Node deployments.
 *
 * The production site is a static export on shared hosting, where this callback
 * is served by `public/payment/notify.php` instead — keep the two in step. This
 * route exists so the same URL works if the site is ever deployed to a Node
 * host (Vercel, a container, `next start`).
 *
 * The endpoint is public and unauthenticated: a recorded notification proves
 * only that something called the URL. Confirm settlement in the payment
 * provider's dashboard before releasing anything of value.
 */

/** Fixed response. The body never echoes caller input. */
function respond(status = 200, body = 'OK') {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
    },
  });
}

/** Constant-time-ish comparison for the optional shared secret. */
function secretMatches(supplied: string): boolean {
  const expected = process.env.PAYMENT_IPN_SECRET ?? '';
  if (expected === '') return true; // secret not configured
  if (supplied.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) {
    diff |= supplied.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

/** Record the notification. Console only — no provider dependency is assumed. */
function record(notification: PaymentNotification): void {
  console.info(
    `[payment-ipn] ${notification.receivedAt} ${notification.method} ` +
      `ChkID="${notification.checkId}" TransID="${notification.transactionId}" ` +
      `fields=${JSON.stringify(notification.fields)}`,
  );
}

async function handle(request: Request, method: string): Promise<Response> {
  const url = new URL(request.url);
  const entries: [string, unknown][] = [...url.searchParams.entries()];

  if (method === 'POST') {
    const declaredLength = Number(request.headers.get('content-length') ?? '0');
    if (Number.isFinite(declaredLength) && declaredLength > maxNotificationBodyBytes) {
      return respond(413, 'Payload Too Large');
    }

    const contentType = request.headers.get('content-type') ?? '';
    try {
      const raw = (await request.text()).slice(0, maxNotificationBodyBytes);
      if (raw !== '') {
        if (contentType.includes('application/json')) {
          const parsed: unknown = JSON.parse(raw);
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            entries.push(...Object.entries(parsed as Record<string, unknown>));
          }
        } else {
          entries.push(...new URLSearchParams(raw).entries());
        }
      }
    } catch {
      // An unparseable body is still acknowledged — the query string may carry
      // the identifiers, and a non-2xx would make the gateway retry forever.
    }
  }

  // The token may arrive in the query string or the body, so check the merged set.
  const supplied = entries.find(([key]) => key.toLowerCase() === 'token')?.[1];
  if (!secretMatches(typeof supplied === 'string' ? supplied : '')) {
    return respond(403, 'Forbidden');
  }

  record(buildNotification(method, entries));
  return respond();
}

export async function GET(request: Request) {
  return handle(request, 'GET');
}

export async function POST(request: Request) {
  return handle(request, 'POST');
}
