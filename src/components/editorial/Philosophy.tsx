import { PILLARS } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditorialReveal } from './EditorialReveal';

export function Philosophy() {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-ivory border-b border-charcoal/10">
      <div className="container">
        {/* Section Heading */}
        <EditorialReveal className="max-w-3xl mb-16 lg:mb-20">
          <p className="eyebrow-luxury mb-4">
            01 / 07 ATELIER REPERTOIRE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight tracking-tight">
            OUR CODE OF EXCELLENCE
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground font-serif italic">
            The Pillars of Old Money Refinement
          </p>
        </EditorialReveal>

        {/* 3-Column Luxury Card Grid with subtle lift and gold border transition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, index) => (
            <EditorialReveal
              key={index}
              delay={index * 0.12}
              className="h-full"
            >
              <div
                data-cursor="Read"
                className="group relative bg-white border border-charcoal/10 p-8 lg:p-10 flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-gold"
              >
                {/* Gold Indicator Accent Bar on top */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
                    {pillar.hashtag}
                  </span>
                  <span className="text-xs text-muted-foreground font-serif italic">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-charcoal group-hover:text-gold transition-colors duration-300 mb-4 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-charcoal/10 flex items-center justify-between">
                <Link
                  to={pillar.href}
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal group-hover:text-gold transition-colors flex items-center gap-2"
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <div className="w-2 h-2 rounded-full bg-beige group-hover:bg-gold transition-colors duration-300" />
              </div>
            </div>
          </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
