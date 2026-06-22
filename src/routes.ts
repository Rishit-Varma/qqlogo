/**
 * Single source of truth for the 6 top-level pages of the app.
 * Matches eciv's `currentPage` state model — no react-router; the
 * navbar mutates one `useState<PageKey>` value on App.tsx.
 */
export const PAGES = [
  'home',
  'frontiers',
  'schedule',
  'research',
  'registration',
  'team',
] as const;

export type PageKey = (typeof PAGES)[number];

export const PAGE_LABELS: Record<PageKey, string> = {
  home:         'Home',
  frontiers:    'Frontiers',
  schedule:     'Schedule',
  research:     'Research',
  registration: 'Registration',
  team:         'Team',
};
