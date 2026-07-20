/* DRAFT — Privacy Policy. Requires attorney review before publication. */
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { privacyPolicy } from '@/content/legal';
import { LegalDocument } from '@/components/marketing/LegalDocument';

export const metadata: Metadata = pageMetadata({
  title: privacyPolicy.seoTitle,
  description: privacyPolicy.metaDescription,
  path: '/privacy',
});

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPolicy} />;
}
