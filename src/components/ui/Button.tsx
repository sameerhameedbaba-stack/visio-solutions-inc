import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-input transition-colors duration-200 ease-natural focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap';

const sizes: Record<Size, string> = {
  md: 'min-h-[44px] px-5 text-[0.95rem]',
  lg: 'min-h-[52px] px-7 text-base',
};

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-hover shadow-sm',
  secondary:
    'bg-surface text-foreground border border-border hover:border-brand hover:text-accent active:bg-surface-subtle',
  ghost: 'text-accent hover:bg-brand/10 active:bg-brand/15',
  onDark: 'bg-white text-navy hover:bg-slate-100 active:bg-slate-200',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Trailing icon element (e.g. arrow). Decorative — hidden from assistive tech. */
  trailingIcon?: ReactNode;
  loading?: boolean;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'children' | 'href'> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    trailingIcon,
    loading,
    ...rest
  } = props;

  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      {trailingIcon && !loading && (
        <span aria-hidden="true" className="inline-flex">
          {trailingIcon}
        </span>
      )}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  const { type, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type ?? 'button'} className={classes} aria-busy={loading} {...buttonRest}>
      {content}
    </button>
  );
}
