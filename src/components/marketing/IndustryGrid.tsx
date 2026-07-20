import { industries } from '@/content/industries';
import { Reveal } from '@/components/ui/Reveal';

/** Industry groupings — adaptable patterns, not claimed sector experience. */
export function IndustryGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry, index) => (
        <Reveal as="li" key={industry.slug} delay={index * 30}>
          <div className="h-full rounded-card border border-border bg-surface p-5 shadow-card">
            <h3 className="text-base font-semibold text-foreground">{industry.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{industry.summary}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
