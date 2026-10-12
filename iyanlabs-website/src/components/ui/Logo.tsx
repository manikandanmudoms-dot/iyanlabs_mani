interface Props { inverse?: boolean; }

/** iyanLabs wordmark with a brand tile built from DESIGN.md colours. */
export function Logo({ inverse = false }: Props) {
  return (
    <span className={`logo${inverse ? ' logo--inverse' : ''}`}>
      <svg className="logo__mark" width="34" height="34" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={inverse ? 'lg-i' : 'lg'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7657FF" />
            <stop offset="1" stopColor="#5D39E5" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill={`url(#${inverse ? 'lg-i' : 'lg'})`} />
        <rect x="17" y="27" width="7" height="22" rx="3.5" fill="#fff" />
        <circle cx="20.5" cy="18.5" r="4.5" fill="#EA580C" />
        <path d="M33 15v31a3 3 0 0 0 3 3h12" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <circle cx="48" cy="49" r="3" fill="#42E8D4" />
      </svg>
      <span className="logo__word">iyan<b>Labs</b></span>
    </span>
  );
}
