import { pillars, services } from './services';
import type { PillarId } from './types';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  pillarId: PillarId;
  heading: string;
  links: NavLink[];
}

/** Primary desktop navigation items. */
export const primaryNav: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'How we work', href: '/how-we-work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Services mega-menu, grouped into the four capability pillars. */
export const servicesMegaMenu: MegaMenuColumn[] = pillars.map((pillar) => ({
  pillarId: pillar.id,
  heading: pillar.name,
  links: services
    .filter((service) => service.pillar === pillar.id)
    .map((service) => ({
      label: service.navLabel,
      href: `/services/${service.slug}`,
      description: service.summary,
    })),
}));

/** Structured footer columns. */
export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'How we work', href: '/how-we-work' },
      { label: 'Contact', href: '/contact' },
      { label: 'Make a payment', href: '/payment' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Agentic AI Solutions', href: '/services/agentic-ai' },
      { label: 'AI Agents and Automation', href: '/services/ai-agents-automation' },
      { label: 'Automated Software Development', href: '/services/automated-software-development' },
      { label: 'Custom Software Development', href: '/services/custom-software-development' },
      { label: 'Web and Application Development', href: '/services/web-application-development' },
      { label: 'AI-Powered Cybersecurity', href: '/services/ai-cybersecurity' },
      { label: 'Digital Marketing and Growth', href: '/services/digital-marketing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'Industries', href: '/industries' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];
