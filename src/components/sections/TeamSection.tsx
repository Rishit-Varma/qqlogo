import { motion } from 'framer-motion';
import { heads, teacherInCharges } from '../../data/leadership';
import { SectionShell, SectionHeading } from './SectionShell';

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export function TeamSection() {
  return (
    <SectionShell id="team" align="left" full={false} className="pt-28 md:pt-32">
      <SectionHeading index="06" badge="Our Team" line1="Steering" line2="& faculty." />

      {/* Student heads */}
      <div className="qq-label text-white/40 mt-14 mb-6">Heads · Student Steering</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {heads.map((h, i) => (
          <motion.div
            key={h.name}
            {...reveal}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="qq-glass-card p-6"
          >
            <h3 className="qq-display text-white text-xl mb-2">{h.name}</h3>
            <div className="qq-label text-[color:var(--color-cyan)]/80">{h.portfolio}</div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[color:var(--color-cyan)] to-transparent rounded-full mt-4" />
          </motion.div>
        ))}
      </div>

      {/* Faculty in-charges */}
      <div className="qq-label text-white/40 mt-16 mb-6">Teacher In-Charges · Per Frontier</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teacherInCharges.map((t, i) => (
          <motion.div
            key={t.event}
            {...reveal}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="qq-glass-card p-5"
          >
            <div className="qq-display text-white text-base md:text-lg mb-1" style={{ letterSpacing: '-0.01em' }}>{t.event}</div>
            <div className="qq-label text-white/45">{t.teachers.join(' · ')}</div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
