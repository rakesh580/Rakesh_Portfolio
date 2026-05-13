import { useCallback } from 'react';

/**
 * Single source of truth for in-page smooth scrolling.
 *
 * Replaces five copies of `getBoundingClientRect().top + window.scrollY - 80`
 * spread across Header, Hero, Uplink, NexusAgent, etc. If the fixed header
 * height ever changes, you change it here once.
 *
 * Uses `history.replaceState` instead of `pushState` so scrolling through the
 * page does not pollute the browser's back-button history. Anchor still ends
 * up in the address bar for shareable deep links.
 */
const HEADER_OFFSET_PX = 80;

interface ScrollOptions {
  /** Override the default 80px header offset if needed. */
  offset?: number;
  /** Pass false to skip updating the URL hash. Defaults to true. */
  updateHash?: boolean;
}

export const useScrollToSection = () => {
  return useCallback((id: string, options: ScrollOptions = {}) => {
    const { offset = HEADER_OFFSET_PX, updateHash = true } = options;
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });

    if (updateHash) {
      // replaceState (not pushState) so the back button still leaves the site
      // in one click instead of walking back through every section the user
      // scrolled past.
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);
};
