import type { CtaKey } from './ctas';

export interface Solution {
  slug: string;
  /** Business situation framing, e.g. "Reduce manual operational work". */
  title: string;
  navLabel: string;
  headline: string;
  summary: string;
  intro: string;
  seoTitle: string;
  metaDescription: string;
  searchIntent: string;
  /** The signals that indicate this is the visitor's situation. */
  signals: string[];
  /** What an engagement typically involves. */
  approach: { title: string; description: string }[];
  /** Slugs of services that map to this solution. */
  relatedServiceSlugs: string[];
  /** Recommended next step. */
  nextStep: string;
  primaryCta: CtaKey;
}

export const solutions: Solution[] = [
  {
    slug: 'process-automation',
    title: 'Reduce manual operational work',
    navLabel: 'Process Automation',
    headline: 'Free your team from repetitive, fragmented work.',
    summary: 'Map manual bottlenecks and automate them with the right level of control.',
    intro:
      'When capacity is consumed by re-keying data, routing requests, and assembling the same reports, growth gets harder. This solution focuses on finding those bottlenecks and removing them with automation that keeps humans in control of exceptions and approvals.',
    seoTitle: 'Reduce Manual Operational Work | Solutions | Visio Solutions Inc.',
    metaDescription:
      'Cut repetitive, fragmented operational work with mapped, controlled automation — rule-based, AI-assisted, or agentic — rolled out in stages.',
    searchIntent: 'Reduce manual operational workload through automation.',
    signals: [
      'Staff spend hours on repetitive data entry and routing',
      'The same information lives in several disconnected systems',
      'Scaling means hiring for manual work',
      'Recurring reports are assembled by hand',
    ],
    approach: [
      {
        title: 'Map the workflow',
        description: 'Document how work moves today and where it stalls.',
      },
      {
        title: 'Prioritize opportunities',
        description: 'Assess each step for volume, stability, risk, and payback.',
      },
      {
        title: 'Automate with controls',
        description: 'Apply the right automation and keep humans on exceptions.',
      },
      {
        title: 'Roll out in stages',
        description: 'Shadow mode, limited scope, then full operation.',
      },
    ],
    relatedServiceSlugs: ['ai-agents-automation', 'custom-software-development'],
    nextStep:
      'Request an operational assessment to identify your highest-value automation opportunities.',
    primaryCta: 'requestAssessment',
  },
  {
    slug: 'ai-adoption',
    title: 'Deploy practical AI safely',
    navLabel: 'AI Adoption',
    headline: 'Move AI from experiment to dependable system.',
    summary: 'Identify where AI genuinely helps and deploy it with oversight and evaluation.',
    intro:
      'Many organizations have run AI pilots that never became reliable operational systems. This solution focuses on choosing the right workflows, designing the controls, and deploying AI you can actually depend on — with human oversight and honest measurement.',
    seoTitle: 'Deploy Practical AI Safely | Solutions | Visio Solutions Inc.',
    metaDescription:
      'Take AI from pilot to production responsibly: workflow selection, agent architecture, human-in-the-loop design, evaluation, and secure integration.',
    searchIntent: 'Adopt AI in production responsibly and safely.',
    signals: [
      'AI experiments have not reached dependable production use',
      'You need AI to act in tools, not just generate text',
      'Leadership wants AI adoption with real control and oversight',
      'You want evaluation, not just a convincing demo',
    ],
    approach: [
      {
        title: 'Assess suitability',
        description: 'Find workflows where AI adds value versus where it does not.',
      },
      {
        title: 'Design the controls',
        description: 'Guardrails, approval points, and data-access boundaries.',
      },
      { title: 'Build and evaluate', description: 'A working system with an evaluation baseline.' },
      { title: 'Monitor in operation', description: 'Observability so you know it keeps working.' },
    ],
    relatedServiceSlugs: ['agentic-ai', 'ai-agents-automation'],
    nextStep: 'Request an AI opportunity assessment to shortlist workflows worth pursuing.',
    primaryCta: 'requestAssessment',
  },
  {
    slug: 'digital-product-development',
    title: 'Build a custom digital product',
    navLabel: 'Digital Product Development',
    headline: 'Build software fitted to your business, not a template.',
    summary: 'Turn a defined need into a maintainable application with a clear path to scale.',
    intro:
      'When off-the-shelf tools do not fit, a custom product closes the gap. This solution takes a defined need from discovery through a working, maintainable application — starting focused and building on a foundation that can grow.',
    seoTitle: 'Build a Custom Digital Product | Solutions | Visio Solutions Inc.',
    metaDescription:
      'From discovery to a working, maintainable application — custom business software, portals, and platforms built around your real workflows.',
    searchIntent: 'Build a custom software product or platform.',
    signals: [
      'A core process is poorly served by generic tools',
      'Spreadsheets and workarounds fill the gaps',
      'You need control over how the system evolves',
      'You want to start focused and scale deliberately',
    ],
    approach: [
      { title: 'Discovery', description: 'Understand the process, constraints, and goals.' },
      {
        title: 'Architecture and design',
        description: 'A structure and UX fitted to the workflow.',
      },
      {
        title: 'Build and validate',
        description: 'A working, tested application with integrations.',
      },
      { title: 'Handover', description: 'Documentation and ownership, without lock-in.' },
    ],
    relatedServiceSlugs: ['custom-software-development', 'web-application-development'],
    nextStep: 'Discuss your project to define a focused first version and a path to scale.',
    primaryCta: 'discussProject',
  },
  {
    slug: 'application-modernization',
    title: 'Modernize an existing application',
    navLabel: 'Application Modernization',
    headline: 'Improve aging systems without a risky big-bang rewrite.',
    summary: 'Modernize in stages that manage risk and keep the business running.',
    intro:
      'Legacy systems can be costly to maintain and hard to change, yet too central to replace overnight. This solution modernizes incrementally — carving out and improving parts in a sequence that reduces risk while keeping operations stable.',
    seoTitle: 'Modernize an Existing Application | Solutions | Visio Solutions Inc.',
    metaDescription:
      'Modernize legacy applications incrementally — staged replacement, integration, and migration planning that manages risk instead of betting on a rewrite.',
    searchIntent: 'Modernize or replace a legacy system safely.',
    signals: [
      'A legacy system is costly to maintain and hard to change',
      'The system is too central to replace all at once',
      'Knowledge of the system is concentrated in a few people',
      'Change carries real operational risk',
    ],
    approach: [
      { title: 'Assess and plan', description: 'Understand the system and sequence the work.' },
      {
        title: 'Carve out and replace',
        description: 'Modernize parts incrementally behind clear boundaries.',
      },
      {
        title: 'Integrate and migrate',
        description: 'Keep systems working together through the transition.',
      },
      { title: 'Stabilize', description: 'Tests, documentation, and reduced key-person risk.' },
    ],
    relatedServiceSlugs: ['custom-software-development', 'automated-software-development'],
    nextStep: 'Request an assessment to sequence a low-risk modernization path.',
    primaryCta: 'requestAssessment',
  },
  {
    slug: 'security-automation',
    title: 'Improve security operations',
    navLabel: 'Security Automation',
    headline: 'Make defensive security more consistent — with AI where it helps.',
    summary:
      'Strengthen secure development and automate low-risk defensive workflows under oversight.',
    intro:
      'Security operations are often reactive and stretched. This solution strengthens how systems are built and monitored defensively, and applies AI to enrich and prioritize signals — always within a responsibly scoped, human-supervised process.',
    seoTitle: 'Improve Security Operations | Solutions | Visio Solutions Inc.',
    metaDescription:
      'Strengthen defensive security operations: secure development practices, AI-assisted alert enrichment, monitoring integration, and vulnerability-management support with human oversight.',
    searchIntent: 'Improve defensive security operations responsibly.',
    signals: [
      'Security alerts arrive faster than they can be triaged',
      'Secure development practices are inconsistent',
      'Monitoring is fragmented across tools',
      'Vulnerability management is ad hoc',
    ],
    approach: [
      { title: 'Strengthen the basics', description: 'Secure defaults built into development.' },
      {
        title: 'Enrich and prioritize',
        description: 'AI-assisted context on alerts, decided by people.',
      },
      {
        title: 'Automate safely',
        description: 'Repetitive low-risk steps, with humans on the rest.',
      },
      { title: 'Integrate monitoring', description: 'One place to see defensive signals.' },
    ],
    relatedServiceSlugs: ['ai-cybersecurity', 'custom-software-development'],
    nextStep: 'Request a defensive security assessment to identify practical improvements.',
    primaryCta: 'requestAssessment',
  },
  {
    slug: 'digital-growth',
    title: 'Build a measurable digital-growth engine',
    navLabel: 'Digital Growth',
    headline: 'Connect marketing, CRM, and reporting into one honest system.',
    summary:
      'Search, conversion, and automation wired together so you can measure and steer growth.',
    intro:
      'Growth is hard to steer when the website, ad platforms, CRM, and reporting disagree. This solution connects them into a measurable system — search and content foundations, conversion optimization, and marketing automation — so decisions rest on real data.',
    seoTitle: 'Build a Measurable Digital-Growth Engine | Solutions | Visio Solutions Inc.',
    metaDescription:
      'Connect SEO, conversion optimization, and marketing automation with your website, CRM, and reporting to build a measurable, steerable digital-growth system.',
    searchIntent: 'Build a measurable, connected digital-growth system.',
    signals: [
      'You cannot connect marketing activity to outcomes',
      'The website, ad platforms, and CRM tell different stories',
      'Lead routing and follow-up are inconsistent',
      'Reporting is manual and hard to trust',
    ],
    approach: [
      { title: 'Fix the foundations', description: 'Technical SEO and clean data flow.' },
      { title: 'Connect the systems', description: 'Website, CRM, and reporting in one flow.' },
      { title: 'Optimize conversion', description: 'Structured testing validated against data.' },
      {
        title: 'Report honestly',
        description: 'Meaningful metrics with attribution limits stated.',
      },
    ],
    relatedServiceSlugs: ['digital-marketing', 'web-application-development'],
    nextStep: 'Discuss your project to connect your growth systems and reporting.',
    primaryCta: 'discussProject',
  },
];

export const solutionSlugs = solutions.map((s) => s.slug);

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
