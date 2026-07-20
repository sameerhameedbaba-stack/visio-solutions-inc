/**
 * Official company information — the single source of truth.
 * These values are used across metadata, structured data, the footer, the
 * contact page and legal pages. Do not abbreviate, relocate, or reformat.
 */
export const company = {
  name: 'Visio Solutions Inc.',
  shortName: 'Visio Solutions',
  legalName: 'Visio Solutions Inc.',
  domain: 'visiosolutions.net',
  email: 'support@visiosolutions.net',
  tagline: 'Software, AI, automation, security, and growth — working as one system.',
  description:
    'Visio Solutions Inc. is an integrated technology partner that helps organizations build custom software, deploy practical AI and automation, strengthen digital operations with security-conscious engineering, and create measurable growth systems.',
  address: {
    line1: '4675 Commercial Street SE, PMB #470',
    city: 'Salem',
    stateShort: 'OR',
    state: 'Oregon',
    postalCode: '97302',
    country: 'United States',
    countryCode: 'US',
  },
} as const;

/** Full, single-line postal address for schema and inline display. */
export const formattedAddress = `${company.address.line1}, ${company.address.city}, ${company.address.state} ${company.address.postalCode}, ${company.address.country}`;

/** Canonical site URL, overridable per-environment. No trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${company.domain}`).replace(
  /\/$/,
  '',
);

/** Build an absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized === '/' ? '' : normalized}`;
}
