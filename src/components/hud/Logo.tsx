import { useState } from 'react';

/** Inline SVG fallback (blue circle + Q) if the logo image fails. */
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
      <circle cx='32' cy='32' r='30' fill='#04060a' stroke='#5eeaff' stroke-width='2'/>
      <text x='32' y='42' font-size='30' font-family='Inter,sans-serif' fill='#fff' text-anchor='middle'>Q</text>
    </svg>`,
  );

type Props = { className?: string };

/**
 * Circular Quantum Qubit logo (ported from last year's site) with a
 * neon ring glow and an SVG fallback on load error.
 */
export function Logo({ className = 'w-10 h-10' }: Props) {
  const [src, setSrc] = useState('/quantum-qubit-logo.jpeg');
  return (
    <img
      src={src}
      alt="Quantum Qubit"
      onError={() => setSrc(FALLBACK)}
      className={`${className} rounded-full object-cover qq-neon`}
      loading="lazy"
    />
  );
}
