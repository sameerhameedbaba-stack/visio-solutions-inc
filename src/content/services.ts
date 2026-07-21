import type { Pillar, Service } from './types';

export const pillars: Pillar[] = [
  {
    id: 'ai-automation',
    name: 'AI and Automation',
    tagline: 'Practical AI where it earns its place',
    description:
      'Agentic AI and business automation built around defined workflows, with human oversight, guardrails, and clear measurement — not experiments that never reach production.',
    href: '/services/agentic-ai',
  },
  {
    id: 'software',
    name: 'Software Engineering',
    tagline: 'Custom systems built to last',
    description:
      'Custom applications, web platforms, integrations, and modernization delivered with quality engineering, maintainable architecture, and human technical accountability.',
    href: '/services/custom-software-development',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    tagline: 'Security-conscious by design',
    description:
      'Defensive, responsibly scoped security engineering and AI-assisted security workflows that strengthen how systems are built, monitored, and maintained.',
    href: '/services/ai-cybersecurity',
  },
  {
    id: 'growth',
    name: 'Digital Growth',
    tagline: 'Growth you can measure',
    description:
      'Search, performance marketing, conversion optimization, and marketing automation connected to your website, CRM, and reporting so decisions rest on real data.',
    href: '/services/digital-marketing',
  },
];

