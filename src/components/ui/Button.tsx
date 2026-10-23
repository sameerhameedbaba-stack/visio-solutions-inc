import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'glass';
type Size = 'md' | 'lg';

const base =
  'group/button relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold rounded-full transition-[background-position,transform,box-shadow,background-color,color] duration-300 ease-natural focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap';

const sizes: Record<Size, string> = {
  md: 'min-h-[44px] px-5 text-[0.95rem]',
  lg: 'min-h-[54px] px-7 text-base',
};

const variants: Record<Variant, string> = {
  // Blue → violet → magenta; white text stays above 4.5:1 across the whole sweep.
  primary:
    'bg-[linear-gradient(100deg,#2563EB_0%,#7C3AED_50%,#DB2777_100%)] bg-[length:200%_100%] bg-left text-white shadow-glow hover:bg-right hover:-translate-y-0.5',
  secondary:
    'bg-surface text-foreground ring-1 ring-inset ring-border shadow-sm hover:ring-spectrum-violet/50 hover:text-accent',
  ghost: 'text-accent hover:bg-spectrum-violet/10 active:bg-spectrum-violet/15',
  onDark: 'bg-white text-ink shadow-lift hover:-translate-y-0.5 hover:bg-slate-100',
  glass:
    'bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md hover:bg-white/20 hover:ring-white/40',
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
