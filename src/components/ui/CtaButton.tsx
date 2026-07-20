'use client';

import { ArrowRight } from 'lucide-react';
import { Button, type ButtonProps } from './Button';
import { ctas, type CtaKey } from '@/content/ctas';
import { trackEvent } from '@/lib/analytics';

interface CtaButtonProps {
  cta: CtaKey;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  withArrow?: boolean;
  /** Override the default label if a page needs contextual wording. */
  labelOverride?: string;
}

/**
 * Renders a call-to-action link from the centralized CTA registry and records a
 * privacy-safe analytics event on click (no personal data).
 */
export function CtaButton({
  cta,
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  labelOverride,
}: CtaButtonProps) {
  const { label, href, event } = ctas[cta];
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      trailingIcon={withArrow ? <ArrowRight className="h-4 w-4" /> : undefined}
      onClick={() => trackEvent(event)}
    >
      {labelOverride ?? label}
    </Button>
  );
}
