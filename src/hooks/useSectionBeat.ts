import { useRef, useEffect, type MutableRefObject } from 'react';

export type Beat = {
  /** Continuous section index: integer exactly when a section is at viewport top. */
  beat: MutableRefObject<number>;
  /** Number of snap sections currently in the DOM. */
  count: MutableRefObject<number>;
  /** True when the section the scroll is currently inside is taller than
   *  ~1.25 viewports (e.g. the long events list) — the ring holds still
   *  through these so it never hangs mid-rotation. */
  tall: MutableRefObject<boolean>;
};

/**
 * Tracks a continuous "section beat" from the scroll position relative
 * to every [data-snap-section] element's offsetTop. When the page is
 * snapped to a section top, `beat` is an integer — which lets the WebGL
 * scene park the orbital ring in a clean aligned orientation exactly at
 * each scroll rest. Ref-only: never triggers a React re-render.
 */
export function useSectionBeat(): Beat {
  const beat = useRef(0);
  const count = useRef(1);
  const tall = useRef(false);

  useEffect(() => {
    let offsets: number[] = [];

    const measure = () => {
      const els = Array.from(
        document.querySelectorAll('[data-snap-section]'),
      ) as HTMLElement[];
      offsets = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
      count.current = Math.max(1, offsets.length);
    };

    const compute = () => {
      if (offsets.length === 0) { beat.current = 0; tall.current = false; return; }
      const y = window.scrollY;
      let i = 0;
      while (i < offsets.length - 1 && offsets[i + 1] <= y + 1) i++;
      const top = offsets[i];
      const next = offsets[i + 1] ?? top + window.innerHeight;
      const span = Math.max(1, next - top);
      const frac = Math.min(1, Math.max(0, (y - top) / span));
      beat.current = i + frac;
      // A section taller than ~1.25 screens is a "scroll-through" block
      // (events list, rules) — flag it so the ring freezes there.
      tall.current = span > window.innerHeight * 1.25;
    };

    measure();
    compute();

    const onScroll = () => compute();
    const onResize = () => { measure(); compute(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Re-measure once layout/fonts settle (section heights can shift).
    const t1 = window.setTimeout(() => { measure(); compute(); }, 400);
    const t2 = window.setTimeout(() => { measure(); compute(); }, 1200);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return { beat, count, tall };
}
