import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VIDEO_HERO } from '@/data/content';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const luxuryEase = [0.22, 1, 0.36, 1];

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal"
    >
      {/* Background Video Layer with Parallax Depth */}
      <motion.div
        style={{ y: mediaY, opacity: mediaOpacity }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="relative overflow-hidden bg-charcoal h-full w-full">
          <video
            key={VIDEO_HERO.sources?.[0]?.src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={VIDEO_HERO.poster}
          >
            {VIDEO_HERO.sources?.map((source, idx) => (
              <source key={idx} src={source.src} type={source.type} />
            ))}
          </video>
        </div>

        {/* Dual Signature Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/55 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Hero Content Section with Parallax Pushdown & Fadeout */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-36 pt-28 text-center sm:px-8 md:pb-40 will-change-transform"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: luxuryEase, delay: 0.2 }}
          className="mt-6 font-sans text-xs font-medium uppercase tracking-[0.4em] text-ivory/70 md:text-sm"
        >
          {VIDEO_HERO.welcome || VIDEO_HERO.eyebrow}
        </motion.p>

        {/* Display Typography */}
        <div className="mt-6 space-y-1 sm:space-y-2">
          {VIDEO_HERO.titleLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.25,
                  ease: luxuryEase,
                  delay: 0.25 + idx * 0.12
                }}
                className="font-serif text-[clamp(2.7rem,8.5vw,7.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-ivory select-none"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Subtitle Description */}
        <div className="mt-8 max-w-xl overflow-hidden">
          <motion.p
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, ease: luxuryEase, delay: 0.6 }}
            className="text-sm leading-relaxed text-ivory/70 md:text-lg font-light tracking-wide"
          >
            {VIDEO_HERO.subtitle}
          </motion.p>
        </div>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: luxuryEase, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <Link
            to={VIDEO_HERO.ctaPrimaryHref}
            data-cursor="Explore"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-[#8B6540] text-white text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-md group rounded-xs"
          >
            <span>{VIDEO_HERO.ctaPrimary}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Secondary CTA */}
          <Link
            to={VIDEO_HERO.ctaSecondaryHref}
            data-cursor="Pre-Order"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 group rounded-xs backdrop-blur-xs"
          >
            <span>{VIDEO_HERO.ctaSecondary}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Screen Bottom: Centered Animated Scroll Indicator matching the screenshot */}
      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden="true"
      >
        <div className="flex items-center gap-4">
          <div className="w-5 h-9 rounded-full border border-white/35 flex items-start justify-center p-1 relative overflow-hidden">
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.4, 1]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-1.5 h-1.5 rounded-full bg-gold"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-medium text-white/80">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Desktop Repertoire Indicator on right */}
      <div className="hidden md:flex absolute bottom-6 right-8 z-10 items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-sans text-white/60">
        <a
          href="#philosophy"
          className="flex items-center gap-1.5 text-white/80 hover:text-gold transition-colors"
        >
          <span>Atelier Repertoire</span>
          <ArrowDown className="h-3 w-3 text-gold" />
        </a>
      </div>
    </section>
  );
}

