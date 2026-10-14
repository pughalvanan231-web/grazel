import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

import heroImage from '@/assets/hero-cover.jpg';
import editorialWool from '@/assets/editorial-wool.jpg';
import categoryEssentials from '@/assets/category-essentials.jpg';

interface SlideData {
  title: string;
  image: string;
  ctaMen: string;
  ctaWomen: string;
}

export function HeroSection() {
  // ─── CAMPAIGN SLIDES ───
  const slides: SlideData[] = [
    {
      title: "No Spare Parts",
      image: heroImage,
      ctaMen: "/men",
      ctaWomen: "/women",
    },
    {
      title: "The Wool Edit",
      image: editorialWool,
      ctaMen: "/men",
      ctaWomen: "/women",
    },
    {
      title: "Built to Endure",
      image: categoryEssentials,
      ctaMen: "/men",
      ctaWomen: "/women",
    }
  ];

  // ─── STATE MANAGEMENT ───
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const autoPlayTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);
  const slideDuration = 7000; // 7 seconds per slide

  // ─── CAROUSEL AUTOMATION ───
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) {
        cancelAnimationFrame(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;

      if (elapsed >= slideDuration) {
        elapsedBeforePauseRef.current = 0;
        setDirection(1);
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
        startTimeRef.current = Date.now();
      } else {
        autoPlayTimerRef.current = requestAnimationFrame(tick);
      }
    };

    autoPlayTimerRef.current = requestAnimationFrame(tick);

    return () => {
      if (autoPlayTimerRef.current) {
        cancelAnimationFrame(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying, currentSlideIndex]);

  const handleNextSlide = () => {
    setDirection(1);
    elapsedBeforePauseRef.current = 0;
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    startTimeRef.current = Date.now();
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    elapsedBeforePauseRef.current = 0;
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startTimeRef.current = Date.now();
  };

  const handleMouseEnter = () => {
    if (isPlaying) {
      setIsPlaying(false);
      elapsedBeforePauseRef.current = Date.now() - startTimeRef.current;
    }
  };

  const handleMouseLeave = () => {
    if (!isPlaying && elapsedBeforePauseRef.current > 0) {
      setIsPlaying(true);
    }
  };

  // ─── MOTION SLIDE ANIMATIONS ───
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div 
      className="w-full bg-[#faf8f5] dark:bg-background flex flex-col transition-colors duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── TOP ANNOUNCEMENT BANNER ─── */}
      <div className="w-full bg-[#f4f1ea] dark:bg-secondary/40 border-b border-border/30 py-2.5 text-center flex items-center justify-center">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#6b6254] dark:text-muted-foreground font-mono font-medium">
          1% goes to earth-positive charities
        </span>
      </div>

      {/* ─── MAIN HERO CAROUSEL CONTAINER ─── */}
      <section className="relative w-full aspect-[4/3] md:aspect-[21/9] min-h-[460px] md:min-h-[560px] bg-black overflow-hidden flex items-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover opacity-95"
              fetchpriority="high"
            />
            {/* Soft dark vignette to ensure text readability */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* ─── BOTTOM-LEFT CAMPAIGN OVERLAY ─── */}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-16 z-20 text-left max-w-xl">
          <motion.h1 
            key={`title-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-wide uppercase drop-shadow-md select-none mb-5"
          >
            {currentSlide.title}
          </motion.h1>

          <div className="flex flex-row gap-3">
            <Link to={currentSlide.ctaMen}>
              <Button 
                variant="outline" 
                className="bg-white text-black border-white hover:bg-black hover:text-white hover:border-black rounded-none px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-sm"
              >
                Shop Men's
              </Button>
            </Link>
            <Link to={currentSlide.ctaWomen}>
              <Button 
                variant="outline" 
                className="bg-white text-black border-white hover:bg-black hover:text-white hover:border-black rounded-none px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-sm"
              >
                Shop Women's
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── CAROUSEL NAVIGATION ARROWS (Edgewise) ─── */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 md:left-6 z-30 p-2 text-white/50 hover:text-white transition-colors focus:outline-none hidden md:block"
          aria-label="Previous campaign slide"
        >
          <ChevronLeft className="h-8 w-8 stroke-[1.5]" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 md:right-6 z-30 p-2 text-white/50 hover:text-white transition-colors focus:outline-none hidden md:block"
          aria-label="Next campaign slide"
        >
          <ChevronRight className="h-8 w-8 stroke-[1.5]" />
        </button>
      </section>

      {/* ─── BOTTOM REVIEW RATING STRIP ─── */}
      <div className="w-full bg-[#fcfaf7] dark:bg-card border-b border-border/40 py-4 text-center flex flex-col items-center justify-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#cfa240] text-[#cfa240]" />
          ))}
        </div>
        <span className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#6b6254] dark:text-muted-foreground font-mono font-medium lowercase">
          4.8/ 5 stars on reviews.io
        </span>
      </div>
    </div>
  );
}