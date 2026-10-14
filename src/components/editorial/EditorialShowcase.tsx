'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ImageReveal } from './ImageReveal';

export interface EditorialShowcaseProps {
  /** Primary background image (Next.js <Image /> or standard <img>) */
  primaryImage?: React.ReactNode;
  primarySrc?: string;
  primaryAlt?: string;

  /** Secondary overlapping foreground image (Next.js <Image /> or standard <img>) */
  secondaryImage?: React.ReactNode;
  secondarySrc?: string;
  secondaryAlt?: string;

  /** Overlapping circular badge text at top-left */
  badgeText?: string;
  badgeYear?: string;
  badgeSubtext?: string;

  /** White caption card content placed below secondary image */
  captionEyebrow?: string;
  captionTitle?: string;
  captionDescription?: string;

  /** Additional classes for container */
  className?: string;

  /** Secondary card placement: 'bottom-right' (default) or 'bottom-left' */
  secondaryPosition?: 'bottom-right' | 'bottom-left';
}

export function EditorialShowcase({
  primaryImage,
  primarySrc,
  primaryAlt = 'Editorial Primary Image',
  secondaryImage,
  secondarySrc,
  secondaryAlt = 'Editorial Secondary Image',
  badgeText = 'SINCE',
  badgeYear = '2001',
  badgeSubtext = 'ATELIER',
  captionEyebrow = 'APPAREL MANUFACTURING',
  captionTitle = 'Atelier Tailoring Heritage',
  captionDescription = 'Quality garments, ethical practices, and deliberate innovation.',
  className = '',
  secondaryPosition = 'bottom-right',
}: EditorialShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Synchronized Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress [0, 1] -> [60, -60] for smooth upward glide
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const isBottomRight = secondaryPosition === 'bottom-right';

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-xl lg:max-w-none mx-auto pb-14 sm:pb-20 lg:pb-24 ${
        isBottomRight ? 'pr-4 sm:pr-8 lg:pr-12' : 'pl-4 sm:pl-8 lg:pl-12'
      } ${className}`}
    >
      {/* ── Top-Left Floating Circular Badge ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute -top-6 -left-4 sm:-top-8 sm:-left-6 md:-top-10 md:-left-8 z-30 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-cream/95 backdrop-blur-md border border-charcoal/15 shadow-2xl flex flex-col items-center justify-center text-center p-2 select-none group"
        aria-label={`${badgeText} ${badgeYear} ${badgeSubtext}`}
      >
        <div className="absolute inset-1.5 rounded-full border border-dashed border-gold/40 transition-transform duration-700 group-hover:rotate-45" />
        <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-gold leading-none">
          {badgeText}
        </span>
        <span className="font-serif text-base sm:text-lg md:text-xl font-normal text-charcoal my-0.5 leading-none">
          {badgeYear}
        </span>
        <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.2em] text-muted-foreground leading-none">
          {badgeSubtext}
        </span>
      </motion.div>

      {/* ── 1. Main Primary Image (4:5 Aspect Ratio) ───────────────── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal/5 border border-charcoal/10 shadow-xl group">
        <ImageReveal
          src={primarySrc}
          alt={primaryAlt}
          delay={0}
          aspectRatio="aspect-[4/5]"
          priority={false}
          className="w-full h-full"
        >
          {primaryImage}
        </ImageReveal>

        {/* Subtle Luxury Film Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── 2. Overlapping Secondary Card with Parallax Glide ───────── */}
      <motion.div
        style={{ y }}
        className={`absolute -bottom-8 sm:-bottom-12 md:-bottom-14 ${
          isBottomRight ? '-right-2 sm:-right-6 md:-right-8' : '-left-2 sm:-left-6 md:-left-8'
        } w-[72%] sm:w-[65%] max-w-[340px] sm:max-w-[400px] z-20 will-change-transform bg-white p-2 sm:p-2.5 md:p-3 shadow-2xl border border-charcoal/10`}
      >
        {/* Secondary Image with Staggered Curtain Reveal & Counter Zoom */}
        <div className="relative overflow-hidden bg-secondary">
          <ImageReveal
            src={secondarySrc}
            alt={secondaryAlt}
            delay={0.15}
            aspectRatio="aspect-[4/5]"
            priority={false}
            className="w-full h-full"
          >
            {secondaryImage}
          </ImageReveal>
        </div>

        {/* White Caption Card Below Secondary Image */}
        {(captionEyebrow || captionTitle || captionDescription) && (
          <div className="bg-white p-3.5 sm:p-4.5 pt-3 sm:pt-4 border-t border-charcoal/10 mt-2 sm:mt-2.5">
            {captionEyebrow && (
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold block mb-1">
                {captionEyebrow}
              </span>
            )}
            {captionTitle && (
              <h4 className="text-xs sm:text-sm font-serif text-charcoal font-medium leading-snug">
                {captionTitle}
              </h4>
            )}
            {captionDescription && (
              <p className="text-[11px] sm:text-xs text-muted-foreground font-sans leading-relaxed mt-1">
                {captionDescription}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default EditorialShowcase;