export const services: Service[] = [
  // ---------------------------------------------------------------------------
  // 1. Agentic AI Solutions
  // ---------------------------------------------------------------------------
  {
    slug: 'agentic-ai',
    clientInputs: [
      'A defined workflow with a clear decision or output',
      'Access to the data and tools the agent needs',
      'A subject-matter reviewer for evaluation and approval points',
    ],
    outOfScope: [
      'Fully autonomous agents acting without human review',
      'A single general-purpose assistant meant to do everything',
      'Training foundation models from scratch',
    ],
    commonRisks: [
      'Scope creep from a workflow that was never fully defined',
      'Trusting outputs without an evaluation baseline',
      'Granting data access broader than the task requires',
    ],
    firstPhase:
      'A suitability assessment on one or two candidate workflows — producing a recommended architecture, an evaluation baseline, and a clear go/no-go before any production build.',
    pillar: 'ai-automation',
    navLabel: 'Agentic AI Solutions',
    title: 'Agentic AI Solutions',
    headline:
      'Put AI agents to work on defined problems — with oversight, guardrails, and measurement.',
    summary:
      'Design and deploy single- and multi-agent systems that act on real workflows, backed by human approval points and evaluation.',
    intro:
      'An AI agent is software that can reason over a task, use tools and data, and take steps toward a goal you define. That is useful when a workflow is repetitive, judgment-light in parts, and well understood — and risky when it is deployed without controls. Visio Solutions designs agentic systems around specific business workflows, with human approval where it matters, guardrails that constrain behavior, and evaluation that tells you whether the system is actually working.',
    seoTitle: 'Agentic AI Solutions | Visio Solutions Inc.',
    metaDescription:
      'Design and deploy agentic AI systems around real business workflows — single and multi-agent architectures with human oversight, guardrails, evaluation, and secure integration.',
    keywordTheme: 'agentic ai, ai agents, multi-agent workflows, enterprise ai deployment',
    searchIntent: 'Evaluate a partner to design and deploy production AI agents responsibly.',
    businessProblem: {
      heading: 'Most AI pilots stall before they reach production',
      body: 'Teams prove that a model can answer a question, then struggle to turn that into something reliable, observable, and safe to run against live data and tools. The gap is rarely the model. It is the architecture around it: how the agent accesses data, when a human reviews its output, how failure is handled, and how you know it is behaving as intended.',
      signals: [
        'You have run AI experiments that never became dependable operational systems',
        'A workflow involves repetitive reasoning over documents, requests, or data',
        'You need AI to take actions in tools, not just generate text',
        'Leadership wants AI adoption but is rightly concerned about control and risk',
      ],
    },
    whenAppropriate: [
      'The target workflow is defined and understood, not vague or constantly changing',
      'There is a clear decision or output the agent should produce or draft',
      'You can supply or connect the data and tools the agent needs',
      'A human can review, approve, or correct results where the stakes require it',
    ],
    includes: [
      {
        title: 'Agent opportunity assessment',
        description:
          'We map candidate workflows, estimate suitability, and identify where an agent adds value versus where simpler automation or a human should stay in control.',
      },
      {
        title: 'Workflow decomposition',
        description:
          'Complex tasks are broken into steps a system can execute reliably, with explicit boundaries for what the agent may and may not do.',
      },
      {
        title: 'Agent architecture',
        description:
          'Single-agent or multi-agent designs with defined roles, tool access, memory scope, and hand-offs, chosen to fit the problem rather than to look sophisticated.',
      },
      {
        title: 'Retrieval-augmented generation',
        description:
          'Grounding responses in your own documents and data so answers reflect your context instead of a model’s general assumptions.',
      },
      {
        title: 'Tool and API integration',
        description:
          'Connecting agents to the systems where work actually happens, with permissioned, auditable access.',
      },
      {
        title: 'Human-in-the-loop design',
        description:
          'Approval steps, review queues, and confidence thresholds so people stay in control of consequential actions.',
      },
      {
        title: 'Evaluation frameworks',
        description:
          'Test sets and scoring that measure quality against your real cases, so changes can be validated instead of guessed.',
      },
      {
        title: 'Monitoring and observability',
        description:
          'Logging, tracing, and alerting so you can see what the agent did, why, and when it needs attention.',
      },
    ],
    useCases: [
      {
        title: 'Governed internal knowledge assistant',
        situation:
          'Staff spend time searching scattered policies, procedures, and documentation to answer routine questions.',
        approach:
          'A retrieval-grounded assistant answers from approved sources only, cites its references, and escalates anything outside its scope to a person.',
        capabilities: [
          'Retrieval-augmented generation',
          'Access controls',
          'Citation and escalation',
        ],
        value:
          'Faster, more consistent answers with a clear boundary around what the system is allowed to say.',
      },
      {
        title: 'Document intake and routing',
        situation:
          'Inbound documents arrive in varied formats and must be classified, extracted, and routed to the right queue.',
        approach:
          'An agent extracts key fields, classifies each document, and drafts a routing decision that a person confirms before it takes effect.',
        capabilities: ['Document processing', 'Classification', 'Human approval step'],
        value:
          'Reduced manual sorting with a review checkpoint that keeps accountability with your team.',
      },
      {
        title: 'Operational reporting workflow',
        situation:
          'Recurring reports require pulling data from several tools and reconciling it by hand each period.',
        approach:
          'A multi-step workflow gathers data through permissioned integrations, assembles a draft report, and flags anomalies for review.',
        capabilities: ['Tool integration', 'Multi-agent workflow', 'Monitoring'],
        value:
          'Less repetitive assembly time and earlier visibility into anomalies, with humans owning the conclusions.',
      },
    ],
    deliverables: [
      'Suitability assessment and prioritized workflow shortlist',
      'Agent architecture and integration design',
      'Working system with defined guardrails and approval points',
      'Evaluation suite and quality baseline',
      'Monitoring, logging, and operational runbook',
      'Documentation and handover for your team',
    ],
    businessValue: [
      'Repetitive reasoning work handled with consistent quality',
      'AI moved from experiment to a system your team can operate',
      'Risk contained through oversight, scope limits, and evaluation',
      'A foundation you can extend to further workflows over time',
    ],
    technicalConsiderations: [
      'Model selection balanced against cost, latency, and accuracy for the task',
      'Memory and context scope defined to avoid leaking or retaining data unnecessarily',
      'Deterministic fallbacks for steps that do not need a model',
      'Versioned prompts, tools, and evaluation sets so changes are testable',
    ],
    integrations: [
      'Business tools via permissioned APIs',
      'Document and knowledge stores',
      'Identity and access controls',
      'Data warehouses and reporting systems',
    ],
    securityGovernance: [
      'Least-privilege access to data and tools',
      'Human approval for consequential actions',
      'Audit logging of agent decisions and actions',
      'Guardrails that constrain scope and handle uncertainty safely',
      'Clear boundaries on what data the system may access or store',
    ],
    faqs: [
      {
        question: 'How do you decide whether a workflow suits an AI agent?',
        answer:
          'We start with an assessment of the workflow: how well it is defined, how repetitive it is, what data and tools it touches, and where human judgment is essential. If a simpler rule-based automation fits better, we recommend that instead. AI is applied where it genuinely adds value, not by default.',
      },
      {
        question: 'Can agents operate without human oversight?',
        answer:
          'We do not design agents that take consequential actions without appropriate human review. Oversight is calibrated to the stakes: low-risk drafting can run with light review, while decisions with real consequences include explicit approval steps.',
      },
      {
        question: 'How do you keep our data secure?',
        answer:
          'Agents are given least-privilege access to only the data and tools a workflow requires. Access is permissioned and logged, data scope is defined explicitly, and we document what the system can access, retain, and produce.',
      },
      {
        question: 'How do we know the system is working?',
        answer:
          'We build evaluation sets from your real cases and measure quality against them, then monitor the system in operation. That gives you a baseline and ongoing visibility rather than a one-time demo.',
      },
    ],
    relatedSlugs: ['ai-agents-automation', 'ai-cybersecurity', 'custom-software-development'],
    primaryCta: 'requestAssessment',
    secondaryCta: 'seeHowWeWork',
  },

  // ---------------------------------------------------------------------------
  // 2. AI Agents and Business Automation
  // ---------------------------------------------------------------------------
  {
    slug: 'ai-agents-automation',
    clientInputs: [
      'A description of the workflow and where it stalls today',
      'Access to the systems the workflow spans',
      'Someone who owns the process and its exceptions',
    ],
    outOfScope: [
      'Replacing staff wholesale rather than removing repetitive steps',
      'Automating a process no one can describe',
      'Unattended automation of high-consequence decisions',
    ],
    commonRisks: [
      'Automating a broken process instead of fixing it first',
      'Brittle integrations with unstable source systems',
      'Edge cases that were never mapped',
    ],
    firstPhase:
      'A workflow map and a prioritized shortlist, then one automation run in shadow mode — observing alongside the current process — before it takes any action.',
    pillar: 'ai-automation',
    navLabel: 'AI Agents and Automation',
    title: 'AI Agents and Business Automation',
    headline: 'Automate the repetitive, fragmented work that slows your operations down.',
    summary:
      'Map manual bottlenecks and apply the right level of automation — rule-based, AI-assisted, or agentic — with controls and staged rollout.',
    intro:
      'A great deal of operational work is repetitive: re-keying data between systems, routing requests, chasing approvals, compiling the same reports. Visio Solutions maps where that work happens, then applies the right kind of automation — rule-based where logic is fixed, AI-assisted where interpretation is needed, and agentic where a workflow benefits from multi-step reasoning. Every rollout is staged and controlled so it improves operations without disrupting them.',
    seoTitle: 'AI Agents and Business Automation | Visio Solutions Inc.',
    metaDescription:
      'Automate manual, fragmented business workflows with the right mix of rule-based, AI-assisted, and agentic automation — mapped, controlled, and rolled out in stages.',
    keywordTheme:
      'business process automation, workflow automation, ai automation, operational efficiency',
    searchIntent: 'Find help automating specific manual workflows without disrupting operations.',
    businessProblem: {
      heading: 'Manual, disconnected steps quietly cap your capacity',
      body: 'When people move data between tools by hand, re-enter the same information, or wait on manual routing, work slows and errors creep in. The cost is rarely one big failure — it is a steady drag on capacity that grows with volume. Automation helps, but only if it targets the right steps and keeps the controls your operation depends on.',
      signals: [
        'The same information is entered into more than one system',
        'Requests wait on manual routing or repeated follow-up',
        'Recurring reports are assembled by hand each cycle',
        'Growth means hiring for repetitive work rather than higher-value work',
      ],
    },
    whenAppropriate: [
      'A workflow runs often enough that automation pays back the effort',
      'The steps are stable and can be described clearly',
      'The systems involved can be connected through APIs or supported integrations',
      'You want to keep human control over exceptions and approvals',
    ],
    includes: [
      {
        title: 'Workflow mapping',
        description:
          'We document how work moves today, where it stalls, and which steps are candidates for automation versus redesign.',
      },
      {
        title: 'Automation opportunity analysis',
        description:
          'Each candidate is assessed for volume, stability, risk, and payback so effort goes where it matters most.',
      },
      {
        title: 'Rule-based automation',
        description:
          'Deterministic automation for steps with fixed logic, where predictability and auditability are the priority.',
      },
      {
        title: 'AI-assisted automation',
        description:
          'Adding interpretation — extraction, classification, drafting — where inputs vary and simple rules fall short.',
      },
      {
        title: 'Agentic automation',
        description:
          'Multi-step workflows where an agent coordinates several actions, with approval points on anything consequential.',
      },
      {
        title: 'Integration and orchestration',
        description:
          'Connecting the tools a workflow spans so data moves reliably instead of by copy-and-paste.',
      },
      {
        title: 'Controls and exception handling',
        description:
          'Defined behavior for edge cases, with clear escalation to a person when something falls outside the rules.',
      },
      {
        title: 'Staged implementation',
        description:
          'Rollout in phases — shadow mode, limited scope, then full operation — so you can verify before you rely on it.',
      },
    ],
    useCases: [
      {
        title: 'Task routing and triage',
        situation:
          'Inbound requests are sorted and assigned manually, adding delay and inconsistency.',
        approach:
          'Requests are classified and routed automatically, with unusual cases flagged for a person to handle.',
        capabilities: ['Classification', 'Rule-based routing', 'Exception escalation'],
        value: 'Faster assignment and more consistent handling, with humans owning the exceptions.',
      },
      {
        title: 'CRM and record updates',
        situation: 'Customer records are updated in several places by hand after each interaction.',
        approach:
          'An automated workflow synchronizes updates across connected systems and surfaces conflicts for review.',
        capabilities: ['Integration', 'Data synchronization', 'Conflict review'],
        value: 'Fewer re-keying errors and more reliable records without adding manual steps.',
      },
      {
        title: 'Approval workflows',
        situation: 'Approvals stall in inboxes, and status is hard to track.',
        approach:
          'Requests move through a defined approval flow with reminders and a clear audit trail, keeping decisions with the right people.',
        capabilities: ['Workflow orchestration', 'Notifications', 'Audit trail'],
        value: 'Shorter cycle times and clear accountability, without removing human decisions.',
      },
    ],
    deliverables: [
      'Workflow map and prioritized automation opportunities',
      'Implemented automations with defined controls',
      'Integrations across the relevant systems',
      'Exception-handling and escalation rules',
      'Staged rollout plan and monitoring',
      'Documentation for operators and administrators',
    ],
    businessValue: [
      'Capacity returned to your team for higher-value work',
      'More consistent execution and fewer manual errors',
      'Faster cycle times on routine operational flows',
      'A controlled path to expand automation as confidence grows',
    ],
    technicalConsiderations: [
      'Idempotent operations so retries do not create duplicate work',
      'Clear ownership of the system of record for each field',
      'Observability into what ran, what failed, and why',
      'Rollback and shadow-mode options during rollout',
    ],
    integrations: [
      'CRM and support platforms',
      'Spreadsheets, databases, and internal tools',
      'Email and messaging systems',
      'Document and file storage',
    ],
    securityGovernance: [
      'Permissioned access scoped to each workflow',
      'Audit trails for automated actions',
      'Human approval retained for consequential steps',
      'Safe handling of any personal or sensitive data in transit',
    ],
    faqs: [
      {
        question: 'What is the difference between rule-based, AI-assisted, and agentic automation?',
        answer:
          'Rule-based automation follows fixed logic and is fully predictable. AI-assisted automation adds interpretation for variable inputs, such as reading a document or classifying a request. Agentic automation coordinates multiple steps toward a goal. We choose the simplest option that reliably does the job, and reserve AI for where it genuinely helps.',
      },
      {
        question: 'How do you avoid disrupting operations during rollout?',
        answer:
          'We roll out in stages — often starting in shadow mode where the automation runs alongside the current process without taking action, then a limited scope, then full operation. That lets you verify behavior before depending on it.',
      },
      {
        question: 'What happens when an automated step encounters something unexpected?',
        answer:
          'We define exception handling up front. Unusual cases are escalated to a person with the context they need, rather than being forced through automated logic that was not designed for them.',
      },
      {
        question: 'How do we measure whether automation is working?',
        answer:
          'We agree on the metrics that matter — cycle time, error rate, volume handled — and instrument the workflow so you can see them. Automation is judged on operational outcomes, not on being automated.',
      },
    ],
    relatedSlugs: ['agentic-ai', 'custom-software-development', 'digital-marketing'],
    primaryCta: 'requestAssessment',
    secondaryCta: 'exploreServices',
  },

  // ---------------------------------------------------------------------------
  // 3. Automated Software Development
  // ---------------------------------------------------------------------------
  {
    slug: 'automated-software-development',
    clientInputs: [
      'Access to the codebase and delivery pipeline',
      'Agreement on quality gates and review standards',
      'A technical point of contact for architecture decisions',
    ],
    outOfScope: [
      'Shipping AI-generated code without human review',
      'Guaranteed delivery timelines',
      'Removing engineering accountability from the process',
    ],
    commonRisks: [
      'Speed prioritized at the expense of maintainability',
      'Test coverage that measures quantity rather than risk',
      'Automation applied where a human decision belongs',
    ],
    firstPhase:
      'An assessment of the current pipeline and test coverage, then a focused improvement — often CI/CD hardening or a targeted test suite — with quality gates in place.',
    pillar: 'software',
    navLabel: 'Automated Software Development',
    title: 'Automated Software Development',
    headline: 'AI-assisted and automation-supported engineering — with human review at every gate.',
    summary:
      'Improve delivery speed and consistency with automated testing, CI/CD, static analysis, and AI-assisted engineering under human oversight.',
    intro:
      'Automated software development means using AI assistance and engineering automation — code generation support, automated testing, continuous integration, static analysis — to deliver software more consistently. It does not mean unreviewed code shipped without accountability. At Visio Solutions, automation accelerates the parts of engineering that benefit from it, while human engineers own architecture, review, and quality.',
    seoTitle: 'Automated Software Development | Visio Solutions Inc.',
    metaDescription:
      'AI-assisted, automation-supported software engineering: automated testing, CI/CD, static analysis, and quality gates — with human code review and architecture oversight.',
    keywordTheme:
      'automated software development, ai-assisted engineering, ci/cd, devops automation',
    searchIntent: 'Understand responsible AI-assisted software delivery with quality controls.',
    businessProblem: {
      heading: 'Speed without control creates a different kind of debt',
      body: 'It is easy to generate code quickly. It is harder to keep it correct, secure, maintainable, and consistent as it grows. Automation is a powerful accelerator when it is paired with quality gates and human review — and a liability when it replaces them. The goal is faster delivery you can still stand behind.',
      signals: [
        'Delivery is slowed by repetitive engineering tasks',
        'Testing and release steps are manual and inconsistent',
        'You want the speed of AI assistance without sacrificing quality',
        'Technical debt is accumulating faster than it is paid down',
      ],
    },
    whenAppropriate: [
      'You want to improve delivery consistency, not just raw speed',
      'Quality, security, and maintainability are non-negotiable',
      'A codebase would benefit from stronger automated testing and CI/CD',
      'You value human accountability over fully autonomous code generation',
    ],
    includes: [
      {
        title: 'AI-assisted planning and scaffolding',
        description:
          'Using AI to accelerate boilerplate, first drafts, and repetitive structure — always reviewed before it lands.',
      },
      {
        title: 'Automated testing',
        description:
          'Unit, integration, and end-to-end tests built into the workflow so regressions are caught early.',
      },
      {
        title: 'Continuous integration and delivery',
        description:
          'Pipelines that build, test, and deploy consistently, reducing manual release risk.',
      },
      {
        title: 'Static analysis and quality gates',
        description:
          'Automated checks for style, types, security patterns, and complexity that block problems before merge.',
      },
      {
        title: 'Human code review',
        description:
          'Every meaningful change is reviewed by an engineer who is accountable for what ships.',
      },
      {
        title: 'Architecture oversight',
        description:
          'Senior engineering decisions on structure and trade-offs remain with people, not delegated to a model.',
      },
      {
        title: 'Documentation support',
        description:
          'Automation assists in keeping documentation current alongside the code it describes.',
      },
    ],
    useCases: [
      {
        title: 'Strengthening a test suite',
        situation:
          'A codebase has thin automated coverage, making changes risky and slow to verify.',
        approach:
          'We expand automated tests with AI assistance, then wire them into CI so every change is validated, with engineers reviewing the tests themselves.',
        capabilities: ['Automated testing', 'CI/CD', 'Human review'],
        value: 'Safer, faster changes and fewer regressions reaching production.',
      },
      {
        title: 'Standardizing release pipelines',
        situation: 'Releases are manual, inconsistent, and depend on specific people.',
        approach:
          'We build repeatable CI/CD pipelines with quality gates, so releases are consistent and less dependent on individuals.',
        capabilities: ['Pipeline automation', 'Quality gates', 'Documentation'],
        value: 'More predictable releases and reduced key-person risk.',
      },
    ],
    deliverables: [
      'Automated test coverage aligned to real risk',
      'CI/CD pipelines with quality gates',
      'Static analysis and security checks in the workflow',
      'Code review standards and architecture guidance',
      'Documentation kept close to the code',
    ],
    businessValue: [
      'More consistent delivery with fewer regressions',
      'Faster, safer releases through repeatable pipelines',
      'Engineering time redirected from repetitive work to higher-value problems',
      'Quality and accountability preserved as delivery speeds up',
    ],
    technicalConsiderations: [
      'Tests designed around behavior and risk, not vanity coverage numbers',
      'Pipelines that fail loudly and clearly when quality gates are not met',
      'AI-generated code treated as a draft subject to the same review as any change',
      'Security scanning integrated rather than bolted on at the end',
    ],
    integrations: [
      'Version control and code review platforms',
      'CI/CD and build systems',
      'Static analysis and security scanning tools',
      'Issue tracking and documentation systems',
    ],
    securityGovernance: [
      'Human review required before code is merged or released',
      'Secrets kept out of code and build logs',
      'Dependency and vulnerability scanning in the pipeline',
      'Clear accountability for architecture and shipped behavior',
    ],
    faqs: [
      {
        question: 'Does automated development mean AI writes the software with no oversight?',
        answer:
          'No. AI assistance accelerates parts of engineering, but every meaningful change is reviewed by an engineer who is accountable for it, and architecture decisions stay with people. Automation supports the work; it does not replace judgment.',
      },
      {
        question: 'Will this make delivery guaranteed faster?',
        answer:
          'We do not promise guaranteed timelines. Automation tends to improve consistency and reduce repetitive effort, which often helps delivery, but the honest answer depends on the codebase and the work. We focus on measurable improvements rather than blanket claims.',
      },
      {
        question: 'How do you keep quality high when using AI-generated code?',
        answer:
          'AI-generated code is treated exactly like any other draft: it passes automated tests, static analysis, and human review before it ships. Quality gates apply regardless of how the code was produced.',
      },
    ],
    relatedSlugs: [
      'custom-software-development',
      'web-application-development',
      'ai-agents-automation',
    ],
    primaryCta: 'discussProject',
    secondaryCta: 'seeHowWeWork',
  },

  // ---------------------------------------------------------------------------
  // 4. Custom Software Development
  // ---------------------------------------------------------------------------
  {
    slug: 'custom-software-development',
    clientInputs: [
      'Access to the people who run the process today',
      'The rules, edge cases, and constraints that matter',
      'A decision-maker for scope and priorities',
    ],
    outOfScope: [
      'Rebuilding systems that already fit well',
      'Open-ended scope without phased decisions',
      'One-off code with no documentation or handover',
    ],
    commonRisks: [
      'Unclear requirements surfacing late in the build',
      'Scope expanding beyond the core workflow',
      'Building for rare edge cases before the common path is solid',
    ],
    firstPhase:
      'A discovery engagement that validates requirements and produces an architecture and a focused first version — enough to prove value before committing to the full build.',
    pillar: 'software',
    navLabel: 'Custom Software Development',
    title: 'Custom Software Development',
    headline:
      'Software built around your actual workflows — not forced into someone else’s template.',
    summary:
      'Business applications, internal tools, portals, integrations, and modernization delivered with maintainable architecture and a clear handover.',
    intro:
      'When off-the-shelf tools do not fit how you actually work, custom software closes the gap. Visio Solutions builds business applications, internal tools, customer portals, and integrations designed around your real processes — with discovery up front, maintainable architecture, and a handover that leaves you in control rather than dependent.',
    seoTitle: 'Custom Software Development | Visio Solutions Inc.',
    metaDescription:
      'Custom business applications, internal tools, portals, and integrations built around your workflows — with discovery, maintainable architecture, QA, and a clean handover.',
    keywordTheme:
      'custom software development, business applications, internal tools, systems integration',
    searchIntent: 'Find a partner to build custom software fitted to specific business processes.',
    businessProblem: {
      heading: 'Off-the-shelf tools rarely match how you really operate',
      body: 'Generic products force your process to bend around their assumptions, and the gaps get filled with spreadsheets, manual steps, and workarounds. Custom software removes that friction by fitting the way your business actually works — but only when it is built with maintainability and clear ownership in mind, so it does not become tomorrow’s liability.',
      signals: [
        'Spreadsheets and manual steps fill the gaps between your tools',
        'An existing product almost fits, but the mismatch is costly',
        'A core process depends on software no one wants to touch',
        'You need a system built around your workflow, not the other way around',
      ],
    },
    whenAppropriate: [
      'A process is core to your business and poorly served by generic tools',
      'You need control over how a system evolves over time',
      'Integration across several systems is part of the problem',
      'Maintainability and avoiding vendor lock-in matter to you',
    ],
    includes: [
      {
        title: 'Discovery and requirements',
        description:
          'We learn the process, constraints, and goals before writing code, so the build solves the real problem.',
      },
      {
        title: 'Architecture and UX',
        description:
          'A structure and interface designed for the workflow and the people who use it, not a generic template.',
      },
      {
        title: 'Business applications and internal tools',
        description:
          'Operational platforms, admin tools, and internal systems tailored to how your team works.',
      },
      {
        title: 'Customer portals',
        description:
          'Secure, usable interfaces for the people you serve, connected to the systems behind them.',
      },
      {
        title: 'API development and integrations',
        description:
          'Connecting systems and data so information flows instead of being re-entered.',
      },
      {
        title: 'Legacy modernization',
        description:
          'Improving or replacing aging systems in stages that manage risk rather than betting on a big rewrite.',
      },
      {
        title: 'MVP and scalable foundations',
        description:
          'A focused first version that proves value, built on a foundation that can grow.',
      },
    ],
    useCases: [
      {
        title: 'Internal operations platform',
        situation:
          'A team runs a core process across spreadsheets and disconnected tools, with no single source of truth.',
        approach:
          'We build a purpose-fit platform that centralizes the workflow, enforces the rules that matter, and integrates the systems around it.',
        capabilities: ['Custom application', 'Integrations', 'Role-based access'],
        value: 'A reliable single system for a core process, replacing fragile manual workarounds.',
      },
      {
        title: 'Customer portal',
        situation:
          'Customers rely on email and manual steps to get information and submit requests.',
        approach:
          'We build a secure portal where customers self-serve, connected to internal systems with appropriate controls.',
        capabilities: ['Portal development', 'Authentication', 'System integration'],
        value: 'A better customer experience and less manual handling for your team.',
      },
      {
        title: 'Staged modernization',
        situation:
          'A legacy system is costly to maintain and hard to change, but too central to replace overnight.',
        approach:
          'We modernize incrementally — carving out and replacing parts in a sequence that keeps the business running.',
        capabilities: ['Modernization', 'Integration', 'Migration planning'],
        value: 'Reduced risk and cost of change without a disruptive all-at-once rewrite.',
      },
    ],
    deliverables: [
      'Discovery findings and a validated requirements set',
      'Architecture and technical design',
      'A working, tested application',
      'Integrations with your existing systems',
      'Documentation and knowledge handover',
      'A maintainable codebase you own',
    ],
    businessValue: [
      'Software that fits your process instead of constraining it',
      'A single reliable system in place of manual workarounds',
      'Control over how the system evolves, without lock-in',
      'A foundation that scales as the business grows',
    ],
    technicalConsiderations: [
      'Architecture chosen for maintainability and the team who will run it',
      'Clear data ownership and integration boundaries',
      'Automated tests and CI to keep changes safe over time',
      'Documentation and handover so you are not dependent on any single vendor',
    ],
    integrations: [
      'CRM, ERP, and finance systems',
      'Identity and authentication providers',
      'Payment and third-party services where relevant',
      'Data warehouses and analytics',
    ],
    securityGovernance: [
      'Secure development practices throughout the build',
      'Role-based access and least-privilege design',
      'Careful handling of sensitive and personal data',
      'Handover documentation that avoids single points of dependence',
    ],
    faqs: [
      {
        question: 'How do you keep a custom system maintainable after launch?',
        answer:
          'We prioritize clear architecture, automated tests, and documentation from the start, and we hand over a codebase your team or another vendor can work with. Maintainability is a design goal, not an afterthought.',
      },
      {
        question: 'What about vendor lock-in?',
        answer:
          'We build with your ownership in mind — standard technologies where sensible, documented systems, and a clean handover. The goal is that you are never trapped with a single provider to keep your software running.',
      },
      {
        question: 'Can you improve an existing system instead of rebuilding it?',
        answer:
          'Often, yes. Where a system has value, we modernize incrementally rather than pushing a full rewrite. We assess the situation honestly and recommend the approach that manages risk and cost best.',
      },
      {
        question: 'How do you handle scope and budget concerns?',
        answer:
          'We start with discovery to understand the real requirements, then plan work in phases so you can see value early and make informed decisions before committing to the next stage.',
      },
    ],
    relatedSlugs: ['web-application-development', 'automated-software-development', 'agentic-ai'],
    primaryCta: 'discussProject',
    secondaryCta: 'seeHowWeWork',
  },

  // ---------------------------------------------------------------------------
  // 5. Web and Application Development
  // ---------------------------------------------------------------------------
  {
    slug: 'web-application-development',
    clientInputs: [
      'Content, brand assets, or design direction where they exist',
      'Access to any systems or data the app connects to',
      'Clarity on who the experience is for',
    ],
    outOfScope: [
      'Pixel-for-pixel copies of another brand',
      'Features with no clear user or conversion purpose',
      'Unmaintained one-off pages outside the system',
    ],
    commonRisks: [
      'Performance and accessibility treated as afterthoughts',
      'Scope drifting between a marketing site and a full application',
      'Content not ready when the build is',
    ],
    firstPhase:
      'A scoped build of the core pages or the primary application flow, on a maintainable foundation that can extend as needs grow.',
    pillar: 'software',
    navLabel: 'Web and Application Development',
    title: 'Web and Application Development',
    headline:
      'Fast, accessible web experiences and applications — from marketing sites to complex platforms.',
    summary:
      'Corporate websites, web applications, portals, and dashboards built for performance, accessibility, and maintainability.',
    intro:
      'The web is where many organizations meet their customers, and the difference between a marketing website and a custom web application matters. Visio Solutions builds both — high-performing, accessible corporate sites and interactive web applications, dashboards, and portals — with the same attention to speed, standards, and long-term maintainability.',
    seoTitle: 'Web and Application Development | Visio Solutions Inc.',
    metaDescription:
      'Corporate websites, web applications, portals, and dashboards built for performance, accessibility (WCAG 2.2 AA), and maintainability — from marketing sites to complex platforms.',
    keywordTheme:
      'web development, web application development, web platforms, accessible websites',
    searchIntent: 'Find a partner for a high-quality website or web application.',
    businessProblem: {
      heading: 'A slow, inaccessible, or hard-to-maintain web presence costs you quietly',
      body: 'Visitors leave sites that are slow or confusing, and inaccessible experiences exclude real users and create risk. Meanwhile, web applications that were rushed become expensive to change. Getting the fundamentals right — performance, accessibility, and clean architecture — pays back over the life of the system.',
      signals: [
        'Your site is slow, dated, or difficult to update',
        'An application needs to handle real interaction, not just present content',
        'Accessibility and mobile experience need to be taken seriously',
        'The current build is hard and costly to change',
      ],
    },
    whenAppropriate: [
      'You need a website or application built to modern performance and accessibility standards',
      'The experience must work well across devices and for all users',
      'You want a codebase that is maintainable and easy to extend',
      'Integration with other systems or data is part of the requirement',
    ],
    includes: [
      {
        title: 'Corporate websites',
        description:
          'Marketing and informational sites that load fast, rank well, and are straightforward to maintain.',
      },
      {
        title: 'Web applications',
        description:
          'Interactive applications with real logic, state, and integration — built for reliability and change.',
      },
      {
        title: 'Portals and dashboards',
        description:
          'Data-driven interfaces that present the right information clearly and securely to the right people.',
      },
      {
        title: 'Responsive, mobile-first experiences',
        description:
          'Layouts designed from small screens up, tested across real breakpoints rather than assumed.',
      },
      {
        title: 'Performance optimization',
        description:
          'Fast loading and interaction through server rendering, image optimization, and lean client code.',
      },
      {
        title: 'Accessibility',
        description:
          'WCAG 2.2 AA as a baseline — keyboard operability, semantics, contrast, and screen-reader support.',
      },
      {
        title: 'API-connected platforms',
        description: 'Front-ends wired to your data and services with clean, secure integration.',
      },
    ],
    useCases: [
      {
        title: 'High-performance marketing site',
        situation: 'A dated website loads slowly, is hard to update, and underperforms in search.',
        approach:
          'We rebuild on a modern, statically optimized stack with strong SEO foundations and a maintainable content structure.',
        capabilities: ['Web development', 'Performance', 'Technical SEO'],
        value: 'A faster site that is easier to maintain and better positioned for organic search.',
      },
      {
        title: 'Operational dashboard',
        situation: 'Teams lack a clear, real-time view of the data they need to make decisions.',
        approach:
          'We build a secure dashboard that surfaces the right metrics from connected systems, with access controls.',
        capabilities: ['Application development', 'Integration', 'Access control'],
        value: 'Clearer visibility and faster decisions from data that was previously scattered.',
      },
    ],
    deliverables: [
      'A responsive, accessible website or application',
      'Performance-optimized, server-rendered delivery where appropriate',
      'Integrations with your data and services',
      'A maintainable content or component architecture',
      'Documentation and handover',
    ],
    businessValue: [
      'A fast, credible web presence that works for every visitor',
      'Applications that are reliable and easy to evolve',
      'Better search and conversion foundations',
      'Lower long-term cost of change',
    ],
    technicalConsiderations: [
      'Server rendering or static generation chosen per page for performance',
      'Accessibility built in from the start, not retrofitted',
      'Responsive images, controlled fonts, and lean JavaScript',
      'Clear separation of content, presentation, and data',
    ],
    integrations: [
      'Content sources and future CMS migration paths',
      'Authentication and identity providers',
      'APIs and data services',
      'Privacy-conscious analytics',
    ],
    securityGovernance: [
      'Security headers and safe configuration by default',
      'Input validation on any interactive feature',
      'No secrets in client code',
      'Accessible, privacy-respecting handling of user data',
    ],
    faqs: [
      {
        question: 'What is the difference between a marketing website and a web application?',
        answer:
          'A marketing website primarily presents information and is optimized for performance, search, and conversion. A web application handles real interaction, logic, and data — user accounts, workflows, dashboards. They share standards but differ in architecture and complexity, and we build both.',
      },
      {
        question: 'How do you approach accessibility?',
        answer:
          'We target WCAG 2.2 AA as a baseline: semantic HTML, keyboard operability, sufficient contrast, focus management, and screen-reader support. Accessibility is designed in and tested, both automatically and manually.',
      },
      {
        question: 'Can you make our site faster?',
        answer:
          'Usually. We optimize rendering strategy, images, fonts, and client JavaScript, and measure the result against real performance metrics rather than claiming improvements we have not verified.',
      },
    ],
    relatedSlugs: [
      'custom-software-development',
      'digital-marketing',
      'automated-software-development',
    ],
    primaryCta: 'discussProject',
    secondaryCta: 'exploreServices',
  },

  // ---------------------------------------------------------------------------
  // 6. AI-Powered Cybersecurity
  // ---------------------------------------------------------------------------
  {
    slug: 'ai-cybersecurity',
    clientInputs: [
      'Read access to the systems and signals in scope',
      'Agreement on what automation may and may not act on',
      'A security owner for decisions and escalations',
    ],
    outOfScope: [
      'Offensive security or penetration testing on the public site',
      'Guaranteed threat prevention',
      'Claims of certification or regulatory compliance',
    ],
    commonRisks: [
      'Over-automating consequential security decisions',
      'False positives eroding trust in alerts',
      'Access granted beyond least privilege',
    ],
    firstPhase:
      'A defensive assessment that identifies practical improvements — secure defaults, alert enrichment, or monitoring integration — with human oversight defined up front.',
    pillar: 'cybersecurity',
    navLabel: 'AI-Powered Cybersecurity',
    title: 'AI-Powered Cybersecurity',
    headline:
      'Defensive, security-conscious engineering — with AI where it helps and honesty about its limits.',
    summary:
      'Security-conscious architecture, secure development practices, and AI-assisted defensive workflows with human oversight and responsible scope.',
    intro:
      'Security is not a product you switch on; it is a property of how systems are built, monitored, and maintained. Visio Solutions focuses on defensive, security-conscious engineering: designing systems to reduce risk, building software securely, and using AI to assist defensive workflows such as alert enrichment — always with human oversight and a clear-eyed view of what automation can and cannot do. We do not promise complete protection, and we do not use fear to sell.',
    seoTitle: 'AI-Powered Cybersecurity | Visio Solutions Inc.',
    metaDescription:
      'Defensive, security-conscious engineering and AI-assisted security workflows — secure development, alert enrichment, monitoring integration, and vulnerability-management support with human oversight.',
    keywordTheme: 'ai cybersecurity, security automation, secure development, defensive security',
    searchIntent: 'Find responsible, defensive security engineering support — not guarantees.',
    businessProblem: {
      heading: 'Security operations are often reactive and stretched thin',
      body: 'Alerts pile up faster than they can be triaged, secure practices compete with delivery pressure, and small teams cannot watch everything. AI can help by enriching and prioritizing signals so people focus where it matters — but only within a responsibly scoped, human-supervised process. Overselling automation here is not just inaccurate; it is dangerous.',
      signals: [
        'Security alerts arrive faster than your team can triage them',
        'Secure development practices are inconsistent under delivery pressure',
        'Monitoring is fragmented across tools',
        'Vulnerability management is ad hoc rather than a workflow',
      ],
    },
    whenAppropriate: [
      'You want to strengthen how systems are built and monitored defensively',
      'You need help making security operations more consistent',
      'You want AI applied to defensive workflows with human oversight',
      'You value honest scoping over guarantees and fear-based pitches',
    ],
    includes: [
      {
        title: 'Security-conscious architecture',
        description:
          'Designing systems to reduce attack surface and contain risk, with security considered from the start.',
      },
      {
        title: 'Secure development practices',
        description:
          'Input validation, secrets management, dependency scanning, and secure defaults built into how software is delivered.',
      },
      {
        title: 'AI-assisted alert enrichment',
        description:
          'Using AI to add context and prioritize security alerts so analysts spend time on what matters — with humans making decisions.',
      },
      {
        title: 'Security workflow automation',
        description:
          'Automating repetitive, low-risk parts of security operations while keeping consequential actions under human control.',
      },
      {
        title: 'Monitoring integration',
        description:
          'Connecting defensive monitoring across tools so signals are visible in one place.',
      },
      {
        title: 'Vulnerability-management support',
        description:
          'Turning vulnerability handling into a defined, trackable workflow rather than an ad-hoc scramble.',
      },
      {
        title: 'Configuration and knowledge support',
        description:
          'Reviewing configurations and building security knowledge systems that help teams apply good practice consistently.',
      },
    ],
    useCases: [
      {
        title: 'Alert enrichment and triage support',
        situation: 'Analysts face a high volume of alerts with limited context, slowing triage.',
        approach:
          'AI enriches alerts with relevant context and suggests priority, while analysts make the decisions and confirm actions.',
        capabilities: ['Alert enrichment', 'Workflow automation', 'Human oversight'],
        value: 'Faster, better-informed triage with people firmly in control of response.',
      },
      {
        title: 'Secure-by-default development',
        situation: 'Security practices vary across teams and are inconsistently applied.',
        approach:
          'We integrate secure defaults, dependency scanning, and security checks into the development workflow so good practice is the path of least resistance.',
        capabilities: ['Secure development', 'Static analysis', 'CI integration'],
        value: 'More consistent security posture built into how software is delivered.',
      },
    ],
    deliverables: [
      'Security-conscious architecture guidance',
      'Secure development practices integrated into delivery',
      'Defensive automation for suitable, low-risk tasks',
      'Monitoring and workflow integration',
      'Documentation of scope, limitations, and human-oversight points',
    ],
    businessValue: [
      'A stronger defensive posture built into engineering',
      'Security teams focused on judgment rather than repetitive triage',
      'More consistent handling of vulnerabilities and alerts',
      'Realistic expectations and clearly documented limitations',
    ],
    technicalConsiderations: [
      'Model risk and false positives accounted for in any AI-assisted step',
      'Defensive scope only — no offensive tooling on public systems',
      'Logging and access control around security workflows',
      'Clear boundaries on what data security automation may access',
    ],
    integrations: [
      'Monitoring and logging platforms',
      'Vulnerability scanners and dependency tools',
      'Identity and access management',
      'Ticketing and incident-response workflows',
    ],
    securityGovernance: [
      'Human oversight of all consequential security decisions',
      'Scope validation before any automation is deployed',
      'Careful data handling and access control',
      'Documented limitations — automation supports, it does not guarantee',
    ],
    faqs: [
      {
        question: 'Do you guarantee protection against attacks?',
        answer:
          'No, and any vendor that does should be treated with caution. Security reduces and manages risk; it does not eliminate it. We are explicit about what our work covers, where its limits are, and where human oversight is essential.',
      },
      {
        question: 'Is this offensive security or penetration testing?',
        answer:
          'Our public offering is defensive: security-conscious architecture, secure development, and AI-assisted defensive workflows. We do not provide offensive security instructions or tooling on the public site.',
      },
      {
        question: 'Are you claiming certifications or compliance?',
        answer:
          'We do not claim certifications, accreditations, or regulatory compliance status. Where compliance matters to your project, we work within your requirements and are clear about what would need independent verification.',
      },
      {
        question: 'How is AI used responsibly in security here?',
        answer:
          'AI assists with enrichment, prioritization, and repetitive low-risk tasks. It does not make consequential security decisions on its own. Humans remain in control, and we account for model error and false positives in the design.',
      },
    ],
    relatedSlugs: ['agentic-ai', 'custom-software-development', 'automated-software-development'],
    primaryCta: 'requestAssessment',
    secondaryCta: 'seeHowWeWork',
  },

  // ---------------------------------------------------------------------------
  // 7. Digital Marketing and Growth
  // ---------------------------------------------------------------------------
  {
    slug: 'digital-marketing',
    clientInputs: [
      'Access to your website, analytics, ad platforms, and CRM',
      'Clarity on what a good outcome looks like',
      'Someone who owns lead follow-up',
    ],
    outOfScope: [
      'Guaranteed rankings, leads, or return on ad spend',
      'Vanity-metric reporting disconnected from outcomes',
      'Sending personal data into analytics',
    ],
    commonRisks: [
      'Optimizing before measurement is trustworthy',
      'Treating attribution as certainty rather than direction',
      'Disconnected tools that fragment the data',
    ],
    firstPhase:
      'A measurement-and-foundations pass — connecting website, CRM, and reporting — so later optimization rests on data you can trust.',
    pillar: 'growth',
    navLabel: 'Digital Marketing and Growth',
    title: 'Digital Marketing and Growth',
    headline:
      'Connected growth systems where the website, CRM, and reporting tell one honest story.',
    summary:
      'SEO, performance marketing, conversion optimization, and marketing automation built as measurable, connected systems.',
    intro:
      'Growth suffers when marketing activity is disconnected from the systems that record results. Visio Solutions builds digital growth as a connected system: search and content foundations, performance marketing, conversion optimization, and marketing automation, wired to your website, CRM, and reporting so decisions rest on real data. We focus on measurable decision-making, and we do not guarantee rankings, leads, or revenue.',
    seoTitle: 'Digital Marketing and Growth | Visio Solutions Inc.',
    metaDescription:
      'SEO, performance marketing, conversion optimization, and marketing automation built as connected, measurable systems — integrated with your website, CRM, and reporting.',
    keywordTheme:
      'digital marketing, seo, conversion optimization, marketing automation, growth systems',
    searchIntent: 'Find a partner for measurable, systems-based digital growth.',
    businessProblem: {
      heading: 'Marketing activity without connected measurement is guesswork',
      body: 'Campaigns run, traffic arrives, and yet it is hard to say what actually drove results, because the website, ad platforms, CRM, and reporting do not agree. When the plumbing is connected and measurement is honest — including its limits — marketing becomes a system you can steer instead of a series of hopeful bets.',
      signals: [
        'You cannot clearly connect marketing activity to outcomes',
        'The website, ad platforms, and CRM report different stories',
        'Leads arrive but routing and follow-up are inconsistent',
        'Reporting is manual and hard to trust',
      ],
    },
    whenAppropriate: [
      'You want growth built as a measurable, connected system',
      'Search and content foundations need real technical grounding',
      'Conversion and lead handling could be significantly improved',
      'You value honest measurement over vanity metrics and guarantees',
    ],
    includes: [
      {
        title: 'SEO and technical SEO',
        description:
          'Search strategy grounded in real intent, plus the technical foundations — performance, structure, metadata — that let content rank.',
      },
      {
        title: 'Content architecture',
        description:
          'A page-to-intent structure and internal-linking plan so content supports discovery instead of competing with itself.',
      },
      {
        title: 'Performance marketing',
        description:
          'Paid channels planned and measured against real outcomes, not impressions and clicks alone.',
      },
      {
        title: 'Landing-page systems',
        description:
          'Fast, accessible, testable landing pages built as a reusable system rather than one-off pages.',
      },
      {
        title: 'Conversion-rate optimization',
        description:
          'Structured testing of messaging and flow, with changes validated against data.',
      },
      {
        title: 'Marketing automation',
        description:
          'Lead routing, nurture, and hand-off workflows connected to your CRM so nothing falls through gaps.',
      },
      {
        title: 'Analytics and reporting',
        description:
          'Privacy-conscious analytics and reporting that reflect meaningful events, with attribution limits stated plainly.',
      },
    ],
    useCases: [
      {
        title: 'Connecting marketing, CRM, and reporting',
        situation:
          'Lead data lives in silos, so no one trusts the numbers or knows what is working.',
        approach:
          'We connect the website, marketing tools, CRM, and reporting into one measurable flow, with lead routing and clean data as the foundation.',
        capabilities: ['Marketing automation', 'Integration', 'Analytics'],
        value:
          'Trustworthy reporting and consistent lead handling that make optimization possible.',
      },
      {
        title: 'Search and content foundations',
        situation:
          'Content exists but does not rank, and the site lacks technical SEO fundamentals.',
        approach:
          'We fix technical SEO, build a page-to-intent architecture, and plan internal linking so content can perform.',
        capabilities: ['Technical SEO', 'Content architecture', 'Performance'],
        value: 'Stronger organic foundations and content that supports discovery over time.',
      },
    ],
    deliverables: [
      'SEO and technical SEO foundations',
      'Content architecture and internal-linking plan',
      'Landing-page system and conversion tests',
      'Marketing automation and lead routing connected to your CRM',
      'Privacy-conscious analytics and honest reporting',
    ],
    businessValue: [
      'Marketing you can measure and actually steer',
      'Consistent lead handling and cleaner data',
      'Stronger organic-search foundations',
      'Decisions based on real outcomes rather than vanity metrics',
    ],
    technicalConsiderations: [
      'Attribution treated as directional, with its limits stated openly',
      'Analytics configured to exclude personal form content',
      'Landing pages built for performance and accessibility',
      'Clean data flow between marketing tools, CRM, and reporting',
    ],
    integrations: [
      'CRM and lead-routing systems',
      'Marketing automation platforms',
      'Privacy-conscious analytics (e.g. Plausible)',
      'Ad platforms and search consoles',
    ],
    securityGovernance: [
      'Personal data kept out of analytics events',
      'Consent-aware analytics where legally required',
      'Secure handling of lead data across integrations',
      'Honest measurement — no invented results',
    ],
    faqs: [
      {
        question: 'Do you guarantee rankings, leads, or revenue?',
        answer:
          'No. Anyone guaranteeing search rankings or specific revenue is overselling. We build measurable systems and optimize against real data. We are honest about what we can influence and where outcomes depend on factors outside anyone’s control.',
      },
      {
        question: 'How do you handle measurement and attribution?',
        answer:
          'We connect your website, marketing tools, CRM, and reporting so results are traceable, and we treat attribution as directional rather than absolute. We state its limits openly instead of presenting a single number as certainty.',
      },
      {
        question: 'How do you protect privacy in analytics?',
        answer:
          'We favor privacy-conscious analytics and never send personal form content — names, emails, phone numbers, project details — to analytics. Where consent is legally required, tracking respects it.',
      },
      {
        question: 'Can marketing work connect to our software and automation?',
        answer:
          'Yes — that is a core advantage of an integrated partner. Growth systems connect naturally to the software, integrations, and automation we build, so marketing, operations, and data work together.',
      },
    ],
    relatedSlugs: [
      'web-application-development',
      'ai-agents-automation',
      'custom-software-development',
    ],
    primaryCta: 'discussProject',
    secondaryCta: 'exploreServices',
  },
];

// --- Lookup helpers ----------------------------------------------------------

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByPillar(pillar: Pillar['id']): Service[] {
  return services.filter((s) => s.pillar === pillar);
}

export function getPillar(id: Pillar['id']): Pillar | undefined {
  return pillars.find((p) => p.id === id);
}
