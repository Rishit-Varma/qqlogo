import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ceremonies, registration, host } from '../../data/general-rules';
import { CountdownTimer } from './CountdownTimer';
import { SectionShell, SectionHeading } from './SectionShell';

type DayKey = 'day1' | 'day2';
type Slot = {
  time: string;
  start: number; // minutes since midnight
  end: number;
  label: string;
  venue?: string;
  type: string;
};

const M = (h: number, m: number) => h * 60 + m;

const TIMELINE: Record<DayKey, Slot[]> = {
  day1: [
    { time: '07:30', start: M(7, 30), end: M(8, 30), label: 'Registration & Check-in', venue: 'Main Gate', type: 'registration' },
    { time: '08:30', start: M(8, 30), end: M(9, 30), label: 'Opening Ceremony', venue: 'Auditorium', type: 'ceremony' },
    { time: '09:45', start: M(9, 45), end: M(12, 30), label: 'Round 1 — All Frontiers (parallel)', type: 'competition' },
    { time: '12:30', start: M(12, 30), end: M(13, 30), label: 'Lunch · Quantum Compendium release', venue: 'TT Court', type: 'break' },
    { time: '13:30', start: M(13, 30), end: M(16, 0), label: 'Round 2 — All Frontiers (parallel)', type: 'competition' },
    { time: '16:00', start: M(16, 0), end: M(16, 45), label: 'Refreshment & Networking', type: 'break' },
  ],
  day2: [
    { time: '08:30', start: M(8, 30), end: M(9, 30), label: 'Day 2 Briefing', venue: 'Auditorium', type: 'ceremony' },
    { time: '09:45', start: M(9, 45), end: M(12, 30), label: 'Finals — qualifying frontiers', type: 'competition' },
    { time: '12:30', start: M(12, 30), end: M(13, 30), label: 'Lunch · Judging window opens', type: 'break' },
    { time: '13:30', start: M(13, 30), end: M(16, 30), label: 'Robowarz Skirmish · Bracket finals', venue: '4th Floor', type: 'robotics' },
    { time: '17:00', start: M(17, 0), end: M(18, 0), label: 'Closing Ceremony', venue: 'Auditorium', type: 'ceremony' },
  ],
};

const TYPE_COLOR: Record<string, string> = {
  registration: '#9ca3af',
  ceremony: '#a78bfa',
  competition: '#5eeaff',
  robotics: '#ff8a4d',
  break: '#6ee7b7',
};

type Status = 'upcoming' | 'live' | 'completed';
function statusOf(slot: Slot, nowMin: number): Status {
  if (nowMin >= slot.end) return 'completed';
  if (nowMin >= slot.start) return 'live';
  return 'upcoming';
}
const STATUS_DOT: Record<Status, string> = {
  upcoming: 'bg-emerald-400',
  live: 'bg-yellow-400',
  completed: 'bg-white/30',
};

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function ScheduleSection() {
  const [day, setDay] = useState<DayKey>('day1');
  const now = useClock();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const clock = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const slots = TIMELINE[day];
  const liveIdx = slots.findIndex((s) => statusOf(s, nowMin) === 'live');
  const nextIdx = slots.findIndex((s) => statusOf(s, nowMin) === 'upcoming');

  return (
    <SectionShell id="schedule" align="left" full={false} className="pt-28 md:pt-32">
      <SectionHeading index="02" badge="Schedule" line1="Two days." line2="Live, minute by minute." />

      {/* Live status + clock */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="qq-glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="qq-label text-[color:var(--color-cyan)]">Live Status</span>
            <span className="qq-display text-white text-lg tabular-nums">{clock}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {([['Upcoming', 'bg-emerald-400'], ['Live now', 'bg-yellow-400'], ['Completed', 'bg-white/30']] as const).map(([k, c]) => (
              <span key={k} className="flex items-center gap-2 qq-label text-white/55">
                <span className={`w-2 h-2 rounded-full ${c} ${k === 'Live now' ? 'animate-pulse' : ''}`} />
                {k}
              </span>
            ))}
          </div>
          <div className="qq-body text-[13px] mt-4">
            {liveIdx >= 0
              ? <>Now live · <span className="text-yellow-400">{slots[liveIdx].label}</span></>
              : nextIdx >= 0
                ? <>Next up · <span className="text-[color:var(--color-cyan)]">{slots[nextIdx].time} {slots[nextIdx].label}</span></>
                : 'All sessions for the day are complete.'}
          </div>
        </div>

        <div className="qq-glass-card p-6">
          <div className="qq-label text-[color:var(--color-cyan)] mb-4">Confluence Information</div>
          <dl className="space-y-2.5 qq-body text-[13px]">
            <div className="flex justify-between gap-4"><dt className="text-white/40">Opening</dt><dd>{ceremonies.opening}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-white/40">Closing</dt><dd>{ceremonies.closing}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-white/40">Registration</dt><dd>{registration.windowOpens} → {registration.windowCloses}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-white/40">Host</dt><dd className="text-right">{host.name.split(',')[0]}</dd></div>
          </dl>
        </div>
      </div>

      {/* Day toggle */}
      <div className="mt-10 inline-flex items-center gap-1 qq-glass rounded-full p-1">
        {(['day1', 'day2'] as DayKey[]).map((d) => {
          const active = day === d;
          return (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`relative px-5 py-2.5 rounded-full qq-label transition-colors ${active ? 'text-[#04060a]' : 'text-white/55 hover:text-white'}`}
            >
              {active && <motion.span layoutId="day-pill" className="absolute inset-0 rounded-full bg-[color:var(--color-cyan)]" />}
              <span className="relative z-[1]">{d === 'day1' ? 'Day 01 · Opening' : 'Day 02 · Finale'}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        <motion.ol
          key={day}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 relative border-l border-white/10 ml-2"
        >
          {slots.map((s, i) => {
            const st = statusOf(s, nowMin);
            const accent = TYPE_COLOR[s.type] ?? '#5eeaff';
            return (
              <li key={i} className="relative pl-7 pb-7 last:pb-0">
                <span
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${STATUS_DOT[st]} ${st === 'live' ? 'animate-pulse ring-4 ring-yellow-400/20' : ''}`}
                />
                <div className={`qq-glass-card p-5 ${st === 'live' ? 'border-yellow-400/40' : ''} ${st === 'completed' ? 'opacity-55' : ''}`}>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="qq-index text-[color:var(--color-cyan)]">{s.time}</span>
                    <span className="qq-label" style={{ color: accent }}>
                      {st === 'live' ? '● LIVE' : st === 'completed' ? 'Done' : s.type}
                    </span>
                  </div>
                  <div className="qq-display text-white text-base md:text-lg" style={{ letterSpacing: '-0.01em' }}>{s.label}</div>
                  {s.venue && <div className="qq-label text-white/40 mt-1.5">{s.venue}</div>}
                </div>
              </li>
            );
          })}
        </motion.ol>
      </AnimatePresence>

      {/* Countdown */}
      <div className="qq-glass-card p-6 mt-12">
        <div className="qq-label text-[color:var(--color-cyan)] mb-5">Countdown to the confluence</div>
        <CountdownTimer />
      </div>
    </SectionShell>
  );
}
