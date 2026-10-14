import heroImage from '@/assets/hero-cover.jpg';
import editorialWool from '@/assets/editorial-wool.jpg';
import { Download, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditorialShowcase } from './EditorialShowcase';
import { EditorialReveal } from './EditorialReveal';

export function About() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-cream border-b border-charcoal/10 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column — Asymmetrical Editorial Manifesto Narrative */}
          <EditorialReveal className="lg:col-span-6 space-y-7 xl:pr-4">
            {/* Eyebrow with leading gold dash */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-gold inline-block" />
              <span className="eyebrow-luxury tracking-[0.3em] text-gold font-semibold text-xs">
                ABOUT GRAZEL
              </span>
            </div>

            {/* Main Title in Fraunces Serif */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-charcoal leading-[1.12] font-normal tracking-tight">
              Architectural drape. Uncompromising fibre.
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-sm sm:text-[15px] text-muted-foreground font-sans leading-relaxed">
              <p>
                With a strong foundation in generational textile craftsmanship and slow fashion principles, Grazel has established itself as an uncompromising apparel atelier based in Tiruppur, India. Driven by material fidelity, ethical sourcing, and architectural proportion, we craft silhouettes from the world's finest natural fibres.
              </p>
              <p>
                Our expertise spans every stage of the procurement and creation cycle—from direct fleece grading and single-origin long-staple cotton spinning to architectural pattern drafting, single-needle seam execution, and on-site AQL-compliant quality inspections.
              </p>
              <p>
                At Grazel, we believe in transparent relationships and deliberate pacing. Our team of experienced master tailors coordinates directly with partner loom floors, ensuring absolute structural drape, enduring weave longevity, and uncompromising integrity in every stitch.
              </p>
              <p>
                Whether crafting strictly limited seasonal capsules or anchoring permanent wardrobe foundations, Grazel delivers an elevated standard that transforms raw natural fibres into heirloom garments of quiet dignity and enduring elegance.
              </p>
            </div>

            {/* Prominent Pull Quote Block in Cream Card with Fraunces Italic */}
            <div className="bg-white border-l-2 border-gold p-6 sm:p-7 shadow-xs border-y border-r border-charcoal/5 my-6">
              <p className="font-serif text-xl sm:text-2xl italic text-charcoal leading-snug font-normal">
                “We do not design garments to be replaced in six months. We craft heirlooms intended to outlive the wearer.”
              </p>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-gold mt-3 block font-sans">
                — THE GRAZEL ATELIER PRINCIPLE SINCE 2021
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                to="/collections"
                data-cursor="Atelier"
                className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-charcoal hover:text-gold transition-colors group"
              >
                <span>Download Atelier Monograph</span>
                <Download className="h-4 w-4 text-gold transition-transform group-hover:translate-y-0.5" />
              </Link>

              <span className="text-beige hidden sm:inline">|</span>

              <Link
                to="/collections"
                data-cursor="Explore"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground hover:text-gold transition-colors group"
              >
                <span>Explore Repertoire</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold" />
              </Link>
            </div>
          </EditorialReveal>

          {/* Right Column — Editorial Two-Image Showcase with Synchronized Parallax */}
          <div className="lg:col-span-6 relative">
            <EditorialShowcase
              primarySrc={editorialWool}
              primaryAlt="Grazel Textile Preparation"
              secondarySrc={heroImage}
              secondaryAlt="Atelier Tailoring Heritage"
              badgeText="SINCE"
              badgeYear="2021"
              badgeSubtext="ATELIER"
              captionEyebrow="APPAREL MANUFACTURING"
              captionTitle="Atelier Tailoring Heritage"
              captionDescription="Quality garments, ethical practices, and deliberate innovation since 2021."
              secondaryPosition="bottom-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
