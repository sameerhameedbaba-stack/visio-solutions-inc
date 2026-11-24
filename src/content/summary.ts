/**
 * Copy for the /summary presentation deck — the Visio Solutions version of the
 * computer-care and protection summary deck. The slide wording itself lives in
 * the slide components (each slide has its own layout); this file holds what the
 * deck shell needs: one entry per slide, in order, with the presenter note and
 * the colours the background shifts to on that slide.
 */

export const deckBrand = {
  /** Short name used in running copy ("Visio protects every entry point"). */
  short: 'Visio',
  /** Full name used in headings and the deck header. */
  full: 'Visio Solutions',
} as const;

export const deckTitle = 'Fast Computer. Secure Network. Protected Digital Life.';

export const deckDescription =
  'Premium computer care plus complete cybersecurity protection and unlimited active-coverage support — Visio Solutions.';

export interface DeckSlide {
  /** Anchor used in the URL hash (#s1 … #s10). */
  id: string;
  /** Short name read out to screen readers and shown in the notes panel. */
  label: string;
  /** Presenter note, shown with N or the notes button. */
  note: string;
  /** Three background glow colours for this slide (decorative). */
  glow: readonly [string, string, string];
}

/** Slide index for a URL hash: "#s3" → 2. Anything that is not a slide → null. */
export function slideIndexFromHash(hash: string): number | null {
  const match = /^#s(\d{1,2})$/i.exec(hash);
  if (!match) return null;
  const index = Number(match[1]) - 1;
  return index >= 0 && index < deckSlides.length ? index : null;
}

export const deckSlides: readonly DeckSlide[] = [
  {
    id: 's1',
    label: 'Premium computer care and complete protection',
    note: '“Most people only fix the computer. Visio protects the full digital life around it — the laptop, the Wi-Fi, the inbox, your identity — with real experts on call. This is premium and complete.”',
    glow: ['#2563EB', '#7C3AED', '#DB2777'],
  },
  {
    id: 's2',
    label: 'Why you should care',
    note: 'Let them recognize themselves, then turn it: “This is the part everyone sees. The real danger is underneath — malware, spyware, and identity-theft risk.”',
    glow: ['#F97316', '#E11D48', '#7C3AED'],
  },
  {
    id: 's3',
    label: 'Why not normal tech support',
    note: 'Don’t bash competitors. Let the picture make the point: a normal repair fixes the laptop and leaves the Wi-Fi, inbox, browser, cloud and identity exposed.',
    glow: ['#E11D48', '#7C3AED', '#2563EB'],
  },
  {
    id: 's4',
    label: 'What we do differently',
    note: 'The core idea: “We don’t fix one thing. We put one protection over everything your computer touches — the network, the inbox, your identity — with real people behind it.”',
    glow: ['#2563EB', '#06B6D4', '#7C3AED'],
  },
  {
    id: 's5',
    label: 'Performance and setup value',
    note: 'Optimization isn’t cosmetic. “We don’t just clean junk — we tune the OS, set up your software and browser, remove bloatware, and hand back a device that’s ready for daily use.”',
    glow: ['#06B6D4', '#10B981', '#2563EB'],
  },
  {
    id: 's6',
    label: 'When it’s already infected',
    note: 'Urgency. “An infection doesn’t wait. We don’t just scan — we remove malware and spyware, fix the browser hijack, repair the OS, and turn protection back on.”',
    glow: ['#E11D48', '#2563EB', '#10B981'],
  },
  {
    id: 's7',
    label: 'Why not just antivirus',
    note: 'Never dismiss antivirus. “It guards the laptop’s front door. But threats also walk in through the Wi-Fi, the inbox, the browser, and weak settings. We close every entry point.”',
    glow: ['#F97316', '#2563EB', '#7C3AED'],
  },
  {
    id: 's8',
    label: 'What makes Visio stronger',
    note: 'The hero-value slide. Name the brands out loud — SonicWall NSA, Cisco, Barracuda — and land it: “This is bigger than local tech support. It’s a complete protection system with unlimited expert support.”',
    glow: ['#7C3AED', '#2563EB', '#06B6D4'],
  },
  {
    id: 's9',
    label: 'Why it’s better',
    note: 'The close-before-the-close. Let the contrast speak: a one-time fix vs unlimited active-coverage protection. Then move to terms.',
    glow: ['#DB2777', '#7C3AED', '#2563EB'],
  },
  {
    id: 's10',
    label: 'Choose your coverage',
    note: 'The close. Recommend the right term based on the customer’s device condition, risk level, usage, and budget. Land the line: unlimited support during active coverage.',
    glow: ['#2563EB', '#DB2777', '#F97316'],
  },
];
