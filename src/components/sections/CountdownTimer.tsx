import { useEffect, useRef, useState } from 'react';

type Cell = { label: string; value: string };

// Dummy future target (Chapter 2 placeholder) so the countdown always
// shows live, non-zero numbers. Update to the real confluence date later.
const TARGET_ISO = '2026-08-21T08:30:00+05:30';

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function diff(now: Date, target: Date): Cell[] {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [
    { label: 'Days',    value: pad(days)    },
    { label: 'Hours',   value: pad(hours)   },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ];
}

/**
 * Live countdown to the registration window opening on 20 July 2025
 * (08:30 IST). Re-renders once per second; that's the slowest pace
 * that doesn't visibly drift on the seconds cell.
 */
export function CountdownTimer() {
  const target = useRef(new Date(TARGET_ISO));
  const [cells, setCells] = useState<Cell[]>(() => diff(new Date(), target.current));

  useEffect(() => {
    const id = window.setInterval(() => {
      setCells(diff(new Date(), target.current));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-stretch gap-5 md:gap-8">
      {cells.map((c) => (
        <div key={c.label} className="flex flex-col items-center">
          <div
            className="qq-display text-white leading-none tabular-nums"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            {c.value}
          </div>
          <div className="qq-label text-white/40 mt-2">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
