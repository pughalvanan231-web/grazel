import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MegaMenuData } from '@/data/navigation';
import { ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  data: MegaMenuData;
  onClose: () => void;
}

export function MegaMenu({ data, onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-0 w-full bg-background-cream/95 backdrop-blur-md border-b border-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)] z-50 hidden lg:block overflow-hidden"
      onMouseLeave={onClose}
    >
      {/* Inner wrapper to prevent padding collapse during height transition */}
      <div className="container py-12 xl:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 xl:gap-8">
          
          {/* Menu Columns */}
          {data.columns.map((column, index) => (
            <div
              key={column.title}
              className={`pr-4 xl:pr-8 flex flex-col ${
                index < data.columns.length - 1 ? 'border-r border-border-light/40' : ''
              }`}
            >
              {/* Spaced Small Uppercase Header */}
              <h3 className="font-serif text-[10px] xl:text-[11px] uppercase tracking-[0.25em] text-foreground font-semibold mb-6">
                {column.title}
              </h3>
              
              {/* Navigation Links with Micro-Interactions */}
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="group/link text-xs text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:translate-x-1.5 flex items-center py-1"
                    >
                      {/* Subtly fading in dot indicator */}
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 -ml-3 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-300" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Spacer if we don't have enough columns */}
          {data.columns.length < 4 && (
            <div className={`col-span-${4 - data.columns.length} hidden lg:block`} />
          )}

          {/* Featured Image Gallery Frame */}
          {data.featured && (
            <div className="pl-4 xl:pl-8 hidden lg:block col-span-1">
              <Link
                to={data.featured.href}
                onClick={onClose}
                className="block group/featured relative"
              >
                {/* Framed Image */}
                <div className="p-1 border border-border-light bg-card aspect-[3/4.2] overflow-hidden shadow-sm relative">
                  <img
                    src={data.featured.image}
                    alt={data.featured.title}
                    className="w-full h-full object-cover transition-transform ease-out group-hover/featured:scale-105"
                    style={{ transitionDuration: '1200ms' }}
                  />
                  {/* Subtle vignette filter */}
                  <div className="absolute inset-0 bg-foreground/5 opacity-50 group-hover/featured:opacity-0 transition-opacity duration-300" />
                  
                  {/* Luxury slide-up banner overlay */}
                  <div 
                    className="absolute inset-x-3 bottom-3 bg-background-cream/95 backdrop-blur-xs border border-border p-3 text-center transform translate-y-3 opacity-0 group-hover/featured:translate-y-0 group-hover/featured:opacity-100 transition-all duration-500 shadow-sm"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
                  >
                    <p className="font-serif text-[10px] text-foreground uppercase tracking-widest font-semibold truncate">
                      {data.featured.title}
                    </p>
                    <span className="text-[8px] text-muted-foreground uppercase tracking-widest block mt-0.5 flex items-center justify-center gap-0.5 font-medium">
                      <span>View Editorial</span>
                      <ChevronRight className="h-2 w-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
