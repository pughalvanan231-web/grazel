import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { SmoothScroll } from '@/components/editorial/SmoothScroll';
import { ScrollProgress } from '@/components/editorial/ScrollProgress';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col overflow-x-hidden bg-ivory text-charcoal selection:bg-gold selection:text-white">
        {/* 1.5px Gold Progress Hairline pinned to top of viewport */}
        <ScrollProgress />

        {/* Editorial Glassmorphism Navigation */}
        <Navigation />

        <main className="flex-1">{children}</main>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
}
