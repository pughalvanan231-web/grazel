import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import heroImage from '@/assets/hero-cover.jpg';
import editorialWool from '@/assets/editorial-wool.jpg';
import heroMain from '@/assets/hero-main.jpg';
import categoryMen from '@/assets/category-men2.png';
import categoryWomen from '@/assets/category-women2.png';
import categoryEssentials from '@/assets/category-essentials.jpg';

interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
  speed: number;
  className: string;
}

const PARALLAX_IMAGES: ParallaxImage[] = [
  {
    id: 1,
    src: editorialWool,
    alt: 'Virgin Wool Fleece',
    speed: -0.6,
    className: 'top-[8%] left-[3%] w-44 md:w-56',
  },
  {
    id: 2,
    src: categoryEssentials,
    alt: 'Enduring Weave',
    speed: 0.65,
    className: 'bottom-[8%] left-[4%] w-40 md:w-52',
  },
  {
    id: 3,
    src: categoryWomen,
    alt: 'Draped Silk Silhouette',
    speed: -0.4,
    className: 'top-[22%] left-[18%] w-36 md:w-48 hidden md:block',
  },
  {
    id: 4,
    src: heroImage,
    alt: 'Cashmere Blend Craft',
    speed: 0.5,
    className: 'top-[20%] right-[18%] w-36 md:w-48 hidden md:block',
  },
  {
    id: 5,
    src: categoryMen,
    alt: 'Bespoke Tailoring',
    speed: -0.65,
    className: 'top-[8%] right-[3%] w-44 md:w-56 hidden sm:block',
  },
  {
    id: 6,
    src: heroMain,
    alt: 'Hand Finished Atelier',
    speed: 0.45,
    className: 'bottom-[8%] right-[4%] w-40 md:w-52',
  },
];

function FloatingImage({
  img,
  progress,
}: {
  img: ParallaxImage;
  progress: any;
}) {
  const y = useTransform(progress, [0, 1], [img.speed * -90, img.speed * 90]);

  return (
    <motion.div
      style={{ y }}
      className={`absolute ${img.className} aspect-[3/4] overflow-hidden rounded-2xl shadow-xl ring-1 ring-inset ring-black/10 z-10 will-change-transform bg-cream`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover select-none pointer-events-none"
        loading="lazy"
      />
    </motion.div>
  );
}

export function Parallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[720px] lg:min-h-[820px] w-full overflow-hidden bg-[#F7F5F0] flex items-center justify-center py-20 select-none border-b border-charcoal/10"
    >
      {/* ── Scattered Background Editorial Images with Framer Motion Parallax ── */}
      {PARALLAX_IMAGES.map((img) => (
        <FloatingImage key={img.id} img={img} progress={smoothProgress} />
      ))}

      {/* ── Floating Foreground Center Card ── */}
      <div className="relative z-20 max-w-xl mx-auto px-6 text-center pointer-events-auto">
        <div className="rounded-3xl border border-white/50 bg-white/40 p-7 md:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md text-center">
          <span className="inline-block px-3.5 py-1 bg-charcoal/5 border border-charcoal/10 rounded-full text-[10px] uppercase font-sans font-semibold tracking-[0.25em] text-charcoal/70 mb-4">
            ATELIER IN MOTION
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight">
            Fashion, caught <span className="italic">in motion.</span>
          </h2>

          <p className="mt-4 text-xs md:text-sm text-charcoal/80 font-sans max-w-md mx-auto leading-relaxed font-light">
            Experience the three-dimensional tactility of garments constructed without short-cuts.
          </p>

          <div className="mt-7 flex justify-center">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-charcoal text-white hover:bg-gold text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md group"
            >
              <span>Explore The Repertoire</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Parallax;

