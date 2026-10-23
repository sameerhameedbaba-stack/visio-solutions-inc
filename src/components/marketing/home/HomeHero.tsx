import ShinyText from '@/components/bits/ShinyText';
import { Container } from '@/components/ui/Container';
import { CtaButton } from '@/components/ui/CtaButton';
import { Reveal } from '@/components/ui/Reveal';
import { ColorField } from '@/components/motion/ColorField';
import { HeroTitle } from '@/components/motion/HeroTitle';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { CapabilityMarquee } from './CapabilityMarquee';
import { CapabilityOrbit } from './CapabilityOrbit';

/** Hero colour field: deep ink at the text edge, the full spectrum beyond it. */
const HERO_COLORS = ['#060816', '#1E1B4B', '#2563EB', '#7C3AED', '#DB2777', '#F97316'];

/**
 * Homepage hero: full-height ink band on a live, pointer-reactive colour field
 * (React Bits Grainient), a headline that rises line by line (GSAP SplitText),
 * the capability orbit, and a capability ribbon (React Bits LogoLoop).
 *
 * A left-weighted scrim keeps the copy at AA contrast whatever the shader is
 * showing beneath it.
 */
export function HomeHero() {
  return (
    <section className="ink grain relative isolate -mt-[var(--header-h)] flex min-h-[100svh] flex-col overflow-hidden">
      <ColorField
        colors={HERO_COLORS}
        angle={100}
        speed={0.55}
        flow={1.1}
        scale={1.2}
        interactive
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />

      <Container
        width="wide"
        className="relative flex flex-1 items-center pb-8 pt-[calc(var(--header-h)+2.5rem)] lg:pt-[calc(var(--header-h)+1.25rem)]"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-eyebrow font-semibold uppercase tracking-wider backdrop-blur-md">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spectrum-magenta opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-spectrum" />
                </span>
                <ShinyText
                  text="Software, AI and automation for business operations"
                  color="rgba(226, 232, 240, 0.9)"
                  shineColor="#ffffff"
                  speed={3.2}
                  delay={1.2}
                />
              </span>
            </Reveal>
            <HeroTitle
              text="Build the systems your business needs to operate, automate, and grow."
              highlight="operate, automate, and grow."
              className="max-w-[20ch] text-display font-extrabold text-white"
              delay={0.15}
            />
            <Reveal delay={350}>
              <p className="max-w-xl text-body-lg text-white/80">
                Visio Solutions designs and develops custom software, connected workflows, practical
                AI systems, security-conscious digital infrastructure, and measurable growth
                programs around the way your organization actually works.
              </p>
            </Reveal>
            <Reveal delay={480}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton>
                  <CtaButton cta="discussProject" size="lg" withArrow />
                </MagneticButton>
                <CtaButton
                  cta="exploreServices"
                  variant="glass"
                  size="lg"
                  labelOverride="Explore our capabilities"
                />
              </div>
            </Reveal>
          </div>
          <div className="hidden lg:block">
            <Reveal delay={300}>
              <CapabilityOrbit />
            </Reveal>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10 bg-ink/40 py-5 backdrop-blur-sm">
        <CapabilityMarquee />
      </div>
    </section>
  );
}
