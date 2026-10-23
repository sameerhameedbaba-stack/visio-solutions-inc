/**
 * Wrap the first occurrence of `highlight` within `text` in a spectrum-gradient
 * span. Shared by server components (SectionHeading) and client components
 * (HeroTitle), so it lives outside any 'use client' module.
 */
export function renderWithHighlight(text: string, highlight?: string) {
  if (!highlight) return text;
  const at = text.indexOf(highlight);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-spectrum">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}
