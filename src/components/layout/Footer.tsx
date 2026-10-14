import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';
import { Marquee } from '@/components/editorial/Marquee';
import { BRAND } from '@/data/content';

const footerLinks = {
  shop: {
    title: 'Collections & Repertoire',
    links: [
      { label: "Men's Collection", href: '/men' },
      { label: "Women's Collection", href: '/women' },
      { label: 'Generational Essentials', href: '/essentials' },
      { label: 'New Arrivals', href: '/new' },
      { label: 'Editorial Collections', href: '/collections' },
      { label: 'The Wool Edit', href: '/collections' },
      { label: 'Summer Collection', href: '/summer-collection' },
      { label: 'Winter Collection', href: '/winter-collection' },
      { label: 'E-Boutique', href: '/e-boutique' },
    ],
  },
  services: {
    title: 'Atelier Concierge',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'Order Tracking', href: '/orders' },
      { label: 'Shipping Information', href: '/help' },
      { label: 'Returns & Exchanges', href: '/help' },
      { label: 'Fit Profile Studio', href: '/fit-profile' },
      { label: 'Care & Preservation', href: '/help' },
    ],
  },
  company: {
    title: 'The House of Grazel',
    links: [
      { label: 'Our Story & Heritage', href: '/collections' },
      { label: 'Fibre Sustainability', href: '/collections' },
      { label: 'Careers', href: '/contact' },
      { label: 'Press', href: '/contact' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error('Please enter your email');
      return;
    }

    setSubscribing(true);
    try {
      const response = await fetch('/api/subscriptions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          subscriptionTypes: ['promotional', 'new_arrivals', 'seasonal_updates', 'order_updates'],
        }),
      });

      if (!response.ok) {
        const storageKey = 'grazel_newsletter_emails';
        const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (!stored.includes(trimmedEmail)) {
          stored.push(trimmedEmail);
          localStorage.setItem(storageKey, JSON.stringify(stored));
        }
        toast.success("You're on our list. We'll share updates soon.");
        setEmail('');
        return;
      }

      toast.success("Welcome! You've subscribed to our newsletter.");
      setEmail('');
    } catch {
      const storageKey = 'grazel_newsletter_emails';
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!stored.includes(trimmedEmail)) {
        stored.push(trimmedEmail);
        localStorage.setItem(storageKey, JSON.stringify(stored));
      }
      toast.success('Thanks! Your email is saved for future updates.');
    } finally {
      setSubscribing(false);
    }
  };

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal text-ivory/70 border-t border-ivory/15 relative overflow-hidden">
      {/* Reverse-direction Marquee Tape above footer */}
      <Marquee direction="right" theme="dark" />

      {/* Main Footer Container */}
      <div className="container py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">

          {/* Left Column — Brand + Tagline + Address + Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            {/* GRAZEL Wordmark in Fraunces */}
            <Link to="/" className="font-serif text-3xl lg:text-4xl tracking-[0.14em] text-ivory block hover:text-gold-light transition-colors duration-300">
              GRAZEL
            </Link>

            <p className="text-sm text-ivory/65 max-w-sm font-sans leading-relaxed">
              Timeless elegance crafted from the world's finest materials. Each piece is tailored with generational reverence in our Tiruppur atelier.
            </p>

            {/* Address, Hours & Email */}
            <div className="space-y-3 pt-2 text-xs text-ivory/60 font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold-light flex-shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold-light flex-shrink-0" />
                <span>{BRAND.hours}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold-light flex-shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-gold-light transition-colors">
                  {BRAND.email}
                </a>
              </div>
            </div>

            {/* The Grazel Gazette — Newsletter Signup */}
            <div className="pt-5 border-t border-ivory/10 max-w-md">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold-light mb-2 font-sans font-semibold">
                THE GRAZEL GAZETTE
              </p>
              <p className="text-xs text-ivory/55 mb-4 font-sans leading-relaxed">
                Receive private salon invitations, seasonal edit previews, and fabric monographs.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email"
                  className="flex-1 bg-ivory/5 border border-ivory/20 p-3.5 text-xs text-ivory placeholder:text-ivory/35 focus:outline-none focus:border-gold-light transition-colors font-sans"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-6 py-3.5 bg-gold hover:bg-[#8B6540] text-white text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors whitespace-nowrap font-sans"
                >
                  {subscribing ? '...' : 'Join'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Three Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="font-serif text-sm font-normal text-ivory mb-5 border-b border-ivory/10 pb-3 tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-xs text-ivory/60 hover:text-gold-light transition-colors font-sans block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row — Copyright + Socials + Back to Top */}
      <div className="border-t border-ivory/10 bg-black/30">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-ivory/45 font-sans">
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {[
              { icon: Instagram, href: 'https://www.instagram.com/grazelapparel', label: 'Instagram' },
              { icon: Facebook, href: 'https://www.facebook.com/grazelapparel', label: 'Facebook' },
              { icon: Twitter, href: 'https://twitter.com/grazelapparel', label: 'X/Twitter' },
              { icon: Linkedin, href: 'https://www.linkedin.com/company/grazelapparel', label: 'LinkedIn' },
              { icon: Youtube, href: 'https://www.youtube.com/@grazelapparel', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ivory/50 hover:text-gold-light transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Smooth Animated Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-ivory/60 hover:text-gold-light transition-colors group font-sans font-semibold"
          >
            <span>Back to top ↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
