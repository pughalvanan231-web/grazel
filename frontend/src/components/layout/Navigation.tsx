import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowUpRight, Package, User, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Auto-hide on scroll down past 120px, instant reveal on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
          setIsVisible(false);
        } else if (lastScrollY.current - currentScrollY > 6) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Men', href: '/men' },
    { label: 'Women', href: '/women' },
    { label: 'Collections', href: '/collections' },
    { label: 'Pre-Orders', href: '/all?filter=preorder' },
    { label: 'About', href: '/#about' },
    { label: 'Size Guide', href: '/fit-profile' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 backdrop-blur-md will-change-transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled || !isHome
            ? 'bg-white/80 border-b border-charcoal/10 shadow-sm py-3.5 text-charcoal'
            : 'bg-white/10 border-b border-white/15 py-5 text-white'
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Left: Brand Wordmark in Fraunces serif with subtle sub-badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-1.5 -ml-1 transition-colors ${
                isScrolled || !isHome ? 'text-charcoal hover:text-gold' : 'text-white hover:text-gold'
              }`}
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="group flex items-baseline gap-2.5">
              <span
                className={`font-serif text-2xl lg:text-[26px] tracking-[0.14em] font-normal transition-colors ${
                  isScrolled || !isHome ? 'text-charcoal group-hover:text-gold' : 'text-white group-hover:text-gold-light'
                }`}
              >
                GRAZEL
              </span>
              <span
                className={`hidden sm:inline-block font-sans text-[9px] uppercase tracking-[0.28em] font-semibold transition-opacity pb-0.5 ${
                  isScrolled || !isHome ? 'text-gold' : 'text-white/70'
                }`}
              >
                Tiruppur Atelier
              </span>
            </Link>
          </div>

          {/* Center: Editorial Nav Links with hover underline transitions */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`nav-underline text-xs uppercase tracking-[0.22em] font-medium transition-colors py-1 ${
                  isScrolled || !isHome
                    ? 'text-charcoal/90 hover:text-gold'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Quick Utilities */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Track Order Utility */}
            <Link
              to="/orders"
              className={`hidden md:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors ${
                isScrolled || !isHome ? 'text-charcoal/80 hover:text-gold' : 'text-white/80 hover:text-white'
              }`}
            >
              <Package className="h-3.5 w-3.5" />
              <span>Track Order</span>
            </Link>

            {/* Currency Badge ₹ INR */}
            <div
              className={`hidden sm:flex items-center px-2 py-0.5 rounded text-[10px] font-sans font-semibold tracking-wider border ${
                isScrolled || !isHome
                  ? 'border-charcoal/15 text-charcoal/70 bg-cream/60'
                  : 'border-white/20 text-white/80 bg-white/5'
              }`}
            >
              ₹ INR
            </div>

            {/* Search Icon Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Catalog"
              className={`p-1.5 transition-colors ${
                isScrolled || !isHome ? 'text-charcoal hover:text-gold' : 'text-white hover:text-gold'
              }`}
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label="Saved Items"
              className={`hidden sm:block p-1.5 transition-colors relative ${
                isScrolled || !isHome ? 'text-charcoal hover:text-gold' : 'text-white hover:text-gold'
              }`}
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gold" />
              )}
            </Link>

            {/* User Account */}
            <Link
              to={user ? "/profile" : "/login"}
              aria-label="Client Account"
              className={`p-1.5 transition-colors ${
                isScrolled || !isHome ? 'text-charcoal hover:text-gold' : 'text-white hover:text-gold'
              }`}
            >
              <User className="h-4 w-4" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Bag"
              className={`relative p-1.5 transition-colors ${
                isScrolled || !isHome ? 'text-charcoal hover:text-gold' : 'text-white hover:text-gold'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Slide-In Modal Drawer with Staggered Links */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="w-full max-w-sm h-full bg-ivory text-charcoal p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-charcoal/10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl tracking-[0.14em]">GRAZEL</span>
                    <span className="text-[9px] uppercase tracking-widest text-gold font-sans font-semibold">
                      Tiruppur Atelier
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-charcoal/70 hover:text-charcoal"
                    aria-label="Close Navigation"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Staggered Nav Links */}
                <div className="py-8 space-y-6">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.06, duration: 0.4 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between font-serif text-2xl text-charcoal hover:text-gold transition-colors py-1"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-4 w-4 text-gold opacity-60" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom Utilities */}
              <div className="pt-6 border-t border-charcoal/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-charcoal/80 font-sans uppercase tracking-widest">
                  <span>Region & Currency</span>
                  <span className="font-semibold text-gold">₹ INR · India</span>
                </div>

                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs text-charcoal/80 uppercase tracking-widest py-1"
                >
                  <Package className="h-4 w-4 text-gold" />
                  <span>Track Existing Order</span>
                </Link>

                <div className="text-[10px] text-muted-foreground uppercase tracking-widest pt-2">
                  Heritage Textile Corridor, Tiruppur · Since 2021
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Overlays */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
