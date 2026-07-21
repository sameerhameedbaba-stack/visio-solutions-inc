/**
 * Operating-context groupings. Framed by how an organization operates rather
 * than by named sectors, so we describe relevant workflow patterns and
 * constraints without implying established sector experience.
 */
export interface Industry {
  slug: string;
  name: string;
  summary: string;
  challenges: string[];
  patterns: string[];
  considerations: string;
}

export const industriesIntro =
  'We group organizations by how they operate, not by sector labels. That lets us describe the workflow patterns and constraints Visio Solutions can address — without implying experience in an industry we have not verified.';

export const industries: Industry[] = [
  {
    slug: 'knowledge-intensive',
    name: 'Knowledge-intensive organizations',
    summary: 'Firms whose work is expertise, documents, and client relationships.',
    challenges: [
      'Time lost to document handling and repetitive administration',
      'Knowledge trapped in individuals rather than shared systems',
      'Client communication spread across disconnected tools',
    ],
    patterns: [
      'Governed knowledge assistants grounded in approved sources',
      'Document intake and routing with human review',
      'Custom internal tools that centralize a core workflow',
    ],
    considerations:
      'Confidentiality and careful handling of client data shape every automation decision here.',
  },
  {
    slug: 'operations-heavy',
    name: 'Operations-heavy businesses',
    summary: 'Organizations coordinating people, assets, orders, and information at volume.',
    challenges: [
      'Coordination spread across spreadsheets and manual steps',
      'Limited real-time visibility into operations',
      'Repetitive routing, reconciliation, and status-chasing',
    ],
    patterns: [
      'Operational dashboards built from connected data',
      'Workflow automation for routing, approvals, and reconciliation',
      'Custom platforms fitted to the operating model',
    ],
    considerations:
      'Reliability and clear exception handling matter more than novelty in operational systems.',
  },
  {
    slug: 'digital-product-companies',
    name: 'Digital product companies',
    summary: 'Teams building and shipping software products, balancing speed with quality.',
    challenges: [
      'Delivery slowed by repetitive engineering and manual releases',
      'Thin automated testing making change risky',
      'Growth activity disconnected from product data',
    ],
    patterns: [
      'CI/CD and automated testing with quality gates',
      'AI-assisted engineering under human review',
      'Connected growth systems tied to product analytics',
    ],
    considerations:
      'Security and data-privacy expectations are high and should be designed in from the start.',
  },
  {
    slug: 'multi-location',
    name: 'Multi-location businesses',
    summary: 'Organizations operating consistently across many sites or teams.',
    challenges: [
      'Inconsistent processes across locations',
      'Fragmented data and reporting',
      'Manual coordination that does not scale',
    ],
    patterns: [
      'Custom platforms that standardize workflows',
      'Connected reporting across locations',
      'Automation for repeatable operational steps',
    ],
    considerations: 'Standardization should still allow for legitimate local differences.',
  },
  {
    slug: 'regulated-or-data-sensitive',
    name: 'Regulated or data-sensitive environments',
    summary: 'Businesses handling sensitive data or operating under external requirements.',
    challenges: [
      'Sensitive data moving across administrative workflows',
      'Reactive, stretched security operations',
      'Manual, error-prone reconciliation under scrutiny',
    ],
    patterns: [
      'Automation with strict data-handling boundaries and human approval',
      'Defensive security workflows with human oversight',
      'Security-conscious architecture with access controls and audit trails',
    ],
    considerations:
      'Regulatory and compliance requirements vary and require independent verification; we work within your obligations rather than claiming compliance.',
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
