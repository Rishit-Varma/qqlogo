import { useRef, useEffect, type MutableRefObject } from 'react';

/**
 * Ref-only scroll progress hook. Returns a ref whose `.current` is the
 * normalized page scroll in [0, 1]. Never causes a re-render — designed
 * to be sampled from inside useFrame / requestAnimationFrame loops so
 * the WebGL scene can react to scroll without React reconciliation.
 */
export function useScrollProgress(): MutableRefObject<number> {
  const ref = useRef(0);

  useEffect(() => {
    const compute = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const v = window.scrollY / max;
      ref.current = v < 0 ? 0 : v > 1 ? 1 : v;
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return ref;
}
