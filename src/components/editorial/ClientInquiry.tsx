import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, Check } from 'lucide-react';
import { PARTNER_BENEFITS } from '@/data/content';
import { EditorialReveal } from './EditorialReveal';

export function ClientInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Private Atelier Consultation',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const inputBase =
    'w-full bg-ivory border border-charcoal/15 p-4 text-sm text-charcoal placeholder:text-muted-foreground/55 focus:outline-none transition-all duration-300 font-sans';
  const inputFocused = 'focus:border-gold focus:ring-1 focus:ring-gold/30';

  return (
    <section id="inquiry" className="py-24 lg:py-32 bg-cream border-b border-charcoal/10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column — Sticky Value Proposition with Gold Checkmarks */}
          <EditorialReveal className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div>
              <span className="eyebrow-luxury block mb-3.5">BESPOKE ENGAGEMENT</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight tracking-tight">
                Begin a Dialogue with Our Atelier
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                Whether you seek bespoke sartorial commissioning, corporate gifting, or private salon appointments in Tiruppur, our concierge team welcomes your inquiry.
              </p>
            </div>

            {/* Value Guarantees with Gold Checkmarks */}
            <div className="space-y-4 pt-2">
              {PARTNER_BENEFITS.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="flex items-start gap-4"
                >
                  <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-gold stroke-[2.5]" />
                  </div>
                  <span className="text-sm text-charcoal font-sans leading-relaxed">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Concierge Hotline Card */}
            <div className="p-7 bg-white border border-charcoal/10 shadow-xs">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-gold mb-1.5">
                CONCIERGE HOTLINE
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-charcoal tracking-tight">
                +91 98765 43210
              </div>
              <div className="text-xs text-muted-foreground mt-2 font-sans">
                Mon – Sat, 10:00 AM – 7:00 PM IST
              </div>
            </div>
          </EditorialReveal>

          {/* Right Column — Editorial White Card Form with Animated Fields */}
          <EditorialReveal delay={0.15} className="lg:col-span-7">
            <div className="bg-white border border-charcoal/10 p-8 sm:p-10 lg:p-14 shadow-xs relative">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Instant Animated Confirmation Screen */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="py-16 text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-16 h-16 rounded-full bg-gold/10 border border-gold text-gold mx-auto flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-8 w-8 stroke-[1.5]" />
                  </motion.div>

                  <h3 className="font-serif text-3xl text-charcoal">
                    Inquiry Received
                  </h3>

                  <p className="text-sm text-muted-foreground max-w-md mx-auto font-sans leading-relaxed">
                    Thank you, {formData.name}. Our atelier concierge has received your brief and will respond within 24 business hours.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Private Atelier Consultation', message: '' });
                    }}
                    className="text-xs uppercase tracking-widest font-semibold text-gold hover:underline pt-4"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <p className="eyebrow-luxury mb-1.5">BESPOKE CONSULTATION REQUEST</p>
                    <h3 className="font-serif text-2xl text-charcoal">
                      Direct Client Brief
                    </h3>
                  </div>

                  {/* Full Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-charcoal font-sans block">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Lady or Lord Surname"
                        className={`${inputBase} ${inputFocused} ${focused === 'name' ? 'border-gold ring-1 ring-gold/30' : ''}`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-charcoal font-sans block">
                        Email Address <span className="text-gold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="sanctuary@domain.com"
                        className={`${inputBase} ${inputFocused} ${focused === 'email' ? 'border-gold ring-1 ring-gold/30' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Inquiry Category Select */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-charcoal font-sans block">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${inputFocused} ${focused === 'subject' ? 'border-gold ring-1 ring-gold/30' : ''}`}
                    >
                      <option value="Private Atelier Consultation">Private Atelier Consultation</option>
                      <option value="Bespoke Wardrobe Commission">Bespoke Wardrobe Commission</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Press Loan">Press Loan</option>
                    </select>
                  </div>

                  {/* Detailed Brief Textarea */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-charcoal font-sans block">
                      Detailed Brief
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Share your requirements or preferred appointment dates..."
                      className={`${inputBase} ${inputFocused} resize-none ${focused === 'message' ? 'border-gold ring-1 ring-gold/30' : ''}`}
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gold hover:bg-[#8B6540] text-white text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 sheen-sweep shadow-sm disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Transmitting to Atelier...' : 'Submit Client Brief'}</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider text-center">
                    All inquiries are handled with complete discretion by our atelier concierge team.
                  </p>
                </form>
              )}
            </AnimatePresence>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
