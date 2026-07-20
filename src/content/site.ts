import type { Faq, ProcessStep, UseCase } from './types';

/** Recognizable buyer problems for the homepage. Not every visitor has every one. */
export const businessProblems: { title: string; description: string }[] = [
  {
    title: 'Manual processes slow growth',
    description: 'Repetitive work consumes capacity that should go to higher-value activity.',
  },
  {
    title: 'Tools that do not work together',
    description: 'Data is re-entered by hand because systems are not connected.',
  },
  {
    title: 'AI experiments that stall',
    description: 'Pilots prove a model works but never become dependable production systems.',
  },
  {
    title: 'Legacy systems create friction',
    description: 'Aging software is costly to maintain and risky to change.',
  },
  {
    title: 'Development backlogs block execution',
    description: 'Delivery cannot keep pace with what the business needs to ship.',
  },
  {
    title: 'Security stays reactive',
    description: 'Alerts pile up faster than a stretched team can triage them.',
  },
  {
    title: 'Marketing lacks connected measurement',
    description: 'Activity runs, but no one can trust what actually drove results.',
  },
];

/**
 * The integrated delivery layers — how strategy, software, AI, automation,
 * security and growth connect. Used for the homepage systems architecture.
 */
export const integratedLayers: { label: string; description: string }[] = [
  {
    label: 'Business objective',
    description: 'Start from the outcome that matters, not the technology.',
  },
  {
    label: 'Workflow and system assessment',
    description: 'Understand how work moves and where the real constraints are.',
  },
  {
    label: 'Software and integration layer',
    description: 'Build and connect the systems the workflow depends on.',
  },
  {
    label: 'AI and automation layer',
    description: 'Apply AI and automation where they add measurable value.',
  },
  {
    label: 'Security and governance layer',
    description: 'Keep it defensible with security-conscious engineering and oversight.',
  },
  {
    label: 'Growth and optimization layer',
    description: 'Connect measurement so the system can be steered and improved.',
  },
];

/** The seven-stage delivery method. */
export const howWeWorkSteps: ProcessStep[] = [
  {
    title: 'Understand',
    summary: 'We learn the business problem, constraints, and goals before proposing solutions.',
    clientRole: 'Share context, priorities, and access to the people who know the process.',
    produces: 'A clear problem definition and success criteria.',
  },
  {
    title: 'Prioritize',
    summary: 'We identify what is worth solving first based on value, risk, and effort.',
    clientRole: 'Help weigh trade-offs and confirm priorities.',
    produces: 'A prioritized shortlist and a recommended starting point.',
  },
  {
    title: 'Architect',
    summary: 'We design the systems, data flow, and controls before building.',
    clientRole: 'Review the approach and surface constraints early.',
    produces: 'Architecture, integration design, and a delivery plan.',
  },
  {
    title: 'Build',
    summary: 'We deliver iteratively, with quality gates and human review throughout.',
    clientRole: 'Give feedback on working increments.',
    produces: 'Working, tested software or automation.',
  },
  {
    title: 'Validate',
    summary: 'We test against real cases — functional, accessibility, security, and performance.',
    clientRole: 'Validate against your operational reality.',
    produces: 'Evidence the system does what it should, and a defect list resolved.',
  },
  {
    title: 'Launch',
    summary: 'We deploy carefully, often in stages, with monitoring and a clear handover.',
    clientRole: 'Confirm readiness and ownership.',
    produces: 'A live system, documentation, and an operational runbook.',
  },
  {
    title: 'Improve',
    summary: 'We measure, learn, and refine — because most systems are worth improving over time.',
    clientRole: 'Share what you learn in operation.',
    produces: 'Measured improvements and a backlog of next steps.',
  },
];

/** Defensible differentiators — no superiority claims that cannot be proven. */
export const differentiators: { title: string; description: string }[] = [
  {
    title: 'Integrated thinking',
    description:
      'We connect business, software, AI, security, and growth instead of treating them as unrelated services.',
  },
  {
    title: 'Business-first technology',
    description:
      'We start from the problem and the outcome, then choose technology to fit — not the reverse.',
  },
  {
    title: 'Custom architecture',
    description:
      'We build around your real workflows rather than forcing you into one-size-fits-all packages.',
  },
  {
    title: 'Security-conscious delivery',
    description: 'Security is designed into how systems are built, not bolted on at the end.',
  },
  {
    title: 'Built to maintain',
    description:
      'Maintainability and clear handover are design goals, so you are not dependent on a single vendor.',
  },
  {
    title: 'Phased implementation',
    description:
      'We work in stages so you see value early and make informed decisions before each next step.',
  },
  {
    title: 'Clear communication',
    description: 'We explain technical decisions in plain language so you can make good calls.',
  },
  {
    title: 'Human oversight for AI',
    description: 'AI-enabled systems keep people in control of consequential decisions.',
  },
];

/** Trust principles (capability-based trust, no fabricated proof). */
export const trustPrinciples: { title: string; description: string }[] = [
  {
    title: 'Transparent process',
    description: 'A clear, phased method with defined roles and deliverables at each stage.',
  },
  {
    title: 'Technology standards',
    description: 'Modern, maintainable engineering with automated testing and quality gates.',
  },
  {
    title: 'Secure engineering',
    description: 'Security-conscious practices from architecture through delivery.',
  },
  {
    title: 'Responsible AI',
    description: 'Human oversight, guardrails, and honest limits on what AI can do.',
  },
  {
    title: 'Quality assurance',
    description: 'Functional, accessibility, performance, and security testing before launch.',
  },
  {
    title: 'Maintainability',
    description: 'Documentation and clean handover so systems remain yours to run.',
  },
];

