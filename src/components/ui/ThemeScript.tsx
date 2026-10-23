/**
 * Inline script run in <head> before first paint. It:
 *   - sets the theme class from a stored preference, falling back to the OS
 *     setting, so the wrong theme never flashes;
 *   - adds `js` to <html>, which lets CSS hide animated content up front only
 *     when JavaScript is actually available to reveal it again.
 * Kept tiny and dependency-free.
 */
const script = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){d.classList.add('dark');}else{d.classList.remove('dark');}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
