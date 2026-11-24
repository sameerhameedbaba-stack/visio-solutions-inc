/**
 * Entry point of the standalone /summary deck (see scripts/build-summary.mjs).
 * Bundled into summary/deck.js, a plain script that also runs when the page is
 * opened straight from disk.
 */
import { createRoot } from 'react-dom/client';
import { SummaryDeck } from '@/components/summary/SummaryDeck';

const container = document.getElementById('deck-root');
if (container) {
  createRoot(container).render(<SummaryDeck />);
}
