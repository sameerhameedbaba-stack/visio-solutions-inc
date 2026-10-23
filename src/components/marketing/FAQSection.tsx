'use client';

import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import type { Faq } from '@/content/types';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  faqs: Faq[];
  className?: string;
}

/**
 * Accessible FAQ accordion: native buttons, aria-expanded, single-open pattern.
 * Closed panels are `hidden`, so their content stays out of the tab order and
 * the accessibility tree. The open item is marked by a spectrum ring and a
 * rotating plus.
 */
export function FAQSection({ faqs, className }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div
            key={faq.question}
            className={cn(
              'overflow-hidden rounded-card border bg-surface transition-[border-color,box-shadow] duration-300',
              isOpen ? 'border-spectrum-violet/40 shadow-glow' : 'border-border shadow-sm',
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-spectrum-violet sm:px-6"
              >
                <span>{faq.question}</span>
                <span
                  className={cn(
                    'inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300',
                    isOpen
                      ? 'rotate-45 bg-[linear-gradient(135deg,#2563EB,#7C3AED)] text-white'
                      : 'bg-surface-subtle text-subtle-foreground',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-6 sm:px-6"
            >
              <p className="max-w-prose text-muted-foreground">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
