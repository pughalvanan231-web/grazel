'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PreloaderProps {
  /** Callback fired once preloader exit completes */
  onComplete?: () => void;

  /** Brand title / name (e.g. "GRAZEL" or "Cotton") */
  brandName?: string;
  brandTitle?: string;
  brandAccent?: string;

  /** Subtle tracking tagline */
  tagline?: string;

  /** Duration of counter in ms (default: 1400ms for swift, elegant load) */
  duration?: number;

  /** Origin / archive footer label */
  origin?: string;
  since?: string;
}

export function Preloader({
  onComplete,
  brandName = 'GRAZEL',
  brandTitle,
  brandAccent,
  tagline = 'THE ART OF TIMELESS ELEGANCE',
  duration = 1300,
  origin = 'TIRUPPUR ATELIER',
  since = '2021',
}: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Skip instantly if user prefers reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setCount(100);
      setLeaving(true);
      if (onComplete) onComplete();
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      // Smooth cubic ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(100);
        window.setTimeout(() => {
          setLeaving(true);
        }, 220);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = originalOverflow;
    };
  }, [duration, onComplete]);

  const handleExitComplete = () => {
    document.body.style.overflow = '';
    if (onComplete) onComplete();
  };

  const displayTitle = brandTitle || brandName;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!leaving && (
        <motion.div
          key="simple-editorial-preloader"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-ivory select-none border-b border-charcoal/10"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center px-6 max-w-md w-full text-center">
            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline justify-center gap-2"
            >
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-charcoal font-normal">
                {displayTitle}
              </span>
              {brandAccent && (
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light italic text-gold">
                  {brandAccent}
                </span>
              )}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-3.5 font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.45em] text-muted-foreground"
            >
              {tagline}
            </motion.p>

            {/* Hairline Gold Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-8 h-[1.5px] w-56 sm:w-64 overflow-hidden bg-charcoal/10 relative rounded-full"
            >
              <div
                className="h-full bg-gold transition-all duration-75 ease-linear rounded-full"
                style={{ width: `${count}%` }}
              />
            </motion.div>

            {/* Counter Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-3.5 flex w-56 sm:w-64 items-center justify-between font-sans text-[11px] tracking-[0.2em] text-charcoal/60"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                PREPARING
              </span>
              <span className="font-serif text-xs font-medium text-charcoal tabular-nums">
                {count}%
              </span>
            </motion.div>

            {/* Footer Metadata */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-charcoal/40"
            >
              {origin} · SINCE {since}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
