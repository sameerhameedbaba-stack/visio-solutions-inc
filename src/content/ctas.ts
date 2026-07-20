/**
 * Centralized call-to-action definitions. A controlled hierarchy: one primary
 * conversion (Book a Strategy Call) with supporting secondary actions. Pages
 * reference these by key so language stays consistent and is easy to audit.
 */
export type CtaKey =
  | 'strategyCall'
  | 'exploreServices'
  | 'discussProject'
  | 'requestAssessment'
  | 'seeHowWeWork'
  | 'startConversation'
  | 'exploreAi'
  | 'exploreSoftware'
  | 'exploreSecurity'
  | 'exploreGrowth';

export interface Cta {
  label: string;
  href: string;
  /** Analytics event name, sent without any personal data. */
  event: string;
}

export const ctas: Record<CtaKey, Cta> = {
  strategyCall: {
    label: 'Book a strategy call',
    href: '/contact?intent=strategy-call',
    event: 'cta_strategy_call',
  },
  exploreServices: {
    label: 'Explore services',
    href: '/services',
    event: 'cta_explore_services',
  },
  discussProject: {
    label: 'Discuss your project',
    href: '/contact?intent=project',
    event: 'cta_discuss_project',
  },
  requestAssessment: {
    label: 'Request an assessment',
    href: '/contact?intent=assessment',
    event: 'cta_request_assessment',
  },
  seeHowWeWork: {
    label: 'See how we work',
    href: '/how-we-work',
    event: 'cta_how_we_work',
  },
  startConversation: {
    label: 'Start a conversation',
    href: '/contact',
    event: 'cta_start_conversation',
  },
  exploreAi: {
    label: 'Explore AI solutions',
    href: '/services/agentic-ai',
    event: 'cta_explore_ai',
  },
  exploreSoftware: {
    label: 'Explore software engineering',
    href: '/services/custom-software-development',
    event: 'cta_explore_software',
  },
  exploreSecurity: {
    label: 'Explore cybersecurity',
    href: '/services/ai-cybersecurity',
    event: 'cta_explore_security',
  },
  exploreGrowth: {
    label: 'Explore digital growth',
    href: '/services/digital-marketing',
    event: 'cta_explore_growth',
  },
};
