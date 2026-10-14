import { Truck, ShieldCheck, Gift, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/content';
import { EditorialReveal } from './EditorialReveal';

const iconMap = {
  Truck,
  ShieldCheck,
  Gift,
  User,
};

export function ServicesCapabilities() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-ivory border-b border-charcoal/10">
      <div className="container">
        {/* Section Header */}
        <EditorialReveal className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <p className="eyebrow-luxury mb-3">CONCIERGE & CLIENT CAPABILITIES</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight">
            The Bespoke Standard of Care
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Every client interaction is treated with the discretion and attentiveness of a private European salon.
          </p>
        </EditorialReveal>

        {/* 4 Bespoke Service Blocks in Ivory/White Card Grid with Circular Gold Icon Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || ShieldCheck;

            return (
              <EditorialReveal
                key={service.title}
                delay={idx * 0.1}
                className="h-full"
              >
                <div className="group relative bg-white border border-charcoal/10 p-8 sm:p-9 flex flex-col justify-between transition-all duration-400 hover:-translate-y-2 hover:shadow-xl hover:border-gold h-full">
                <div>
                  {/* Circular Gold Icon Badge */}
                  <div className="w-14 h-14 rounded-full border border-gold/40 bg-gold/5 flex items-center justify-center mb-8 text-gold group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-300 shadow-xs">
                    <IconComponent className="h-6 w-6 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-charcoal/10">
                  <Link
                    to={service.href}
                    className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal group-hover:text-gold flex items-center gap-2 transition-colors"
                  >
                    <span>Explore detail</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-gold" />
                  </Link>
                </div>
              </div>
            </EditorialReveal>
          );
          })}
        </div>
      </div>
    </section>
  );
}

export const Services = ServicesCapabilities;
export default Services;
