import { motion } from 'framer-motion';
import { registration } from '../../data/general-rules';
import { CountdownTimer } from './CountdownTimer';
import { SectionShell, SectionHeading } from './SectionShell';

export function RegistrationSection() {
  return (
    <SectionShell id="registration" align="center" full className="pt-28 md:pt-32">
      {/* Pulsing ring emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-24 h-24 mb-10 grid place-items-center"
      >
        <span className="absolute inset-0 rounded-full border border-[color:var(--color-cyan)]/30 animate-ping" />
        <span className="absolute inset-3 rounded-full border border-[color:var(--color-cyan)]/50" />
        <span className="qq-display text-[color:var(--color-cyan)] text-2xl">+</span>
      </motion.div>

      <SectionHeading badge="Registration" line1="Opens" line2="20 July 2025." className="items-center" />

      <p className="qq-body text-sm md:text-[15px] mt-7 max-w-xl text-center">
        Participant registration is handled by school representatives. The orientation form must be
        completed by Thursday, {registration.orientationDeadline}. The participant window opens{' '}
        {registration.windowOpens} and closes {registration.windowCloses}.
      </p>

      <div className="qq-glass-card p-7 mt-10">
        <div className="qq-label text-[color:var(--color-cyan)] mb-5 text-center">Registration opens in</div>
        <CountdownTimer />
      </div>
    </SectionShell>
  );
}
