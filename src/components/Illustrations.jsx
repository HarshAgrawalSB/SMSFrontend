/**
 * Inline SVG illustrations for consistent branding (no external images).
 * Use currentColor or theme vars so they adapt to context.
 */

export function IconPrograms(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h8" />
    </svg>
  );
}

/** Education / graduation style for login brand panel */
export function IllustrationLoginHero({ className, ...props }) {
  return (
    <svg
      width="280"
      height="200"
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`login-hero-illustration ${className || ''}`.trim()}
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id="ill-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="ill-grad2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Book stack */}
      <rect x="60" y="100" width="160" height="80" rx="6" fill="url(#ill-grad2)" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="70" y="92" width="140" height="12" rx="2" fill="var(--bg-card)" stroke="var(--border)" strokeOpacity="0.6" />
      <line x1="80" y1="108" x2="200" y2="108" stroke="var(--text-muted)" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="80" y1="118" x2="160" y2="118" stroke="var(--text-muted)" strokeOpacity="0.4" strokeWidth="1" />
      {/* Graduation cap */}
      <path d="M140 40 L200 70 L140 100 L80 70 Z" fill="url(#ill-grad1)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1="140" y1="100" x2="140" y2="130" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="2" />
      <circle cx="140" cy="132" r="8" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeOpacity="0.6" />
      {/* Decorative dots */}
      <circle cx="50" cy="140" r="4" fill="var(--accent)" fillOpacity="0.25" />
      <circle cx="230" cy="120" r="5" fill="var(--accent-secondary)" fillOpacity="0.2" />
      <circle cx="240" cy="160" r="3" fill="var(--accent)" fillOpacity="0.2" />
    </svg>
  );
}

/** Empty state: no items (leads, students, etc.) */
export function IllustrationEmpty(props) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="empty-state-illustration"
      aria-hidden
      {...props}
    >
      <circle cx="60" cy="60" r="44" stroke="var(--border)" strokeWidth="2" fill="var(--overlay-light)" />
      <path d="M40 52h40M40 60h32M40 68h40" stroke="var(--text-muted)" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      <rect x="44" y="38" width="32" height="22" rx="2" stroke="var(--text-muted)" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
