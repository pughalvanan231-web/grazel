import { FACTS } from '@/data/content';
import { EditorialReveal } from './EditorialReveal';

export function Facts() {
  return (
    <section id="facts" className="py-24 lg:py-32 bg-charcoal text-ivory border-b border-ivory/15">
      <div className="container">
        {/* Section Header */}
        <EditorialReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light mb-3">
              {FACTS.eyebrow}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
              {FACTS.title}
            </h2>
          </div>
          <p className="text-sm text-ivory/70 max-w-md font-sans leading-relaxed">
            {FACTS.description}
          </p>
        </EditorialReveal>

        {/* 4-Column Stat Highlights with Large Fraunces Font in gold-light */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {FACTS.stats.map((stat, idx) => (
            <EditorialReveal
              key={idx}
              delay={idx * 0.1}
              className="h-full"
            >
              <div className="bg-white/5 border border-ivory/15 p-8 flex flex-col justify-between h-full hover:border-gold-light/60 transition-colors duration-300 group backdrop-blur-xs">
                <div className="w-8 h-0.5 bg-gold-light/40 mb-6 group-hover:w-16 group-hover:bg-gold-light transition-all duration-300" />
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold-light tracking-tight transition-transform duration-300 group-hover:scale-102 origin-left">
                  {stat.value}
                </div>
                <p className="mt-4 text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-ivory/70">
                  {stat.label}
                </p>
              </div>
            </EditorialReveal>
          ))}
        </div>

        {/* Architectural Full-Width Atelier Archive Image with Gradient Scrim and GPS Metadata */}
        <div className="relative overflow-hidden bg-black aspect-[16/9] md:aspect-[21/9] min-h-[340px] md:min-h-[420px] border border-ivory/15 group shadow-2xl cursor-pointer">
          <img
            src={FACTS.image}
            alt={FACTS.caption}
            className="w-full h-full object-cover object-center grayscale contrast-105 opacity-85 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-ivory text-xs gap-3 pt-4 border-t border-ivory/20 backdrop-blur-md bg-charcoal/60 px-5 py-3.5">
            <span className="font-serif tracking-wider text-sm sm:text-base text-ivory/95">
              {FACTS.caption}
            </span>
            <span className="text-gold-light font-mono text-[11px] sm:text-xs tracking-widest flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-light animate-pulse" />
              GPS: 11.1085° N, 77.3411° E
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
