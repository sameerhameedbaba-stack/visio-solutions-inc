'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { Faq } from '@/content/types';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  faqs: Faq[];
  /** Optional heading id for aria-labelledby wiring by the parent section. */
  className?: string;
}

/** Accessible FAQ accordion: native buttons, aria-expanded, single-open pattern. */
export function FAQSection({ faqs, className }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div
      className={cn(
        'divide-y divide-border rounded-card border border-border bg-surface',
        className,
      )}
    >
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div key={faq.question}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:px-6"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-shrink-0 text-subtle-foreground transition-transform duration-200',
                    isOpen && 'rotate-180 text-accent',
                  )}
                  aria-hidden="true"
                />
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
