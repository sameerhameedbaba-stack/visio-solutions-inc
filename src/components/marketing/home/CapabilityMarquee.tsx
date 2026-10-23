'use client';

import LogoLoop, { type LogoItem } from '@/components/bits/LogoLoop';

/**
 * What we do, as a continuously scrolling ribbon (React Bits LogoLoop).
 * Deliberately capabilities, never client or partner logos — the site makes no
 * claims it cannot back. Each label maps to a published service.
 */
const CAPABILITIES: { label: string; color: string }[] = [
  { label: 'Agentic AI', color: '#A78BFA' },
  { label: 'Workflow automation', color: '#F472B6' },
  { label: 'Custom software', color: '#60A5FA' },
  { label: 'Web and application development', color: '#22D3EE' },
  { label: 'System integration', color: '#818CF8' },
  { label: 'Application modernization', color: '#38BDF8' },
  { label: 'Security engineering', color: '#5EEAD4' },
  { label: 'Security automation', color: '#6EE7B7' },
  { label: 'Search and content', color: '#FDBA74' },
  { label: 'Performance marketing', color: '#FB923C' },
  { label: 'Conversion optimization', color: '#FDA4AF' },
  { label: 'Marketing automation', color: '#F9A8D4' },
];

const items: LogoItem[] = CAPABILITIES.map(({ label, color }) => ({
  title: label,
  node: (
    <span className="inline-flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold text-white/85 sm:text-xl">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}` }}
        aria-hidden="true"
      />
      {label}
    </span>
  ),
}));

export function CapabilityMarquee() {
  return (
    <LogoLoop
      logos={items}
      speed={42}
      gap={48}
      logoHeight={32}
      pauseOnHover
      fadeOut
      draggable={false}
      intro={false}
      ariaLabel="Capabilities"
    />
  );
}
