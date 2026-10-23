import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPillar, services } from '@/content/services';
import { Reveal } from '@/components/ui/Reveal';
import { GlowCard } from '@/components/motion/GlowCard';
import { pillarIcons } from '@/components/marketing/icons';
import { pillarTheme } from '@/components/marketing/pillar-theme';
import { cn } from '@/lib/utils';

/** All seven services, each lit by its pillar's colour on hover. */
export function ServiceSpotlightGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const theme = pillarTheme[service.pillar];
        const Icon = pillarIcons[service.pillar];
        const pillar = getPillar(service.pillar);
        return (
          <Reveal as="li" key={service.slug} delay={(index % 3) * 80} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="group block h-full rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <GlowCard glow={theme.glow} intensity={0.35}>
                <div className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-500 ease-natural group-hover:scale-110"
                      style={{ backgroundImage: theme.gradient }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {pillar && (
                      <span
                        className={cn('text-xs font-bold uppercase tracking-wider', theme.text)}
                      >
                        {pillar.name}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{service.navLabel}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <span
                    className={cn(
                      'mt-5 inline-flex items-center gap-1.5 text-sm font-semibold',
                      theme.text,
                    )}
                  >
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </GlowCard>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
