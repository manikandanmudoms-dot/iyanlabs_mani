import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type Variant = 'primary' | 'brand' | 'outline' | 'ghost-dark';
type Size = 'md' | 'lg';

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: 'arrow' | 'external' | 'none';
  block?: boolean;
  children: ReactNode;
}

function cls({ variant = 'primary', size = 'md', block }: Common) {
  return ['btn', `btn--${variant}`, `btn--${size}`, block ? 'btn--block' : ''].filter(Boolean).join(' ');
}

function Icon({ kind }: { kind: Common['icon'] }) {
  if (kind === 'none') return null;
  return (
    <svg className="btn__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      {kind === 'external' ? (
        <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function ButtonLink({ variant, size, icon = 'arrow', block, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = rest.target === '_blank';
  return (
    <a className={cls({ variant, size, block, children })} {...rest} rel={external ? 'noopener noreferrer' : rest.rel}>
      <span>{children}</span>
      <Icon kind={icon} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function Button({ variant, size, icon = 'arrow', block, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cls({ variant, size, block, children })} {...rest}>
      <span>{children}</span>
      <Icon kind={icon} />
    </button>
  );
}
