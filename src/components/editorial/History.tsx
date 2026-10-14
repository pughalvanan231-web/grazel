import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MILESTONES } from '@/data/content';

export function History() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end 85%'],
  });

  // scrub: 0.5 spring physics
  const scrubProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(scrubProgress, [0, 1], [0, 1]);

  return (
    <section id="history" ref={containerRef} className="py-24 lg:py-36 bg-ivory border-b border-charcoal/10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Header with Subtitle & Anniversary Quote Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-8">
            <div>
              <p className="eyebrow-luxury mb-3.5">
                CHRONOLOGY OF EXCELLENCE
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight leading-tight">
                The Evolution of Our Atelier
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                A lineage of relentless refinement, architectural silhouettes, and pure textile integrity rooted in the cradle of Tiruppur weaving.
              </p>
            </div>

            {/* Anniversary Quote Card */}
            <div className="bg-cream border border-charcoal/10 p-7 shadow-xs relative">
              <span className="font-serif text-5xl text-gold/20 absolute top-4 right-4 leading-none select-none">
                “
              </span>
              <p className="font-serif italic text-base sm:text-lg text-charcoal leading-relaxed relative z-10 mb-4">
                Five years of refusing compromise. Every milestone marks a deeper communion with our master weavers and natural fibres.
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-charcoal/10">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-gold">
                  TIRUPPUR ARCHIVE ARCHITECTURE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable Milestone Timeline with Animated Vertical Hairline */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-12">
            {/* Background static hairline */}
            <div className="absolute top-4 bottom-4 left-4 sm:left-6 w-[1px] -translate-x-1/2 bg-charcoal/15" />

            {/* Animated vertical hairline that scales down as user scrolls */}
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="absolute top-4 bottom-4 left-4 sm:left-6 w-[2px] -translate-x-1/2 bg-gold origin-top shadow-[0_0_8px_rgba(166,124,82,0.6)]"
            />

            {/* Milestones List */}
            <div className="space-y-12 sm:space-y-16">
              {MILESTONES.map((milestone, idx) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: 'easeOut',
                  }}
                  className="relative group bg-white border border-charcoal/10 p-8 sm:p-10 shadow-xs hover:border-gold hover:shadow-md transition-colors duration-300"
                >
                  {/* Timeline Node Point — centered precisely on the vertical line */}
                  <div className="absolute -left-8 sm:-left-12 top-10 w-8 sm:w-12 flex items-center justify-center pointer-events-none">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-125 shadow-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mb-3 border-b border-charcoal/5 pb-3">
                    <span className="font-serif text-3xl sm:text-4xl text-gold font-light tracking-tight">
                      {milestone.year}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
                      Milestone 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                    {milestone.title}
                  </h3>

                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
