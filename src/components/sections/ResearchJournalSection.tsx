import { motion } from 'framer-motion';
import { site } from '../../data/site';
import { SectionShell, SectionHeading } from './SectionShell';

const CARDS = [
  {
    tag: '01',
    title: 'Submit Paper',
    body: 'Send your original research as a PDF with author affiliations. Format: A4, single column, 11pt body, max 12 pages including figures. Mention your name and school clearly.',
  },
  {
    tag: '02',
    title: 'Contribution Guidelines',
    body: 'Topics span the four QQ frontiers — Physical, Biological, Computational, and Applied sciences. Original work only; all submissions are reviewed by a faculty panel before publication.',
  },
];

export function ResearchJournalSection() {
  return (
    <SectionShell id="research" align="left" full={false} className="pt-28 md:pt-32">
      <SectionHeading index="03" badge="Research Journal" line1="Contribute to" line2="the compendium." />
      <p className="qq-body text-sm md:text-[15px] mt-7 max-w-2xl">
        The Quantum Qubit Research Journal collects original scientific writing from participating
        schools. Submit ahead of the confluence — selected entries are published in the printed
        compendium handed out on confluence day.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map((c, i) => (
          <motion.article
            key={c.tag}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="qq-glass-card p-7"
          >
            <div className="qq-index text-[color:var(--color-cyan)] mb-3">/ {c.tag}</div>
            <h2 className="qq-display text-white text-2xl md:text-3xl mb-4">{c.title}</h2>
            <p className="qq-body text-sm">{c.body}</p>
          </motion.article>
        ))}
      </div>

      <div className="qq-glass-card p-7 mt-6 max-w-2xl">
        <div className="qq-label text-[color:var(--color-cyan)] mb-3">Submit to</div>
        <a href={`mailto:${site.email}`} className="qq-display text-white text-lg md:text-xl hover:text-[color:var(--color-cyan)] transition-colors break-all">
          {site.email}
        </a>
        <p className="qq-body text-[13px] mt-3">Deadline: 23rd July 2025. Include your name and school in the subject line.</p>
      </div>
    </SectionShell>
  );
}
