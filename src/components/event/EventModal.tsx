import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventEntry } from '../../data/events';

type Props = { event: EventEntry | null; onClose: () => void };

/**
 * Event detail overlay. Section ordering mirrors last year's modal:
 * Overview → Categories → Rounds → Rules → Prohibited → Faculty.
 * Bold Inter headings + glass panels, fully readable.
 */
export function EventModal({ event, onClose }: Props) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto my-8 md:my-14 max-w-3xl w-[calc(100%-1.5rem)] qq-glass rounded-2xl px-6 md:px-12 py-10 md:py-14"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] grid place-items-center text-white/60 hover:text-[color:var(--color-cyan)] hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            <div className="qq-index text-[color:var(--color-cyan)] mb-4">Frontier · {event.index} / 09</div>
            <h1 className="qq-display text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 5vw, 3.4rem)' }}>{event.name}</h1>
            <p className="qq-body text-sm md:text-base text-white/65 max-w-xl">{event.tagline}</p>

            {/* Meta */}
            <dl className="mt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4">
              <Meta label="Eligibility" value={event.classes} />
              <Meta label="Team" value={event.participants} />
              <Meta label="Venue" value={event.venue} />
              <Meta label="Rounds" value={event.rounds.length.toString().padStart(2, '0')} />
            </dl>

            <Section eyebrow="01 · Overview" title="Brief">
              <p className="qq-body text-sm md:text-[15px] text-white/75">{event.summary}</p>
            </Section>

            {event.categories && event.categories.length > 0 && (
              <Section eyebrow="02 · Categories" title="Splits">
                <ul className="border-t border-white/10">
                  {event.categories.map((c) => (
                    <li key={c.label} className="grid grid-cols-[8rem_1fr] gap-6 py-4 border-b border-white/10">
                      <span className="qq-label text-[color:var(--color-cyan)]">{c.label}</span>
                      <span className="qq-display text-white/85 text-lg" style={{ letterSpacing: '-0.01em' }}>{c.classes}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section eyebrow={`${event.categories ? '03' : '02'} · Rounds & Flow`} title="Format">
              <ol className="border-t border-white/10">
                {event.rounds.map((r) => (
                  <li key={r.name} className="py-6 border-b border-white/10">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="qq-display text-white text-lg md:text-xl" style={{ letterSpacing: '-0.01em' }}>{r.name}</h3>
                      {r.durationLabel && <span className="qq-label text-[color:var(--color-cyan)] shrink-0">{r.durationLabel}</span>}
                    </div>
                    <p className="qq-body text-sm">{r.description}</p>
                    {r.bullets && (
                      <ul className="mt-3 space-y-1.5 qq-body text-[13px]">
                        {r.bullets.map((b) => (
                          <li key={b} className="flex gap-3"><span className="text-[color:var(--color-cyan)]/70">›</span><span>{b}</span></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </Section>

            <Section eyebrow={`${event.categories ? '04' : '03'} · Rules`} title="Conditions">
              <ol className="border-t border-white/10">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="grid grid-cols-[3rem_1fr] gap-4 md:gap-8 py-4 border-b border-white/10">
                    <span className="qq-index text-[color:var(--color-cyan)] pt-1">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className="qq-body text-sm">{rule}</span>
                  </li>
                ))}
              </ol>
            </Section>

            {event.prohibited && event.prohibited.length > 0 && (
              <Section eyebrow={`${event.categories ? '05' : '04'} · Prohibited`} title="Banned" accent="rgba(255,120,120,0.9)">
                <ul className="border-t border-[rgba(255,120,120,0.18)]">
                  {event.prohibited.map((p) => (
                    <li key={p} className="flex gap-4 py-4 border-b border-[rgba(255,120,120,0.14)] qq-body text-sm text-white/75">
                      <span style={{ color: 'rgba(255,140,140,0.9)' }}>×</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {event.teacherInCharges.length > 0 && (
              <Section eyebrow={`${event.prohibited ? '06' : event.categories ? '05' : '04'} · Faculty`} title="In Charge">
                <ul className="border-t border-white/10">
                  {event.teacherInCharges.map((t) => (
                    <li key={t} className="flex items-baseline justify-between gap-4 py-4 border-b border-white/10">
                      <span className="qq-display text-white/85 text-base md:text-lg" style={{ letterSpacing: '-0.01em' }}>{t}</span>
                      <span className="qq-label text-[color:var(--color-cyan)]/70">Coordinator</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <div className="mt-10 border-t border-white/10 pt-7">
              <button onClick={onClose} className="qq-label text-white/45 hover:text-[color:var(--color-cyan)] transition-colors">← back to frontiers</button>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4 border-b border-white/10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-l-white/10 md:[&:not(:first-child)]:pl-5 md:[&:not(:last-child)]:pr-5">
      <dt className="qq-label text-white/40 mb-2">{label}</dt>
      <dd className="qq-body text-[13px] text-white/80">{value}</dd>
    </div>
  );
}

function Section({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <header className="mb-6">
        <div className="qq-label mb-2" style={{ color: accent ?? undefined }}>{eyebrow}</div>
        <h2 className="qq-display text-white" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: accent ?? undefined }}>{title}</h2>
      </header>
      {children}
    </section>
  );
}
