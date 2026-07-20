/**
 * Evergreen insight articles. Authored by the organization (Visio Solutions Inc.)
 * rather than an invented person. Dates are managed manually and reflect
 * publication/update, not fabricated freshness. No unsupported statistics.
 */
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] };

export interface Article {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** Topic label for filtering/badges. */
  topic: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  readingMinutes: number;
  author: string;
  seoTitle: string;
  metaDescription: string;
  body: ArticleBlock[];
  relatedServiceSlugs: string[];
}

export const articles: Article[] = [
  {
    slug: 'where-ai-agents-create-practical-business-value',
    title: 'Where AI agents create practical business value',
    description:
      'A grounded look at the workflows where AI agents genuinely help, the ones where they do not, and how to tell the difference before you build.',
    excerpt:
      'AI agents are useful for defined, repetitive, judgment-light work — and risky when deployed without controls. Here is how to find the difference.',
    topic: 'AI agents',
    published: '2026-05-12',
    updated: '2026-07-06',
    readingMinutes: 7,
    author: 'Visio Solutions Inc.',
    seoTitle: 'Where AI Agents Create Practical Business Value | Visio Solutions Inc.',
    metaDescription:
      'Which business workflows suit AI agents, which do not, and how to evaluate suitability before building — with human oversight, guardrails, and evaluation.',
    body: [
      {
        type: 'paragraph',
        text: 'The gap between an impressive AI demo and a system a business can depend on is wider than it looks. A model answering a question in a sandbox proves very little about whether it will behave reliably against live data, real edge cases, and the consequences of being wrong. The organizations getting value from AI agents are not the ones with the flashiest demos. They are the ones that chose the right workflows and built the right controls.',
      },
      { type: 'heading', text: 'What an AI agent actually is' },
      {
        type: 'paragraph',
        text: 'An AI agent is software that can reason over a task you define, use tools and data, and take steps toward a goal. That last part — taking steps — is what separates an agent from a chatbot. It is also what makes scope, permissions, and oversight matter so much. An agent that can act needs boundaries on what it may act upon.',
      },
      { type: 'heading', text: 'The workflows where agents tend to help' },
      {
        type: 'paragraph',
        text: 'Agents earn their place on work that is repetitive, well understood, and involves interpretation that simple rules cannot capture. A few patterns recur:',
      },
      {
        type: 'list',
        items: [
          'Answering routine questions from approved internal sources, with citations and escalation for anything out of scope',
          'Extracting and classifying information from documents that arrive in varied formats',
          'Coordinating multi-step operational tasks that today require a person to shepherd them between tools',
          'Enriching and prioritizing signals — support tickets, security alerts — so people focus where it matters',
        ],
      },
      {
        type: 'paragraph',
        text: 'What these share is a defined shape. The task can be described. The inputs and outputs are known. A human can review the result where the stakes require it. When those conditions hold, an agent can carry real operational load.',
      },
      { type: 'heading', text: 'The workflows where agents tend to struggle' },
      {
        type: 'paragraph',
        text: 'Agents are a poor fit where the work is vague, constantly changing, or carries consequences that demand certainty. If you cannot describe the workflow clearly, an agent will not rescue an undefined process — it will expose it. And where an error is expensive or irreversible, the right design keeps a person firmly in the decision, using the agent to prepare and inform rather than to act alone.',
      },
      { type: 'heading', text: 'A short suitability test' },
      {
        type: 'paragraph',
        text: 'Before building, it is worth asking four plain questions:',
      },
      {
        type: 'list',
        items: [
          'Is the workflow defined well enough that you could write down what "good" looks like?',
          'Does it run often enough that automating it is worth the effort?',
          'Can you connect the data and tools the agent needs, with appropriate permissions?',
          'Where the stakes are high, can a person review or approve before anything consequential happens?',
        ],
      },
      {
        type: 'paragraph',
        text: 'If the answers are yes, you likely have a candidate. If not, the honest move is to fix the workflow first — or to use simpler automation that does not need a model at all.',
      },
      { type: 'heading', text: 'The controls that make it dependable' },
      {
        type: 'paragraph',
        text: 'A production agent is mostly the system around the model: least-privilege access to data and tools, human approval on consequential actions, guardrails that constrain behavior and handle uncertainty safely, evaluation against your real cases, and monitoring so you can see what it did and why. Skip these and you have a demo. Build them and you have something you can operate.',
      },
      {
        type: 'paragraph',
        text: 'The point is not to be cautious for its own sake. It is that the value of an agent comes from being able to rely on it — and reliability is engineered, not assumed.',
      },
    ],
    relatedServiceSlugs: ['agentic-ai', 'ai-agents-automation'],
  },
  {
    slug: 'how-to-decide-what-to-automate-first',
    title: 'How to decide what to automate first',
    description:
      'A practical way to choose your first automation — one that pays back, builds confidence, and does not disrupt operations.',
    excerpt:
      'The best first automation is rarely the most exciting one. It is the one with high volume, stable logic, low risk, and a clear payback.',
    topic: 'Automation',
    published: '2026-06-03',
    readingMinutes: 6,
    author: 'Visio Solutions Inc.',
    seoTitle: 'How to Decide What to Automate First | Visio Solutions Inc.',
    metaDescription:
      'A practical framework for choosing your first automation: prioritize by volume, stability, risk, and payback, and roll out in stages that protect operations.',
    body: [
      {
        type: 'paragraph',
        text: 'When a team decides to automate, the instinct is often to start with the most visible pain or the most interesting technology. Both are usually the wrong place to begin. The first automation should be chosen to build confidence and return value quickly, because success makes the next step easier — and a messy first attempt makes everything harder.',
      },
      { type: 'heading', text: 'Start by mapping, not building' },
      {
        type: 'paragraph',
        text: 'Before choosing anything, document how work actually moves today. Not how it is supposed to move — how it really does, including the workarounds. This is where the true bottlenecks show up, and they are frequently not where people assume. A map also reveals which steps are stable enough to automate and which are still in flux.',
      },
      { type: 'heading', text: 'Score candidates on four dimensions' },
      {
        type: 'paragraph',
        text: 'Once you have a map, weigh each candidate step against four factors:',
      },
      {
        type: 'list',
        items: [
          'Volume — how often it runs. High-frequency work returns effort faster.',
          'Stability — how fixed the logic is. Stable steps automate cleanly; shifting ones fight back.',
          'Risk — the cost of an error. Lower-risk steps are safer places to start.',
          'Payback — the time or error reduction relative to the effort to automate it.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The best first candidate usually scores high on volume, stability, and payback while staying low on risk. It is often unglamorous. That is fine — an unglamorous win that people trust is worth more than an ambitious one that they do not.',
      },
      { type: 'heading', text: 'Match the automation to the step' },
      {
        type: 'paragraph',
        text: 'Not every step needs AI. Where the logic is fixed, rule-based automation is more predictable and easier to audit. Where inputs vary and interpretation is required, AI-assisted automation earns its place. Where a workflow spans several steps and coordination, an agentic approach may fit — with human approval on anything consequential. Choosing the simplest option that reliably does the job is a feature, not a compromise.',
      },
      { type: 'heading', text: 'Roll out in stages' },
      {
        type: 'paragraph',
        text: 'Even a well-chosen automation should be introduced carefully. Running it in shadow mode — alongside the current process, without taking action — lets you compare its behavior to reality before you depend on it. From there, a limited scope, then full operation. Define exception handling up front so unusual cases escalate to a person rather than being forced through logic that was not designed for them.',
      },
      { type: 'heading', text: 'Measure what you set out to improve' },
      {
        type: 'paragraph',
        text: 'Finally, decide in advance how you will know it worked: cycle time, error rate, volume handled. Automation is worth doing when it improves an operational outcome, not because it is automated. A first success measured honestly is the strongest argument for the second.',
      },
    ],
    relatedServiceSlugs: ['ai-agents-automation', 'custom-software-development'],
  },
  {
    slug: 'custom-software-versus-off-the-shelf',
    title: 'Custom software versus off-the-shelf: a decision that is not binary',
    description:
      'When to buy, when to build, and when the right answer is a considered mix — framed around maintainability and real fit.',
    excerpt:
      'The build-versus-buy question is rarely all-or-nothing. The better question is where a generic tool fits and where the mismatch is costing you.',
    topic: 'Software',
    published: '2026-06-24',
    readingMinutes: 6,
    author: 'Visio Solutions Inc.',
    seoTitle: 'Custom Software vs Off-the-Shelf | Visio Solutions Inc.',
    metaDescription:
      'A practical way to weigh custom software against off-the-shelf tools — based on process fit, maintainability, integration, and long-term ownership.',
    body: [
      {
        type: 'paragraph',
        text: 'Framed as a binary, build-versus-buy invites bad decisions. Off-the-shelf tools are excellent when your process resembles the one they were designed for. Custom software is worth it when a core workflow is genuinely yours. Most organizations live somewhere in between, and the useful question is not "build or buy" but "where does a generic tool fit, and where is the mismatch quietly costing us?"',
      },
      { type: 'heading', text: 'Where off-the-shelf wins' },
      {
        type: 'paragraph',
        text: 'For common, well-solved problems — email, accounting, standard CRM — established products are hard to beat. They are maintained by someone else, improved continuously, and cheaper than building the equivalent. If your process fits theirs without heavy workarounds, buying is usually the right call.',
      },
      { type: 'heading', text: 'The tell that you have outgrown a generic tool' },
      {
        type: 'paragraph',
        text: 'The signal is rarely dramatic. It is the accumulation of spreadsheets beside the tool, the manual steps that bridge its gaps, the "everyone just knows" workarounds that new hires struggle to learn. When a product almost fits and the gap is filled by human effort, that effort is a recurring cost — and often an invisible one until you add it up.',
      },
      { type: 'heading', text: 'What custom software actually buys you' },
      {
        type: 'paragraph',
        text: 'Custom software fits the way your business works rather than forcing your business to bend. That matters most for processes that are core to how you compete or operate. But it comes with responsibility: a custom system has to be maintained. Built well — clear architecture, automated tests, documentation, a clean handover — it stays an asset. Built carelessly, it becomes the next legacy system.',
      },
      { type: 'heading', text: 'Integration is the quiet third option' },
      {
        type: 'paragraph',
        text: 'Frequently the highest-value work is neither a full build nor a pure purchase, but connecting what you already have. Integration removes the manual bridges between tools without replacing them. A modest amount of custom glue can make a stack of off-the-shelf products behave like one coherent system.',
      },
      { type: 'heading', text: 'A short way to decide' },
      {
        type: 'list',
        items: [
          'Is this process common and well-solved, or specific to how you operate?',
          'How much manual effort currently bridges the gaps in your existing tools?',
          'Would owning and evolving the system give you a real advantage, or just a maintenance burden?',
          'Could integration solve most of the problem before a build is justified?',
        ],
      },
      {
        type: 'paragraph',
        text: 'Answered honestly, these usually point to a considered mix: buy the commodity, build the differentiator, and integrate so the whole thing works together. The goal is not to build for its own sake, nor to force a generic tool to be something it is not — it is fit, maintainability, and ownership over time.',
      },
    ],
    relatedServiceSlugs: ['custom-software-development', 'web-application-development'],
  },
];

export const articleSlugs = articles.map((a) => a.slug);

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Articles sorted newest first by updated/published date. */
export const sortedArticles = [...articles].sort((a, b) =>
  (b.updated ?? b.published).localeCompare(a.updated ?? a.published),
);
