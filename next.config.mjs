/** @type {import('next').NextConfig} */

// Content Security Policy tuned for a static-first Next.js App Router marketing
// site with no third-party scripts. 'unsafe-inline' is required for the small
// inline bootstrap/style Next.js emits during hydration; because the site never
// renders user-supplied HTML and loads no external scripts, the practical XSS
// surface is minimal. A nonce-based CSP is documented as a future hardening step
// in SECURITY / LAUNCH_CHECKLIST.md (it would force dynamic rendering and remove
// the static-generation performance benefit).
// Origin of the payment gateway's hosted checkout, when one is wired up. Without
// it, `form-action 'self'` silently blocks a "Pay now" form posting to the
// gateway. Kept in step with the same variable in scripts/build-static.mjs,
// which generates the equivalent policy for static hosting.
const gatewayOrigin = (process.env.PAYMENT_GATEWAY_ORIGIN ?? '').trim();
const gatewayOriginIsValid = /^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(gatewayOrigin);
if (gatewayOrigin && !gatewayOriginIsValid) {
  // Ignored rather than fatal so a bad value cannot break a deploy — but say so,
  // otherwise the checkout would silently stay blocked.
  console.warn(
    `[csp] Ignoring PAYMENT_GATEWAY_ORIGIN="${gatewayOrigin}" — expected a bare https origin.`,
  );
}
const gatewaySource = gatewayOriginIsValid ? ` ${gatewayOrigin}` : '';

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${gatewaySource}`,
  `form-action 'self'${gatewaySource}`,
  `frame-src 'self'${gatewaySource}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

// When STATIC_EXPORT=true, build a fully static site (`out/`) suitable for
// shared hosting (e.g. Hostinger hPanel). In that mode there is no Node server,
// so response headers are delivered via `.htaccess` instead of `headers()`, and
// the `/api/contact` route is excluded by the build:static script.
const isStatic = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: isStatic ? { unoptimized: true } : { formats: ['image/avif', 'image/webp'] },
  ...(isStatic
    ? { output: 'export', trailingSlash: true }
    : {
        async headers() {
          return [
            {
              source: '/:path*',
              headers: securityHeaders,
            },
          ];
        },
      }),
};

export default nextConfig;