/**
 * Illustrative use cases shown on the homepage and case-studies page.
 * ALWAYS rendered with a visible "Illustrative use case" label. Never presented
 * as completed client work, and never with fabricated numerical outcomes.
 */
export const illustrativeUseCases: UseCase[] = [
  {
    title: 'Automating document intake and routing',
    situation:
      'An operations team receives documents in varied formats and sorts, extracts, and routes them by hand.',
    approach:
      'An AI-assisted workflow extracts key fields, classifies each document, and drafts a routing decision that a person confirms before it takes effect.',
    capabilities: ['Document processing', 'Classification', 'Human approval'],
    value:
      'Less manual sorting and more consistent handling, with accountability kept with the team.',
  },
  {
    title: 'Building an internal operations platform',
    situation:
      'A core process runs across spreadsheets and disconnected tools, with no single source of truth.',
    approach:
      'A purpose-fit platform centralizes the workflow, enforces the rules that matter, and integrates the surrounding systems.',
    capabilities: ['Custom application', 'Integrations', 'Role-based access'],
    value: 'A reliable single system replacing fragile manual workarounds.',
  },
  {
    title: 'Deploying a governed knowledge assistant',
    situation:
      'Staff spend time searching scattered policies and documentation for routine answers.',
    approach:
      'A retrieval-grounded assistant answers from approved sources only, cites references, and escalates anything out of scope to a person.',
    capabilities: ['Retrieval-augmented generation', 'Access controls', 'Citation and escalation'],
    value: 'Faster, more consistent answers within a clear, governed boundary.',
  },
  {
    title: 'Connecting marketing, CRM, and reporting',
    situation: 'Lead data lives in silos, so the numbers are not trusted and results are unclear.',
    approach:
      'The website, marketing tools, CRM, and reporting are connected into one measurable flow, with clean data and consistent lead routing.',
    capabilities: ['Marketing automation', 'Integration', 'Analytics'],
    value: 'Trustworthy reporting and consistent lead handling that make optimization possible.',
  },
  {
    title: 'Automating security-event enrichment',
    situation: 'Analysts face a high volume of alerts with limited context, slowing triage.',
    approach:
      'AI enriches alerts with relevant context and suggests priority, while analysts make the decisions and confirm any response.',
    capabilities: ['Alert enrichment', 'Workflow automation', 'Human oversight'],
    value: 'Faster, better-informed triage with people firmly in control of response.',
  },
];

/** Homepage / services-overview FAQ set. */
export const generalFaqs: Faq[] = [
  {
    question: 'What types of projects does Visio Solutions Inc. handle?',
    answer:
      'We work across custom software, AI and automation, defensive cybersecurity engineering, and digital growth — often several together on the same engagement. If a need falls outside where we can genuinely help, we say so.',
  },
  {
    question: 'Can you improve an existing system rather than rebuilding it?',
    answer:
      'Often, yes. Where a system has value, we modernize or extend it incrementally instead of pushing a full rewrite. We assess the situation honestly and recommend the approach that best manages risk and cost.',
  },
  {
    question: 'How do you determine where AI is appropriate?',
    answer:
      'We assess the workflow: how well it is defined, how repetitive it is, what data and tools it touches, and where human judgment is essential. If simpler automation fits better, we recommend that. AI is applied where it adds real value, not by default.',
  },
  {
    question: 'Can you integrate with our existing business tools?',
    answer:
      'Integration is central to what we do. We connect systems through supported APIs and integration points so information flows instead of being re-entered by hand.',
  },
  {
    question: 'How do you approach security?',
    answer:
      'Security is designed into how we build — secure defaults, input validation, dependency scanning, and least-privilege access. On defensive security work we are explicit about scope and limits, and we do not claim guaranteed protection.',
  },
  {
    question: 'Do you work in phases?',
    answer:
      'Yes. We work in stages so you see value early and can make informed decisions before committing to the next phase. That keeps risk and cost visible throughout.',
  },
  {
    question: 'What information do you need to evaluate a project?',
    answer:
      'A description of the problem, the systems involved, your goals, and any constraints is a strong start. On the contact form you can share context, stage, timeline, and rough budget so we can suggest the most appropriate next step.',
  },
  {
    question: 'Can software, automation, and marketing work be delivered together?',
    answer:
      'Yes, and that is a core advantage of an integrated partner. When these areas are built to connect, marketing, operations, and data work together rather than in silos.',
  },
];

/** Agentic-AI explainer used on the homepage. */
export const agenticAiExplainer = {
  whatItIs:
    'An AI agent is software that can reason over a task you define, use tools and data, and take steps toward a goal — with the controls you set around it. In business terms, it handles defined, repetitive work that benefits from interpretation, while people stay in control of consequential decisions.',
  whereUseful: [
    'Internal knowledge assistance',
    'Customer-support triage',
    'Sales-research assistance',
    'Document processing',
    'Operational task coordination',
    'Reporting workflows',
    'Marketing operations',
    'Security-event enrichment',
  ],
  principles: [
    'Human review and control on anything consequential',
    'Integration with your tools and data through permissioned access',
    'Guardrails, evaluation, and monitoring built in',
    'Applied to defined workflow problems, not deployed as a novelty',
  ],
};
