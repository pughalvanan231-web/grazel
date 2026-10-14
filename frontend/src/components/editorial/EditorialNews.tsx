import { Link } from 'react-router-dom';
import { EDITORIAL_NEWS } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

export function EditorialNews() {
  return (
    <section id="news" className="py-24 lg:py-32 bg-ivory border-b border-charcoal/10">
      <div className="container">
        {/* Section Header */}
        <EditorialReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <p className="eyebrow-luxury mb-3">JOURNAL & THOUGHT LEADERSHIP CHRONICLES</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight">
              The Grazel Gazette
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal hover:text-gold transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Read All Essays</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold" />
          </Link>
        </EditorialReveal>

        {/* 3 Editorial Essay Cards with Reading Times */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDITORIAL_NEWS.map((article, idx) => (
            <EditorialReveal
              key={article.id}
              delay={idx * 0.12}
              className="h-full"
            >
              <div
                data-cursor="Read"
                className="group bg-white border border-charcoal/10 flex flex-col justify-between overflow-hidden hover:border-gold hover:shadow-lg transition-all duration-400 h-full"
              >
              <div>
                {/* Article Image with hover zoom */}
                <div className="aspect-[16/10] overflow-hidden bg-cream relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/92 backdrop-blur-xs text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-gold border border-gold/20 shadow-xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-8">
                  <div className="flex items-center justify-between text-[10px] font-sans text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    <span className="font-semibold">{article.date}</span>
                    <span className="text-gold font-semibold">{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-8 pb-8 mt-auto">
                <div className="pt-6 border-t border-charcoal/10 flex items-center justify-between">
                  <Link
                    to={article.href}
                    className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal group-hover:text-gold flex items-center gap-2 transition-colors"
                  >
                    <span>Read Chronicle</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold" />
                  </Link>
                  <div className="w-2 h-2 rounded-full bg-beige group-hover:bg-gold transition-colors duration-300" />
                </div>
              </div>
            </div>
          </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
