/** @type {import('next').NextConfig} */

// Content Security Policy tuned for a static-first Next.js App Router marketing
// site with no third-party scripts. 'unsafe-inline' is required for the small
// inline bootstrap/style Next.js emits during hydration; because the site never
// renders user-supplied HTML and loads no external scripts, the practical XSS
// surface is minimal. A nonce-based CSP is documented as a future hardening step
// in SECURITY / LAUNCH_CHECKLIST.md (it would force dynamic rendering and remove
// the static-generation performance benefit).
const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
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
