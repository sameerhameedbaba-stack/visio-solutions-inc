/**
 * Privacy-conscious analytics abstraction.
 *
 * Tracking is disabled unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured. Only
 * meaningful, non-personal events are ever sent. Personal form content (names,
 * emails, phone numbers, company names, project descriptions) must NEVER be
 * passed here — the type only permits a small set of safe string properties.
 */
export type AnalyticsProps = Record<string, string | number | boolean>;

export const analyticsEnabled =
  typeof process !== 'undefined' && !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

interface PlausibleWindow extends Window {
  plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
}

/**
 * Record an analytics event. No-op when analytics is disabled or unavailable.
 * Never include personally identifiable information in `props`.
 */
export function trackEvent(event: string, props?: AnalyticsProps): void {
  if (!analyticsEnabled || typeof window === 'undefined') return;
  const w = window as PlausibleWindow;
  try {
    w.plausible?.(event, props ? { props } : undefined);
  } catch {
    // Analytics must never break the UI.
  }
}
