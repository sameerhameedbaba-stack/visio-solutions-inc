#!/usr/bin/env node
/**
 * Build the /summary presentation deck as a self-contained folder:
 *
 *   public/summary/
 *     index.html   the page
 *     deck.css     all styles, with the two fonts embedded
 *     deck.js      the deck (React + GSAP), one plain script
 *     favicon.svg
 *
 * Every reference is relative and nothing is loaded from outside the folder, so
 * the deck works on the website (visiosolutions.net/summary/), uploaded on its
 * own to any host, or opened straight from disk by double-clicking index.html.
 *
 * Next.js copies public/ into the build, so `next build` and the static export
 * both ship it. Runs automatically before `npm run build`, `npm run dev` and
 * `npm run build:static`; run it alone with `npm run build:summary`.
 */
import { build, transform } from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'summary');
const require = createRequire(import.meta.url);
process.chdir(root);

/** Load a TypeScript module (bundled in memory) and return its exports. */
async function importTs(entry) {
  const result = await build({
    absWorkingDir: root,
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const hash = (text) => createHash('sha256').update(text).digest('hex').slice(0, 10);

// Latin range used by the Fontsource "latin" subsets.
const latinRange =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

/** @font-face with the font file embedded, so it loads even from disk. */
function embeddedFont(family, weights, file) {
  const data = readFileSync(require.resolve(file)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:${weights};src:url(data:font/woff2;base64,${data}) format('woff2');unicode-range:${latinRange};}`;
}

async function main() {
  console.log('▶ Building the /summary deck…');
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const { deckTitle, deckDescription, deckBrand } = await importTs('src/content/summary.ts');

  // 1. Script: the deck component, bundled into one classic script. (A module
  //    script would be blocked when the page is opened from disk.)
  await build({
    absWorkingDir: root,
    entryPoints: ['scripts/summary/client.tsx'],
    bundle: true,
    minify: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2020'],
    jsx: 'automatic',
    outfile: join(outDir, 'deck.js'),
    define: {
      'process.env.NODE_ENV': '"production"',
      // Read by @/content/company (the logo); the deck links to the live site.
      'process.env.NEXT_PUBLIC_SITE_URL': '"https://visiosolutions.net"',
    },
    alias: { 'next/link': './scripts/summary/link-shim.tsx' },
    legalComments: 'eof',
    logLevel: 'warning',
  });
  // esbuild writes the deck's CSS module next to the script.
  const moduleCss = readFileSync(join(outDir, 'deck.css'), 'utf8');

  // 2. Styles: the site's tokens and Tailwind utilities (only those the deck
  //    uses), the embedded fonts, then the deck's own module styles.
  const fonts = [
    embeddedFont(
      'Inter Variable',
      '100 900',
      '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    ),
    embeddedFont(
      'Plus Jakarta Sans Variable',
      '200 800',
      '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2',
    ),
  ].join('\n');
  const standalone = `
:root{--font-inter:'Inter Variable';--font-display:'Plus Jakarta Sans Variable';}
html,body{background:#060816;}
body{margin:0;font-family:var(--font-inter),system-ui,-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
.noscript{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:2rem;color:#fff;text-align:center;}
`;
  const globals = readFileSync(join(root, 'src', 'app', 'globals.css'), 'utf8');
  const tailwindCss = await postcss([
    tailwindcss({ config: join(root, 'scripts', 'summary', 'tailwind.config.ts') }),
    autoprefixer,
  ]).process(`${fonts}\n${globals}\n${standalone}`, {
    from: join(root, 'src', 'app', 'globals.css'),
  });
  const css = (await transform(`${tailwindCss.css}\n${moduleCss}`, { loader: 'css', minify: true }))
    .code;
  writeFileSync(join(outDir, 'deck.css'), css, 'utf8');

  // 3. Favicon.
  copyFileSync(join(root, 'src', 'app', 'icon.svg'), join(outDir, 'favicon.svg'));

  // 4. Page. Relative links only; ?v= busts caches whenever a file changes.
  const js = readFileSync(join(outDir, 'deck.js'), 'utf8');
  const title = `${deckBrand.full} — ${deckTitle}`;
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(deckDescription)}" />
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#060816" />
<link rel="icon" href="favicon.svg" type="image/svg+xml" />
<link rel="stylesheet" href="deck.css?v=${hash(css)}" />
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<div id="deck-root"></div>
<noscript><p class="noscript">This presentation needs JavaScript. Please turn it on and reload the page.</p></noscript>
<script src="deck.js?v=${hash(js)}" defer></script>
</body>
</html>
`;
  writeFileSync(join(outDir, 'index.html'), html, 'utf8');

  // 5. Guard: the folder must not depend on anything outside itself.
  const files = readdirSync(outDir).sort();
  const expected = ['deck.css', 'deck.js', 'favicon.svg', 'index.html'];
  if (JSON.stringify(files) !== JSON.stringify(expected)) {
    throw new Error(`Unexpected files in public/summary: ${files.join(', ')}`);
  }
  for (const [name, text] of [
    ['index.html', html],
    ['deck.css', css],
  ]) {
    if (/\/_next\/|url\(\s*['"]?\/(?!\/)/.test(text)) {
      throw new Error(`${name} references a path outside the summary folder`);
    }
  }
  if (/navision/i.test(html + css + js)) {
    throw new Error('The deck still mentions the source brand');
  }
  // There is no Node `process` in the browser: every env read must be inlined.
  const envReads = js.match(/process\.env\.[A-Z_]+/g);
  if (envReads) {
    throw new Error(`deck.js reads environment variables at runtime: ${envReads.join(', ')}`);
  }

  const kb = (text) => `${(Buffer.byteLength(text) / 1024).toFixed(0)} kB`;
  console.log(
    `✅ public/summary/ ready — index.html ${kb(html)}, deck.css ${kb(css)}, deck.js ${kb(js)}`,
  );
}

main().catch((error) => {
  console.error('✗ Building the /summary deck failed:', error);
  process.exit(1);
});
