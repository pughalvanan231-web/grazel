import { Layout } from '@/components/layout/Layout';
import { VideoHero } from '@/components/editorial/VideoHero';
import { Marquee } from '@/components/editorial/Marquee';
import { Philosophy } from '@/components/editorial/Philosophy';
import { About } from '@/components/editorial/About';
import { Facts } from '@/components/editorial/Facts';
import { History } from '@/components/editorial/History';
import { Parallax } from '@/components/editorial/Parallax';
import { Sustainability } from '@/components/editorial/Sustainability';
import { PortfolioShowcase } from '@/components/editorial/PortfolioShowcase';
import { ServicesCapabilities } from '@/components/editorial/ServicesCapabilities';
import { ArtisanBoard } from '@/components/editorial/ArtisanBoard';
import { EditorialNews } from '@/components/editorial/EditorialNews';
import { ClientInquiry } from '@/components/editorial/ClientInquiry';

import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
<<<<<<< HEAD
import { ProductCard } from '@/components/product/ProductCard';
=======
import { EditorialBanner } from '@/components/home/EditorialBanner';
import { ExploreMoreSection } from '@/components/community/ExploreMoreSection';
>>>>>>> e2f49478fcf269ddb1125a4952e8e043e6a7bbb1
import { BundleShowcase } from '@/components/bundles/BundleShowcase';
import { useProducts } from '@/context/ProductContext';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';
import { ArrowRight, Tag } from 'lucide-react';

const Index = () => {
  useDocumentMetadata(
    'GRAZEL | Timeless Elegance — Tiruppur Atelier Archive',
    "Discover refined luxury fashion crafted from the world's finest materials. Shop our curated collection of atelier clothing.",
    '/'
  );

  const { products } = useProducts();
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const discountedProducts = products.filter((p) => p.discount && p.discount > 0).slice(0, 4);
  const preOrderProducts = products.filter((p) => p.isPreOrder).slice(0, 4);

  return (
    <Layout>
      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'GRAZEL',
          'url': 'https://grazelapparel.com',
          'logo': 'https://grazelapparel.com/favicon.ico',
          'sameAs': [
            'https://instagram.com/grazelapparel',
            'https://facebook.com/grazelapparel'
          ]
        })}
      </script>

      {/* 1. Cinematic Fullscreen Video/Editorial Hero */}
      <VideoHero />

      {/* 2. Infinite Running Marquee — Slow Tape (Ivory/Light) */}
      <Marquee direction="left" theme="light" />

      {/* 3. Atelier Repertoire & Code of Excellence */}
      <Philosophy />

      {/* 4. About Grazel Atelier — Asymmetrical 2-Column Layout */}
      <About />

      {/* 5. Bundles Showcase */}
      <BundleShowcase />

      {/* 6. Special Deals & Discounts */}
      {discountedProducts.length > 0 && (
        <section className="py-24 lg:py-32 bg-cream border-b border-charcoal/10">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gold" />
                  <span className="eyebrow-luxury">EXCLUSIVE ATELIER PRIVILEGES</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl text-charcoal tracking-tight">
                  Special Curations & Limited Off-Season Edits
                </h2>
                <p className="mt-2 text-sm text-muted-foreground font-sans">
                  Rare seasonal reductions on heirloom garments.
                </p>
              </div>
              <Link
                to="/all"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-charcoal hover:text-gold transition-colors group whitespace-nowrap"
              >
                <span>View All Offers</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-gold" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Curated Silhouettes & Permanent Portfolios */}
      <PortfolioShowcase />

      {/* 8. Dark Mode Verified Standards & Metrics */}
      <Facts />

      {/* 9. New Arrivals */}
      <FeaturedProducts
        eyebrow="ATELIER PREVIEWS"
        title="New Arrivals"
        subtitle="The latest additions to our permanent repertoire"
        products={newArrivals}
        viewAllHref="/new"
        background="ivory"
      />

      {/* 10. Bestsellers */}
      <FeaturedProducts
        eyebrow="MOST CHERISHED"
        title="Bestsellers"
        subtitle="Our most beloved and enduring silhouettes"
        products={bestsellers}
        viewAllHref="/bestsellers"
        background="cream"
      />

      {/* 11. Pre-Order Section */}
      {preOrderProducts.length > 0 && (
        <section className="py-24 lg:py-32 bg-ivory border-t border-b border-charcoal/10">
          <div className="container">
<<<<<<< HEAD
            <div className="flex flex-col md:items-start gap-4 mb-14">
              <div>
                <span className="eyebrow-luxury mb-3 block">ATELIER PREVIEWS</span>
                <h2 className="font-serif text-3xl lg:text-5xl text-charcoal tracking-tight">
                  Pre-Order Ahead of Season
=======
            <div className="flex flex-col md:items-start gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Coming Soon</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
                  Pre-Order Now
>>>>>>> e2f49478fcf269ddb1125a4952e8e043e6a7bbb1
                </h2>
                <p className="mt-3 text-sm text-muted-foreground font-sans leading-relaxed max-w-lg">
                  Reserve strictly limited upcoming production runs before allocation closes.
                </p>
              </div>
            </div>
<<<<<<< HEAD

            <ProductGrid products={preOrderProducts} columns={4} />

            <div className="mt-14 flex justify-center">
              <Link
                to="/all?filter=preorder"
                className="flex items-center gap-2 px-10 py-4 border border-gold text-xs uppercase tracking-[0.22em] font-semibold text-gold hover:bg-gold hover:text-white transition-all group"
=======
            
            <ProductGrid products={preOrderProducts} columns={4} />

            <div className="mt-12 flex justify-center">
              <Link
                to="/all?filter=preorder"
                className="flex items-center gap-2 px-6 py-3 border border-primary/20 text-xs uppercase tracking-[0.15em] text-foreground hover:bg-primary/5 hover:text-primary transition-all group"
>>>>>>> e2f49478fcf269ddb1125a4952e8e043e6a7bbb1
              >
                <span>View All Pre-Orders</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 12. Interactive Milestone Chronology */}
      <History />

      {/* 13. Pinned Multi-Layer Floating Parallax Showcase */}
      <Parallax />

      {/* 14. Circular Stewardship & Conscious Standards */}
      <Sustainability />

      {/* 15. Concierge & Client Capabilities */}
      <ServicesCapabilities />

      {/* 16. Stewards of the Craft Leadership */}
      <ArtisanBoard />

      {/* 17. Journal & Thought Leadership Chronicles */}
      <EditorialNews />

      {/* 18. Bespoke Client Engagement & Concierge Desk */}
      <ClientInquiry />
    </Layout>
  );
};

export default Index;
