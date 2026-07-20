/**
 * Inline script that sets the theme class before paint to avoid a flash of the
 * wrong theme. Reads a stored preference, falling back to the OS setting.
 * Rendered in <head>. Kept tiny and dependency-free.
 */
const script = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
