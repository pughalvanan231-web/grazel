import { useState } from 'react';
import { Link } from 'react-router-dom';
import categoryMen from '@/assets/category-men2.png';
import categoryWomen from '@/assets/category-women2.png';
import categoryEssentials from '@/assets/category-essentials.jpg';
import { ArrowUpRight } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

export const portfolios = [
  {
    id: 'men',
    title: "Men's Repertoire",
    category: "TAILORED & STRUCTURAL",
    description: "Architectural jackets, virgin wool overcoats, and single-needle cotton shirting.",
    image: categoryMen,
    href: "/men"
  },
  {
    id: 'women',
    title: "Women's Collection",
    category: "FLUID & DRAPED",
    description: "Pure mulberry silk shirts, structured wool trousers, and heirloom knitwear.",
    image: categoryWomen,
    href: "/women"
  },
  {
    id: 'essentials',
    title: "Generational Essentials",
    category: "CORE FOUNDATIONS",
    description: "Heavyweight combed cotton tees, brushed loungewear, and permanent staples.",
    image: categoryEssentials,
    href: "/essentials"
  }
];

export function PortfolioShowcase() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isAnyHovered = hoveredIdx !== null;

  return (
    <section id="showcase" className="py-24 lg:py-32 bg-cream border-b border-charcoal/10 overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <EditorialReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <p className="eyebrow-luxury mb-3">CURATED SILHOUETTES</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight">
              The Permanent Portfolios
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal hover:text-gold transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold" />
          </Link>
        </EditorialReveal>

        {/* Desktop Dynamic Accordion Grid */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="hidden lg:flex w-full h-[520px] xl:h-[560px] relative overflow-hidden border border-charcoal/15 bg-charcoal shadow-2xl"
        >
          {portfolios.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isCollapsed = isAnyHovered && !isHovered;
            const widthPercent = isAnyHovered ? (isHovered ? '70%' : '15%') : '33.333333%';

            return (
              <Link
                key={item.id}
                to={item.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="relative h-full overflow-hidden group border-r border-white/10 last:border-r-0 cursor-pointer block"
                style={{
                  width: widthPercent,
                  transition: 'width 750ms cubic-bezier(0.76, 0, 0.24, 1)',
                }}
              >
                {/* Background Image scaling and zooming on hover */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
                      isHovered
                        ? 'scale-105 brightness-[0.92]'
                        : isCollapsed
                        ? 'scale-100 brightness-[0.5] grayscale-[20%]'
                        : 'scale-100 brightness-[0.82]'
                    }`}
                  />
                  {/* Dark Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent transition-opacity duration-700 ${
                      isHovered ? 'opacity-90' : isCollapsed ? 'opacity-85' : 'opacity-75'
                    }`}
                  />
                </div>

                {/* Collapsed Vertical State (when another card is active) */}
                {isCollapsed ? (
                  <div className="relative z-10 h-full p-6 flex flex-col justify-between items-center text-white transition-opacity duration-500">
                    <span className="font-serif italic text-sm text-white">0{idx + 1}</span>
                    <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-white [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                      {item.title}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ) : (
                  /* Expanded 16:9 / Default Content Overlay */
                  <div className="relative z-10 h-full p-8 xl:p-12 flex flex-col justify-between text-white transition-opacity duration-500">
                    <div>
                      <span className="font-sans text-[11px] uppercase tracking-[0.28em] font-semibold text-white block mb-2">
                        {item.category}
                      </span>
                      <span className="font-serif italic text-sm text-white/90">
                        Portfolio 0{idx + 1}
                      </span>
                    </div>

                    <div className="max-w-xl">
                      <h3 className="font-serif text-3xl xl:text-4xl text-white mb-3 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm text-white font-sans leading-relaxed mb-6 transition-all duration-500 ${
                          isHovered ? 'opacity-100 max-h-24' : 'opacity-90 max-h-14 line-clamp-2'
                        }`}
                      >
                        {item.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-white">
                        <span>Discover Edit</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile & Tablet Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:hidden">
          {portfolios.map((item, idx) => (
            <Link
              key={item.id}
              to={item.href}
              className="relative aspect-[4/5] overflow-hidden bg-charcoal border border-charcoal/15 group shadow-lg flex flex-col justify-end p-6 text-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-white font-semibold block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-2xl text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-white line-clamp-2 mb-4 font-sans">
                  {item.description}
                </p>
                <span className="text-xs uppercase tracking-widest text-white font-semibold inline-flex items-center gap-1.5">
                  Explore Repertoire <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Brands = PortfolioShowcase;
