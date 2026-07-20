/* DRAFT — Cookie Policy. Requires attorney review before publication. */
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { cookiePolicy } from '@/content/legal';
import { LegalDocument } from '@/components/marketing/LegalDocument';

export const metadata: Metadata = pageMetadata({
  title: cookiePolicy.seoTitle,
  description: cookiePolicy.metaDescription,
  path: '/cookies',
});

export default function CookiesPage() {
  return <LegalDocument doc={cookiePolicy} />;
}
