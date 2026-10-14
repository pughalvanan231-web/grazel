import { SUSTAINABILITY_PILLARS } from '@/data/content';
import { Check } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

export function Sustainability() {
  return (
    <section id="sustainability" className="py-24 lg:py-32 bg-ivory border-b border-charcoal/10">
      <div className="container">
        {/* Section Header */}
        <EditorialReveal className="max-w-3xl mb-16 lg:mb-20">
          <p className="eyebrow-luxury mb-3">CIRCULAR STEWARDSHIP</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight tracking-tight">
            Conscious Standards from Seed to Seam
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Responsible luxury is not an afterthought; it is our foundation. We honor the soil, the water, and the master craftspeople of Tiruppur.
          </p>
        </EditorialReveal>

        {/* 3 Verified Compliance Blocks with gold verification checkmark badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUSTAINABILITY_PILLARS.map((pillar, idx) => (
            <EditorialReveal
              key={pillar.number}
              delay={idx * 0.12}
              className="h-full"
            >
              <div className="bg-white border border-charcoal/10 p-8 lg:p-12 relative overflow-hidden group hover:border-gold hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                {/* Number in Refined Gold */}
                <div className="font-serif text-5xl lg:text-6xl text-gold font-light mb-6 transition-transform duration-300 origin-left group-hover:scale-105">
                  {pillar.number}
                </div>

                <h3 className="font-serif text-2xl text-charcoal mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
                  {pillar.title}
                </h3>

                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Gold Verification Checkmark Badge: VERIFIED STANDARD ✓ COMPLIANT */}
              <div className="mt-8 pt-6 border-t border-charcoal/10 flex items-center justify-between text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  VERIFIED STANDARD
                </span>
                <span className="text-gold flex items-center gap-1 font-bold">
                  <Check className="h-3 w-3 stroke-[3]" /> COMPLIANT
                </span>
              </div>
            </div>
          </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
