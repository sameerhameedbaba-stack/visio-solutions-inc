/* DRAFT — Terms of Use. Requires attorney review before publication. */
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { termsOfUse } from '@/content/legal';
import { LegalDocument } from '@/components/marketing/LegalDocument';

export const metadata: Metadata = pageMetadata({
  title: termsOfUse.seoTitle,
  description: termsOfUse.metaDescription,
  path: '/terms',
});

export default function TermsPage() {
  return <LegalDocument doc={termsOfUse} />;
}
