/**
 * Industry groupings. Framed as adaptable patterns — we do NOT claim established
 * sector experience or existing clients. Each entry describes common challenges
 * and relevant solution patterns in general terms.
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
  'We adapt technology and automation strategies to the operating realities of different industries. The groupings below describe common challenges and relevant solution patterns; they do not imply established clients or verified sector credentials.';

export const industries: Industry[] = [
  {
    slug: 'professional-services',
    name: 'Professional services',
    summary: 'Firms whose work is knowledge, documents, and client relationships.',
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
      'Confidentiality and careful handling of client data are central to any automation here.',
  },
  {
    slug: 'technology-and-saas',
    name: 'Technology and SaaS',
    summary: 'Product companies balancing delivery speed with quality.',
    challenges: [
      'Delivery slowed by repetitive engineering and manual releases',
      'Thin automated testing making change risky',
      'Growth marketing disconnected from product data',
    ],
    patterns: [
      'CI/CD and automated testing with quality gates',
      'AI-assisted engineering under human review',
      'Connected growth systems tied to product analytics',
    ],
    considerations:
      'Security and data privacy expectations are high and should be designed in from the start.',
  },
  {
    slug: 'financial-and-business-services',
    name: 'Financial and business services',
    summary: 'Operations-heavy businesses with a low tolerance for error.',
    challenges: [
      'Manual, error-prone data movement between systems',
      'Reactive security operations',
      'Reporting assembled by hand under time pressure',
    ],
    patterns: [
      'Rule-based automation for fixed, auditable logic',
      'Defensive security workflows with human oversight',
      'Custom platforms with strong access controls and audit trails',
    ],
    considerations:
      'Regulatory and compliance requirements vary and require independent verification; we work within your obligations rather than claiming compliance.',
  },
  {
    slug: 'healthcare-supporting-businesses',
    name: 'Healthcare-supporting businesses',
    summary: 'Organizations that support healthcare operations and administration.',
    challenges: [
      'Sensitive data handled across administrative workflows',
      'Manual intake and coordination steps',
      'Fragmented systems that do not share information',
    ],
    patterns: [
      'Automation with strict data-handling boundaries and human approval',
      'Integrations that reduce manual re-entry',
      'Security-conscious architecture for sensitive information',
    ],
    considerations:
      'Handling of sensitive data requires careful scoping and independent compliance review; we do not make regulatory guarantees.',
  },
  {
    slug: 'retail-and-commerce',
    name: 'Retail and commerce',
    summary: 'Businesses selling across channels and managing operations at volume.',
    challenges: [
      'Disconnected tools for storefront, operations, and marketing',
      'Manual handling of orders, data, and reporting',
      'Growth activity that is hard to measure',
    ],
    patterns: [
      'Integration across commerce, operations, and CRM',
      'Marketing automation connected to real outcomes',
      'Custom internal tools for operational workflows',
    ],
    considerations: 'Payment and personal data must be handled securely with appropriate controls.',
  },
  {
    slug: 'logistics-and-operations',
    name: 'Logistics and operations',
    summary: 'Operations businesses coordinating people, assets, and information.',
    challenges: [
      'Coordination spread across spreadsheets and manual steps',
      'Limited real-time visibility into operations',
      'Repetitive routing and status-chasing',
    ],
    patterns: [
      'Operational dashboards from connected data',
      'Workflow automation for routing and approvals',
      'Custom platforms fitted to the operating model',
    ],
    considerations:
      'Reliability and clear exception handling matter more than novelty in operational systems.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    summary: 'Producers connecting operational and business systems.',
    challenges: [
      'Legacy systems that are hard to change',
      'Data siloed between operational and business tools',
      'Manual reporting and reconciliation',
    ],
    patterns: [
      'Staged legacy modernization',
      'Integration between operational and business systems',
      'Automation for repetitive reporting and reconciliation',
    ],
    considerations: 'Modernization should be incremental to avoid disrupting production.',
  },
  {
    slug: 'multi-location-service-businesses',
    name: 'Multi-location service businesses',
    summary: 'Service businesses operating consistently across many locations.',
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
    considerations: 'Standardization must still allow for legitimate local differences.',
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
