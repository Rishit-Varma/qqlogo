import { useState } from 'react';
import { motion } from 'framer-motion';
import { events, type EventEntry } from '../../data/events';
import { EventModal } from '../event/EventModal';
import { SectionShell, SectionHeading } from './SectionShell';

/**
 * Full Frontiers page — the 9-event index as glass cards that open the
 * detail modal. Card grid ported from last year's events layout, in the
 * Borealis dark/cyan aesthetic with Inter headings.
 */
export function FrontiersSection() {
  const [active, setActive] = useState<EventEntry | null>(null);

  return (
    <SectionShell id="frontiers" align="left" full={false} className="pt-28 md:pt-32">
      <SectionHeading index="01 / 09" badge="Frontiers" line1="Nine frontiers." line2="One confluence." />
      <p className="qq-body text-sm md:text-[15px] mt-7 max-w-2xl">
        Quiz to combat robotics, hackathon to debate, model making to mathematical olympiad — nine
        independent frontiers, each judged on rigour. Tap a card for the full brief.
      </p>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {events.map((e) => (
          <motion.button
            key={e.slug}
            type="button"
            onClick={() => setActive(e)}
            variants={{
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const } },
            }}
            className="qq-glass-card group text-left p-6 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="qq-index text-[color:var(--color-cyan)]">/{e.index}</span>
              <span className="qq-label text-white/40">{e.classes}</span>
            </div>
            <h3 className="qq-display text-white text-xl md:text-2xl mb-3 group-hover:text-[color:var(--color-cyan)] transition-colors">
              {e.name}
            </h3>
            <p className="qq-body text-[13px] line-clamp-3 flex-1">{e.tagline}</p>
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="qq-label text-white/40">{e.venue}</span>
              <span className="qq-label text-[color:var(--color-cyan)] group-hover:translate-x-0.5 transition-transform">
                Read More →
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <EventModal event={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}
