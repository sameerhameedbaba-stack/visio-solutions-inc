import type { CtaKey } from './ctas';

/** A frequently asked question with a plain-language answer. */
export interface Faq {
  question: string;
  answer: string;
}

/**
 * An illustrative use case. Always rendered with a visible
 * "Illustrative use case" label — never presented as completed client work.
 */
export interface UseCase {
  title: string;
  situation: string;
  approach: string;
  capabilities: string[];
  value: string;
}

/** One capability an offering includes. */
export interface Capability {
  title: string;
  description: string;
}

/** A single step in a delivery or engagement process. */
export interface ProcessStep {
  title: string;
  summary: string;
  clientRole?: string;
  produces?: string;
}

export type PillarId = 'ai-automation' | 'software' | 'cybersecurity' | 'growth';

/** A complete, indexable service definition powering /services/[slug]. */
export interface Service {
  slug: string;
  pillar: PillarId;
  /** Short label for navigation and cards. */
  navLabel: string;
  /** Full page title / H1. */
  title: string;
  /** Outcome-oriented supporting headline shown under the H1. */
  headline: string;
  /** One-line description for cards and mega menu. */
  summary: string;
  /** Hero body paragraph(s). */
  intro: string;
  // SEO
  seoTitle: string;
  metaDescription: string;
  keywordTheme: string;
  searchIntent: string;
  // Body
  businessProblem: {
    heading: string;
    body: string;
    signals: string[];
  };
  whenAppropriate: string[];
  includes: Capability[];
  useCases: UseCase[];
  deliverables: string[];
  businessValue: string[];
  technicalConsiderations: string[];
  integrations?: string[];
  securityGovernance: string[];
  faqs: Faq[];
  relatedSlugs: string[];
  primaryCta: CtaKey;
  secondaryCta: CtaKey;
}

export interface Pillar {
  id: PillarId;
  name: string;
  tagline: string;
  description: string;
  href: string;
}
