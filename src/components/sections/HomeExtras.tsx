import { motion } from 'framer-motion';
import { SectionShell, SectionHeading } from './SectionShell';
import { generalRules, ceremonies } from '../../data/general-rules';
import type { PageKey } from '../../routes';

const reveal = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/** A near-empty "breather" — just the sphere and one centered line. */
export function BreatherSection() {
  return (
    <SectionShell align="center" scrim={false}>
      <motion.p
        {...reveal}
        className="qq-display text-white/85"
        style={{ fontSize: 'clamp(1.6rem, 5vw, 3.2rem)', lineHeight: 1.1 }}
      >
        Build it. Defend it.<br />
        <span className="qq-display-sub">From first principles.</span>
      </motion.p>
    </SectionShell>
  );
}

/** Schedule teaser linking to the full schedule page. */
export function SchedulePreview({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  return (
    <SectionShell id="schedule-preview" align="left">
      <SectionHeading index="03" badge="The Schedule" line1="Two days." line2="Opening to closing." />
      <motion.div {...reveal} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="qq-glass-card p-6">
          <div className="qq-label text-[color:var(--color-cyan)] mb-3">Day 01 · Opening</div>
          <div className="qq-display text-white text-2xl md:text-3xl">{ceremonies.opening}</div>
          <p className="qq-body text-sm mt-3">Opening ceremony, then Round 1 across every frontier in parallel.</p>
        </div>
        <div className="qq-glass-card p-6">
          <div className="qq-label text-[color:var(--color-cyan)] mb-3">Day 02 · Finale</div>
          <div className="qq-display text-white text-2xl md:text-3xl">{ceremonies.closing}</div>
          <p className="qq-body text-sm mt-3">Finals, Robowarz bracket, and the closing ceremony.</p>
        </div>
      </motion.div>
      <button onClick={() => onNavigate('schedule')} className="qq-btn qq-btn-ghost group mt-10">
        Full schedule
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </button>
    </SectionShell>
  );
}

/** General rules as a numbered terminal list. */
export function RulesSection() {
  return (
    <SectionShell id="rules" align="left">
      <SectionHeading index="04" badge="Rules of Play" line1="The conditions." line2="Read before you compete." />
      <ol className="mt-10 space-y-3 max-w-3xl">
        {generalRules.map((rule, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.32, delay: Math.min(i * 0.03, 0.3) }}
            className="grid grid-cols-[2.5rem_1fr] gap-4"
          >
            <span className="qq-index text-[color:var(--color-cyan)]/80 pt-1">{(i + 1).toString().padStart(2, '0')}</span>
            <span className="qq-body text-[13px] md:text-sm">{rule}</span>
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}

/** Closing CTA. */
export function ClosingSection({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  return (
    <SectionShell id="closing" align="center">
      <SectionHeading badge="Join us" line1="Register your" line2="school now." className="items-center" />
      <motion.div {...reveal} className="mt-10 flex flex-wrap gap-3 md:gap-4 justify-center">
        <button onClick={() => onNavigate('registration')} className="qq-btn qq-btn-primary group">
          Register
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        <button onClick={() => onNavigate('frontiers')} className="qq-btn qq-btn-ghost group">
          Explore frontiers
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </motion.div>
    </SectionShell>
  );
}
