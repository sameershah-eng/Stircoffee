import React, { useState } from 'react';
import { SHOP_INFO, FAQS } from '../data/coffeeData';
import { MapPin, Clock, Mail, ChevronDown, ChevronUp, Copy, Check, Send, Navigation, Bus, Train } from 'lucide-react';

interface VisitSectionProps {
  onCopyAddress: () => void;
  addressCopied: boolean;
  isOpenNow: boolean;
}

export const VisitSection: React.FC<VisitSectionProps> = ({
  onCopyAddress,
  addressCopied,
  isOpenNow,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'General Question',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', topic: 'General Question', message: '' });
    }, 600);
  };

  return (
    <section id="visit" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-amber-700 uppercase mb-2">
            FIND US IN SOUTH LONDON
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            Visit Stir Coffee Brixton
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Perched midway up Brixton Hill. High ceilings, sunlit bay windows, street-side benches, and some of the world's most exciting coffees on brew.
          </p>
        </div>

        {/* 2-Column Main Info & Transit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left: Location & Hours card */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    OUR ADDRESS
                  </span>
                  <button
                    onClick={onCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-md transition-colors"
                  >
                    {addressCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 font-display">
                  111 Brixton Hill
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  Brixton, London SW2 1AA, United Kingdom
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                  info@stircoffee.co.uk
                </p>
              </div>

              {/* Live Hours Box */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    SERVICE SCHEDULE
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                      }`}
                    />
                    <span>{isOpenNow ? 'Currently Open' : 'Closed · Opens Mon-Fri 07:30'}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between items-center text-stone-700">
                    <span>Monday – Friday</span>
                    <span className="font-mono tabular-nums font-semibold text-stone-900">
                      07:30 – 15:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-stone-700">
                    <span>Saturday – Sunday</span>
                    <span className="font-mono tabular-nums font-semibold text-stone-900">
                      09:00 – 15:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-amber-900 pt-2 border-t border-stone-200/60 text-xs">
                    <span className="font-semibold">Stir Lates (Friday Evening)</span>
                    <span className="font-mono tabular-nums font-semibold">17:00 – 22:00</span>
                  </div>
                </div>
              </div>

              {/* Transit Directions */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  HOW TO GET HERE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                    <Train className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800 block">London Underground</span>
                      <span>Victoria Line to Brixton. Take a 10-minute stroll south up the hill.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                    <Bus className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800 block">Direct Buses</span>
                      <span>Routes 159, 250, 133, 109, and 45 stop 20 meters from our door.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps link */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-400">Google Maps Navigation</span>
              <a
                href="https://maps.google.com/?q=111+Brixton+Hill+London+SW2+1AA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Message / Table & Bag Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                GET IN TOUCH
              </div>
              <h3 className="text-2xl font-bold text-stone-900 font-display mb-1">
                Say Hello or Inquire
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Have questions about roasters, coffee cuppings, private events, or whole bean bag reserves? Drop us a note.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 font-display">
                    Message Sent!
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                    Thanks for reaching out! Our Brixton team will reply to your email shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 text-xs font-semibold text-emerald-800 underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Sam Lewis"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1">
                      Subject
                    </label>
                    <select
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all bg-stone-50/50 text-stone-700"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Specialty Bean Bag Inquiry">Specialty Bean Bag Inquiry</option>
                      <option value="Stir Lates / Table Inquiry">Stir Lates / Table Inquiry</option>
                      <option value="Public Cupping Workshop">Public Cupping Workshop</option>
                      <option value="Wholesale / Collaborations">Wholesale / Collaborations</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all bg-stone-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-2xs"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Note to Brixton</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="pt-8 border-t border-stone-200">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Everything you need to know before visiting our Brixton coffee shop.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-stone-200/80 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-stone-900 hover:text-stone-950"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
