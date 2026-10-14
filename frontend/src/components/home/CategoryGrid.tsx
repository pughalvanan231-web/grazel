import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface Category {
  title: string;
  image: string;
  href: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Helper metadata map based on category title
  const getCategoryMeta = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes('women')) {
      return {
        tag: "THE FEMININE SILHOUETTE",
        subtitle: "Effortless silhouettes crafted from heavy-weight mulberry silk and double-faced cashmere.",
        ctaLabel: "Shop Women",
      };
    } else if (key.includes('men')) {
      return {
        tag: "THE MASCULINE SILHOUETTE",
        subtitle: "Tailored wool blazers, premium cashmere sweaters, and minimal daily tailoring.",
        ctaLabel: "Shop Men",
      };
    } else {
      return {
        tag: "DAILY REFINEMENT",
        subtitle: "Considered accessories, soft knits, and daily staples for the refined wardrobe.",
        ctaLabel: "Shop Essentials",
      };
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#fdfbf9] overflow-hidden border-b border-border">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Discover</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground font-normal">
            Shop by Category
          </h2>
        </div>

        {/* ─── DESKTOP ACCORDION GRID (lg+) ─── */}
        <div className="hidden lg:flex w-full h-[620px] relative rounded-none overflow-hidden border border-black/5 bg-[#111]">
          {categories.map((category, idx) => {
            const meta = getCategoryMeta(category.title);
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            // Column width transitions
            let widthClass = "w-1/3";
            if (isAnyHovered) {
              widthClass = isHovered ? "w-[48%]" : "w-[26%]";
            }

            return (
              <div
                key={category.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative h-full ${widthClass} transition-all overflow-hidden group border-r border-white/10 last:border-r-0 cursor-pointer`}
                style={{
                  transitionDuration: '800ms',
                  transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.3, 1)',
                }}
              >
                {/* Image + Grayscale transition */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={category.image}
                    alt={category.title}
                    className={`w-full h-full object-cover transition-all ${
                      isHovered ? 'scale-103 grayscale-0 brightness-[0.82]' : 'scale-100 grayscale brightness-[0.68]'
                    }`}
                    style={{
                      transitionDuration: '1500ms',
                      transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.3, 1)',
                    }}
                    loading="lazy"
                  />
                  {/* Gradient shadow overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-700 ${
                      isHovered ? 'opacity-90' : 'opacity-70'
                    }`} 
                  />
                </div>

                {/* Column Content */}
                <div className="absolute bottom-12 left-8 right-8 z-20 text-white space-y-3.5">
                  {/* Category Tag */}
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#c4b59f] font-semibold block">
                    {meta.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-2xl xl:text-3xl tracking-wide font-normal">
                    {category.title}
                  </h3>

                  {/* Hidden metadata revealed on hover */}
                  <div 
                    className={`grid grid-rows-[0fr] transition-all duration-700 ease-in-out ${
                      isHovered ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden space-y-4">
                      <p className="text-xs text-white/75 leading-relaxed font-light max-w-xs">
                        {meta.subtitle}
                      </p>
                      <div className="pt-1.5">
                        <Link to={category.href}>
                          <button className="group inline-flex items-center gap-2 border-b border-white/60 pb-1 text-[9px] uppercase tracking-[0.25em] text-white hover:border-white transition-colors duration-300">
                            <span>{meta.ctaLabel}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── MOBILE STACKED FEEDS (lg-) ─── */}
        <div className="block lg:hidden w-full relative flex flex-col gap-5">
          {categories.map((category) => {
            const meta = getCategoryMeta(category.title);
            return (
              <div 
                key={category.title}
                className="relative h-[360px] w-full overflow-hidden border border-black/5"
              >
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover brightness-[0.65]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-8 left-6 right-6 z-10 text-white space-y-2">
                  <span className="text-[7.5px] uppercase tracking-[0.3em] text-[#c4b59f] font-semibold block">
                    {meta.tag}
                  </span>
                  <h2 className="font-serif text-2xl tracking-wide font-normal">
                    {category.title}
                  </h2>
                  <p className="text-[11px] text-white/70 leading-relaxed font-light max-w-xs line-clamp-2">
                    {meta.subtitle}
                  </p>
                  <div className="pt-2">
                    <Link to={category.href}>
                      <button className="inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[8px] uppercase tracking-[0.2em] text-white">
                        {meta.ctaLabel}
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
