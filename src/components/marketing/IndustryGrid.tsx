import { industries } from '@/content/industries';
import { Reveal } from '@/components/ui/Reveal';

const ACCENTS = [
  'linear-gradient(135deg, #2563EB, #06B6D4)',
  'linear-gradient(135deg, #7C3AED, #DB2777)',
  'linear-gradient(135deg, #F97316, #E11D48)',
  'linear-gradient(135deg, #0D9488, #10B981)',
  'linear-gradient(135deg, #4F46E5, #0EA5E9)',
] as const;

/** Industry groupings — adaptable patterns, not claimed sector experience. */
export function IndustryGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        return (
          <Reveal as="li" key={industry.slug} delay={(index % 3) * 70} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-card border border-border bg-surface p-6 shadow-lift transition-all duration-300 ease-natural hover:-translate-y-1 hover:shadow-glow">
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundImage: accent }}
                aria-hidden="true"
              />
              <span
                className="inline-block h-2.5 w-10 rounded-full"
                style={{ backgroundImage: accent }}
                aria-hidden="true"
              />
              <h3 className="mt-4 text-lg font-bold text-foreground">{industry.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {industry.summary}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
