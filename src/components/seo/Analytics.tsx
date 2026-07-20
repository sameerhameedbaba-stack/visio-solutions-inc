import Script from 'next/script';

/**
 * Privacy-conscious analytics loader. Renders nothing unless
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured, so no tracking loads by default.
 * Plausible is cookieless and does not collect personal data; see
 * PRIVACY / lib/analytics.ts. Never pass personal form content to events.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
