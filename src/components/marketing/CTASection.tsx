import { Container } from '@/components/ui/Container';
import { CtaButton } from '@/components/ui/CtaButton';
import type { CtaKey } from '@/content/ctas';

interface CTASectionProps {
  title: string;
  body?: string;
  primary: CtaKey;
  secondary?: CtaKey;
}

/** Calm, high-contrast closing conversion panel. */
export function CTASection({ title, body, primary, secondary }: CTASectionProps) {
  return (
    <section className="py-section-sm">
      <Container>
        <div className="relative overflow-hidden rounded-feature bg-navy px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(37,99,235,0.35), transparent 45%), radial-gradient(circle at 80% 60%, rgba(15,159,154,0.25), transparent 45%)',
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-h2 font-bold text-white">{title}</h2>
            {body && <p className="mt-4 text-body-lg text-slate-300">{body}</p>}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CtaButton cta={primary} variant="onDark" size="lg" withArrow />
              {secondary && (
                <CtaButton
                  cta={secondary}
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
