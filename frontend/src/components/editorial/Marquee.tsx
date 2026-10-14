import { MARQUEE_TAPE } from '@/data/content';

interface MarqueeProps {
  direction?: 'left' | 'right';
  theme?: 'light' | 'dark';
  items?: string[];
  className?: string;
}

export function Marquee({
  direction = 'left',
  theme = 'light',
  items = MARQUEE_TAPE,
  className = ''
}: MarqueeProps) {
  const isDark = theme === 'dark';
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  // Duplicate items to guarantee a seamless infinite tape loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden py-4 border-y select-none transition-colors group cursor-default ${
        isDark
          ? 'bg-charcoal text-ivory border-ivory/15'
          : 'bg-ivory text-charcoal border-charcoal/10'
      } ${className}`}
    >
      <div className={`${animationClass} flex w-max transition-all duration-300 group-hover:[animation-play-state:paused]`}>
        {repeatedItems.map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8 px-6 whitespace-nowrap">
            <span
              className={`font-serif text-xs md:text-sm tracking-[0.3em] uppercase font-normal ${
                isDark ? 'text-ivory/90' : 'text-charcoal'
              }`}
            >
              {text}
            </span>
            <span className="text-gold text-xs tracking-widest opacity-80">
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
