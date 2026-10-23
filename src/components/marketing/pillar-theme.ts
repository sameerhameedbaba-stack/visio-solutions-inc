import type { PillarId } from '@/content/types';

/**
 * Signature colour per capability. Each pillar owns a gradient so the site reads
 * as one colourful system while staying easy to navigate: AI is violet, software
 * blue, security teal, growth orange — on cards, icons, page heroes and links.
 *
 * `text` and `tile` are Tailwind classes (kept as whole literals so the JIT
 * compiler finds them). `text` is theme-aware and AA on page surfaces; the hex
 * values are decorative only and never carry text.
 */
export interface PillarTheme {
  /** Theme-aware text colour, AA on page surfaces. */
  text: string;
  /** Tinted icon tile. */
  tile: string;
  /** Vivid two-stop gradient for accents, bars and icon fills. */
  gradient: string;
  /** Spotlight / glow colour for hover effects. */
  glow: string;
  /** Three hues for the animated hero mesh. */
  mesh: readonly [string, string, string];
}

export const pillarTheme: Record<PillarId, PillarTheme> = {
  'ai-automation': {
    text: 'text-pillar-ai',
    tile: 'bg-spectrum-violet/10 text-pillar-ai ring-1 ring-spectrum-violet/20',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
    glow: 'rgba(124, 58, 237, 0.32)',
    mesh: ['#7C3AED', '#DB2777', '#4F46E5'],
  },
  software: {
    text: 'text-pillar-software',
    tile: 'bg-spectrum-blue/10 text-pillar-software ring-1 ring-spectrum-blue/20',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    glow: 'rgba(37, 99, 235, 0.32)',
    mesh: ['#2563EB', '#06B6D4', '#4F46E5'],
  },
  cybersecurity: {
    text: 'text-pillar-security',
    tile: 'bg-spectrum-teal/10 text-pillar-security ring-1 ring-spectrum-teal/20',
    gradient: 'linear-gradient(135deg, #0D9488 0%, #10B981 100%)',
    glow: 'rgba(13, 148, 136, 0.32)',
    mesh: ['#0D9488', '#10B981', '#0EA5E9'],
  },
  growth: {
    text: 'text-pillar-growth',
    tile: 'bg-spectrum-orange/10 text-pillar-growth ring-1 ring-spectrum-orange/20',
    gradient: 'linear-gradient(135deg, #F97316 0%, #E11D48 100%)',
    glow: 'rgba(249, 115, 22, 0.32)',
    mesh: ['#F97316', '#E11D48', '#F59E0B'],
  },
};

/** Brand-wide mesh for pages that do not belong to a single pillar. */
export const brandMesh: readonly [string, string, string] = ['#2563EB', '#7C3AED', '#DB2777'];
