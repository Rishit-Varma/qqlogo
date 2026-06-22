import { motion } from 'framer-motion';
import { Logo } from '../hud/Logo';
import { site } from '../../data/site';
import { PAGES, PAGE_LABELS, type PageKey } from '../../routes';

type Props = { onNavigate?: (p: PageKey) => void };

export function Footer({ onNavigate }: Props) {
  return (
    <footer className="relative z-[2] border-t border-white/10 bg-[color:var(--color-bg-deep)]/80 px-6 md:px-10 py-14">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Logo className="w-10 h-10" />
            <span className="qq-display text-white text-xl">
              {site.brand.first}<span className="text-[color:var(--color-cyan)]">{site.brand.second}</span>
            </span>
          </div>
          <p className="qq-body text-[13px] max-w-xs">{site.blurb}</p>
          <div className="flex gap-3 mt-5">
            {Object.entries(site.socials).map(([name, url]) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-white/[0.06] grid place-items-center text-[color:var(--color-cyan)] hover:bg-white/10 transition-colors qq-label"
                aria-label={name}
              >
                {name[0].toUpperCase()}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="qq-label text-white/70 mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {PAGES.map((p) => (
              <li key={p}>
                <button
                  onClick={() => onNavigate?.(p)}
                  className="qq-body text-[13px] hover:text-[color:var(--color-cyan)] transition-colors"
                >
                  {PAGE_LABELS[p]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Find us */}
        <div>
          <h3 className="qq-label text-white/70 mb-5">Find Us</h3>
          <a href={`mailto:${site.email}`} className="qq-body text-[13px] hover:text-[color:var(--color-cyan)] transition-colors block mb-4">
            {site.email}
          </a>
          <address className="qq-body text-[13px] not-italic">
            {site.address.map((line) => <div key={line}>{line}</div>)}
          </address>
        </div>

        {/* Map */}
        <div>
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-white/10 mb-3">
            <iframe
              title="Don Bosco School, Park Circus"
              src={site.mapEmbed}
              className="w-full h-full grayscale opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="qq-label text-[color:var(--color-cyan)]">
            Open in Google Maps →
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-12 pt-7 border-t border-white/10">
        <p className="qq-label text-white/40">
          © 2025—26 · Quantum Qubit Science &amp; Technology Confluence · Chapter 02
        </p>
      </div>
    </footer>
  );
}
