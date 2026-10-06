import React, { useState } from 'react';
import { SHOP_INFO } from '../data/coffeeData';
import { Instagram, Mail, ArrowUpRight, Check, Heart } from 'lucide-react';

interface FooterProps {
  onCopyAddress: () => void;
  addressCopied: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onCopyAddress, addressCopied }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <footer className="bg-stone-100 text-stone-800 border-t border-stone-200">
      {/* Top Footer: Brand, Newsletter & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xl font-extrabold tracking-tight font-display text-stone-900">
              STIR COFFEE · BRIXTON
            </div>
            <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
              Showcasing coffee from around the world. Proudly independent specialty café located at 111 Brixton Hill, London SW2 1AA.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={SHOP_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SHOP_INFO.email}`}
                className="w-8 h-8 rounded-lg bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Opening Schedule */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-stone-900">
              OPENING HOURS
            </div>
            <div className="space-y-1.5 text-xs text-stone-600">
              <div>
                <span className="font-semibold text-stone-800 block">Monday – Friday</span>
                <span className="font-mono text-stone-900">07:30 – 15:00</span>
              </div>
              <div className="pt-1">
                <span className="font-semibold text-stone-800 block">Saturday – Sunday</span>
                <span className="font-mono text-stone-900">09:00 – 15:00</span>
              </div>
              <div className="pt-1">
                <span className="font-semibold text-amber-900 block">Stir Lates (Friday)</span>
                <span className="font-mono text-amber-900">17:00 – 22:00</span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-stone-900">
              THE ROASTER DISPATCH
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sign up for notifications when new guest lots drop on our ladder shelves from Amsterdam, Copenhagen, and Tokyo.
            </p>
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-100/70 border border-emerald-200 text-xs text-emerald-800 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>You're subscribed to new bean drops!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar matching original screenshot text:
            "Stir Coffee Brixton, 111 Brixton Hill , London, United Kingdom"
            "info@stircoffee.co.uk" */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="text-center sm:text-left space-y-0.5">
            <div>Stir Coffee Brixton, 111 Brixton Hill, London, United Kingdom SW2 1AA</div>
            <div>
              <a
                href={`mailto:${SHOP_INFO.email}`}
                className="hover:text-stone-900 transition-colors font-medium underline underline-offset-2 decoration-stone-300"
              >
                {SHOP_INFO.email}
              </a>
            </div>
          </div>

          <div className="text-center sm:text-right text-[11px] text-stone-400">
            © {new Date().getFullYear()} Stir Coffee Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
