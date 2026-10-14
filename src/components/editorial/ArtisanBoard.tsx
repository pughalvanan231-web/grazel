import { LEADERSHIP } from '@/data/content';
import { EditorialReveal } from './EditorialReveal';

export function ArtisanBoard() {
  return (
    <section id="leadership" className="py-24 lg:py-32 bg-cream border-b border-charcoal/10">
      <div className="container">
        {/* Section Header */}
        <EditorialReveal className="max-w-3xl mb-16 lg:mb-20">
          <p className="eyebrow-luxury mb-3">STEWARDS OF THE CRAFT</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight tracking-tight">
            The Atelier Direction
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Guiding Grazel's tactile evolution with uncompromising dedication to fabric provenance and generational patterning.
          </p>
        </EditorialReveal>

        {/* 3 Master Portrait Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {LEADERSHIP.map((leader, idx) => (
            <EditorialReveal
              key={leader.name}
              delay={idx * 0.12}
              className="h-full"
            >
              <div className="bg-white border border-charcoal/10 group overflow-hidden shadow-xs hover:border-gold hover:shadow-xl transition-all duration-500 h-full">
              {/* Portrait Image with Muted Editorial Filter */}
              <div className="aspect-[4/5] overflow-hidden bg-charcoal relative">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Gold Hairline Corner Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              {/* Card Meta */}
              <div className="p-8">
                <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-gold mb-2">
                  {leader.role}
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-4">
                  {leader.name}
                </h3>
                <p className="text-xs sm:text-sm italic text-muted-foreground font-serif leading-relaxed">
                  "{leader.quote}"
                </p>
              </div>
            </div>
          </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Board = ArtisanBoard;
export default Board;
