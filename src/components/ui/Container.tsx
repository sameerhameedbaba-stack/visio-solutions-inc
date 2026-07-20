import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Narrower editorial width for text-heavy content. */
  width?: 'default' | 'wide' | 'prose';
}

const widths = {
  default: 'max-w-content',
  wide: 'max-w-wide',
  prose: 'max-w-prose',
};

export function Container({
  children,
  className,
  as: Tag = 'div',
  width = 'default',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', widths[width], className)}>
      {children}
    </Tag>
  );
}
