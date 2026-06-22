type Props = {
  size?: number;
  inset?: number;
  className?: string;
};

/**
 * Four L-shaped HUD brackets pinned to the corners of the nearest
 * `position: relative` ancestor. Pure CSS, no JS. Used by HudFrame and
 * any section that wants the terminal-frame look.
 */
export function CornerBrackets({ size = 18, inset = 0, className = '' }: Props) {
  const common =
    'absolute pointer-events-none border-cyan transition-opacity duration-300';
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderColor: 'var(--color-cyan)',
    filter: 'drop-shadow(0 0 5px rgba(94,234,255,0.4))',
  } as const;
  const i = `${inset}px`;
  return (
    <>
      <span
        aria-hidden
        className={`${common} ${className}`}
        style={{ ...style, top: i, left: i, borderTop: '1.5px solid', borderLeft: '1.5px solid' }}
      />
      <span
        aria-hidden
        className={`${common} ${className}`}
        style={{ ...style, top: i, right: i, borderTop: '1.5px solid', borderRight: '1.5px solid' }}
      />
      <span
        aria-hidden
        className={`${common} ${className}`}
        style={{ ...style, bottom: i, left: i, borderBottom: '1.5px solid', borderLeft: '1.5px solid' }}
      />
      <span
        aria-hidden
        className={`${common} ${className}`}
        style={{ ...style, bottom: i, right: i, borderBottom: '1.5px solid', borderRight: '1.5px solid' }}
      />
    </>
  );
}
