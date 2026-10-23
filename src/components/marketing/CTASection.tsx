import { Container } from '@/components/ui/Container';
import { CtaButton } from '@/components/ui/CtaButton';
import { Reveal } from '@/components/ui/Reveal';
import { ColorField } from '@/components/motion/ColorField';
import { MagneticButton } from '@/components/motion/MagneticButton';
import type { CtaKey } from '@/content/ctas';

interface CTASectionProps {
  title: string;
  body?: string;
  primary: CtaKey;
  secondary?: CtaKey;
}

/** The brand's signature colour field, deep on one edge so text stays legible. */
const CTA_COLORS = ['#0A0E2A', '#312E81', '#7C3AED', '#DB2777', '#F97316'];

/**
 * Closing conversion band on a live colour field (React Bits Grainient), with
 * magnetic buttons. A central scrim keeps the copy at AA contrast over every hue.
 */
export function CTASection({ title, body, primary, secondary }: CTASectionProps) {
  return (
    <section className="py-section-sm">
      <Container>
        <Reveal>
          <div className="ink grain relative isolate overflow-hidden rounded-feature px-6 py-16 text-center shadow-glow-lg sm:px-12 sm:py-20">
            <ColorField colors={CTA_COLORS} angle={115} speed={0.6} flow={0.9} interactive />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,22,.72)_0%,rgba(6,8,22,.45)_60%,rgba(6,8,22,.15)_100%)]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-h2 font-extrabold text-white">{title}</h2>
              {body && <p className="mt-5 text-body-lg text-white/85">{body}</p>}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <MagneticButton>
                  <CtaButton cta={primary} variant="onDark" size="lg" withArrow />
                </MagneticButton>
                {secondary && <CtaButton cta={secondary} variant="glass" size="lg" />}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
