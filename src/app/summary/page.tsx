import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { deckDescription, deckTitle } from '@/content/summary';
import { SummaryDeck } from '@/components/summary/SummaryDeck';

/*
 * /summary — a full-screen presentation deck used on calls. It is reached by
 * direct link, so it is kept out of the navigation, the sitemap and search
 * results. The site header and footer are left out on this route (see
 * components/layout/SiteChrome.tsx).
 */
export const metadata: Metadata = pageMetadata({
  title: deckTitle,
  description: deckDescription,
  path: '/summary',
  noindex: true,
});

export default function SummaryPage() {
  return <SummaryDeck />;
}
