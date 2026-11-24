import type { Config } from 'tailwindcss';
import site from '../../tailwind.config';

/** The site's Tailwind config, scanning only what the standalone deck renders. */
const config: Config = {
  ...site,
  content: ['./src/components/summary/**/*.tsx', './src/components/layout/Logo.tsx'],
};

export default config;
