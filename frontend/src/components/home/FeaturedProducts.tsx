import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EditorialReveal } from '@/components/editorial/EditorialReveal';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  products: Product[];
  viewAllHref?: string;
  columns?: 2 | 3 | 4;
  background?: 'cream' | 'white' | 'ivory';
}

export function FeaturedProducts({
  title,
  subtitle,
  eyebrow,
  products,
  viewAllHref,
  columns = 4,
  background = 'cream',
}: FeaturedProductsProps) {
  const bgClass =
    background === 'white'
      ? 'bg-white'
      : background === 'ivory'
      ? 'bg-ivory'
      : 'bg-cream';

  return (
    <section className={`py-24 lg:py-32 border-b border-charcoal/10 ${bgClass}`}>
      <div className="container">
        {/* Editorial Section Header */}
        <EditorialReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            {eyebrow && <span className="eyebrow-luxury mb-2.5 block">{eyebrow}</span>}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-sm text-muted-foreground font-sans leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-charcoal hover:text-gold transition-colors group whitespace-nowrap"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold" />
            </Link>
          )}
        </EditorialReveal>

        {/* Product Cards Grid */}
        <ProductGrid products={products} columns={columns} />
      </div>
    </section>
  );
}
