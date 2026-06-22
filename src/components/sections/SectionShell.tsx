import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Align = 'left' | 'center';

type ShellProps = {
  id?: string;
  align?: Align;
  /** Full 100svh viewport block (hero/manifesto). Off → natural height with padding. */
  full?: boolean;
  /** Add a dark radial scrim behind content so text reads over the sphere. */
  scrim?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Borealis-style section: min-h-[100svh], vertically centered, with an
 * optional dark radial scrim (anchored where the text sits) so copy
 * reads cleanly over the particle sphere. Content sits in a relative
 * z-[2] layer above the scrim.
 */
export function SectionShell({
  id,
  align = 'left',
  full = true,
  scrim = true,
  className = '',
  children,
}: ShellProps) {
  return (
    <section
      id={id}
      data-snap-section=""
      className={`relative ${full ? 'min-h-[100svh]' : ''} flex flex-col justify-center px-6 md:px-10 py-20 md:py-24 ${className}`}
    >
      {scrim && <div className={align === 'center' ? 'qq-scrim-center' : 'qq-scrim-left'} />}
      <div
        className={`relative z-[2] w-full mx-auto max-w-5xl ${align === 'center' ? 'text-center flex flex-col items-center' : ''}`}
      >
        {children}
      </div>
    </section>
  );
}

type HeadingProps = {
  index?: string;
  badge?: string;
  line1: string;
  line2?: string;
  className?: string;
};

/**
 * Index label + badge + two-line heading. Line 2 renders italic-light
 * at 50% white — the Borealis section-title treatment. Inter bold,
 * tight tracking, very legible.
 */
export function SectionHeading({ index, badge, line1, line2, className = '' }: HeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {(index || badge) && (
        <div className="flex items-center gap-4 mb-5">
          {index && <span className="qq-index">{index}</span>}
          {badge && <span className="qq-badge">{badge}</span>}
        </div>
      )}
      <h2
        className="qq-display text-white"
        style={{ fontSize: 'clamp(2rem, 6.5vw, 4.4rem)' }}
      >
        <span className="block">{line1}</span>
        {line2 && <span className="block qq-display-sub">{line2}</span>}
      </h2>
    </motion.header>
  );
}
