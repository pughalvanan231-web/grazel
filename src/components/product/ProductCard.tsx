import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Sparkles, Layers, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex(index);
  };

  // Determine which image to display
  const currentImage = product.images[activeImageIndex] || product.images[0];
  const hasMultipleImages = product.images.length > 1;

  return (
    <>
      <div
        className="group relative flex flex-col rounded-[26px] overflow-hidden bg-charcoal/90 border border-charcoal/15 hover:border-gold/50 shadow-md hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => {
          setIsHovered(true);
          if (hasMultipleImages && activeImageIndex === 0) {
            setActiveImageIndex(1);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveImageIndex(0);
        }}
      >
        <Link
          to={`/product/${product.id}`}
          className="block relative aspect-[3/4.2] w-full overflow-hidden"
        >
          {/* Background Image with smooth zoom and fade transition */}
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('placeholder')) {
                target.src = '/placeholder.svg';
              }
            }}
          />

          {/* Top Subtle Vignette */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none" />

          {/* Top Left Status Badge */}
          <div className="absolute top-4 left-4 z-20">
            {product.isBestSeller ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-charcoal shadow-sm border border-white/40">
                <Star className="h-3 w-3 fill-gold text-gold" />
                <span className="text-[10px] font-sans font-semibold tracking-wide uppercase">
                  Prime Pick
                </span>
              </div>
            ) : product.isPreOrder ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">
                  Pre-Order
                </span>
              </div>
            ) : product.isNew ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/95 border border-white/20 shadow-sm">
                <span className="text-[10px] font-sans font-medium tracking-wide">
                  Newly Listed
                </span>
              </div>
            ) : product.discount ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gold/90 backdrop-blur-md text-white shadow-sm border border-gold/40">
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">
                  {product.discount}% OFF
                </span>
              </div>
            ) : null}
          </div>

          {/* Top Right Wishlist Floating Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label="Add to Wishlist"
            className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-sm ${
              inWishlist
                ? 'bg-white text-gold border-white fill-gold ring-2 ring-gold/40'
                : 'bg-black/35 hover:bg-white text-white hover:text-charcoal border-white/20 hover:scale-105'
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-gold text-gold' : 'currentColor'}`} />
          </button>

          {/* Pagination Dots (Reference design indicator) */}
          {hasMultipleImages && (
            <div className="absolute bottom-[136px] sm:bottom-[142px] inset-x-0 z-20 flex justify-center items-center gap-1.5 pointer-events-auto">
              {product.images.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeImageIndex === idx
                      ? 'w-4 bg-white'
                      : 'w-1.5 bg-white/45 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Bottom Frosted Glass / Dark Gradient Details Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 pt-16 pb-4 sm:pb-5 px-4 sm:px-5 bg-gradient-to-t from-black/95 via-black/85 via-40% to-transparent backdrop-blur-[1px]">
            {/* Title & Price Header Row */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-serif sm:font-sans font-medium text-base sm:text-lg text-white group-hover:text-gold transition-colors duration-300 truncate leading-snug">
                {product.name}
              </h3>
              <div className="text-right shrink-0">
                <span className="font-serif sm:font-sans font-semibold text-base sm:text-lg text-white">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="block text-[11px] text-white/50 line-through font-sans">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Subtitle / Composition / Category Row */}
            <p className="text-xs text-white/70 font-sans mt-0.5 truncate tracking-wide">
              {product.composition || `${product.category.toUpperCase()} • ${product.fabric}`}
            </p>

            {/* Subtle Hairline Divider */}
            <div className="border-t border-white/15 my-3" />

            {/* Specs / Metrics Row */}
            <div className="flex items-center justify-between text-[11px] font-sans text-white/80">
              {/* Spec 1: Fabric */}
              <div className="flex items-center gap-1.5 min-w-0">
                <Layers className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="truncate max-w-[85px] sm:max-w-[100px] text-white/75">
                  {product.fabric}
                </span>
              </div>

              {/* Spec 2: Fit */}
              <div className="flex items-center gap-1.5 min-w-0">
                <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="truncate text-white/75">
                  {product.fit || 'Tailored'}
                </span>
              </div>

              {/* Spec 3: Interactive Quick View Button */}
              <button
                type="button"
                onClick={handleQuickViewClick}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/15 text-white/90 hover:text-white transition-all duration-200 shrink-0 font-medium"
              >
                <Eye className="h-3 w-3 text-gold" />
                <span className="text-[10px] tracking-wide uppercase">Quick View</span>
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
