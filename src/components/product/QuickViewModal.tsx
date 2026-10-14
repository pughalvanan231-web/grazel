import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    toast.success(`Added ${product.name} (${selectedSize}) to your Bag.`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="relative z-10 w-full max-w-4xl bg-ivory border border-charcoal/15 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-charcoal/70 hover:text-charcoal bg-white/80 backdrop-blur-xs rounded-full border border-charcoal/10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Column: Image Carousel / Gallery */}
          <div className="bg-cream p-6 flex flex-col justify-between">
            <div className="aspect-[3/4] overflow-hidden bg-white border border-charcoal/10 relative">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('placeholder')) {
                    target.src = '/placeholder.svg';
                  }
                }}
              />
              {product.isPreOrder && (
                <div className="absolute top-3 left-3 bg-gold text-white text-[9px] font-sans font-semibold px-2.5 py-1 uppercase tracking-widest">
                  PRE-ORDER
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-18 overflow-hidden border transition-all ${
                      activeImageIdx === idx ? 'border-gold ring-1 ring-gold' : 'border-charcoal/10 opacity-70'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('placeholder')) {
                          target.src = '/placeholder.svg';
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Detail & Action */}
          <div className="p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-gold mb-2">
                {product.category} · {product.composition || '100% Natural Fibre'}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-3">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-2xl font-semibold text-charcoal">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through font-sans">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-sans uppercase tracking-widest text-charcoal mb-3">
                    <span className="font-semibold">Select Size</span>
                    <Link to="/fit-profile" className="text-gold hover:underline text-[11px]">
                      Sizing Matrix
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 h-10 px-3 text-xs font-sans uppercase tracking-wider transition-all border ${
                          selectedSize === size
                            ? 'bg-charcoal text-white border-charcoal font-semibold'
                            : 'bg-ivory text-charcoal border-charcoal/15 hover:border-gold'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Composition & Care highlights */}
              {product.careInstructions && (
                <div className="p-4 bg-cream border border-charcoal/10 text-xs text-muted-foreground font-sans space-y-1 mb-6">
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[10px] block mb-1">
                    Atelier Preservation:
                  </span>
                  {product.careInstructions.map((inst, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-gold">•</span> {inst}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-6 border-t border-charcoal/10">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-gold hover:bg-[#8B6540] text-white text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{product.isPreOrder ? 'Reserve Pre-Order' : 'Add to Bag'}</span>
              </button>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="w-full py-3 border border-charcoal/20 hover:border-charcoal text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>View Full Atelier Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
