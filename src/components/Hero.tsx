import React from 'react';
import { MapPin, Clock, ArrowRight, Sparkles, Compass, Check, Copy } from 'lucide-react';
import { HERO_LATTE_IMG, SHOP_INFO } from '../data/coffeeData';

interface HeroProps {
  onExploreRoasters: () => void;
  onViewMenu: () => void;
  onCopyAddress: () => void;
  addressCopied: boolean;
  isOpenNow: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreRoasters,
  onViewMenu,
  onCopyAddress,
  addressCopied,
  isOpenNow,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-mesh-subtle border-b border-stone-200/70">
      {/* Subtle decorative background light blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-stone-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Brand Header */}
        <div className="flex flex-col items-center text-center mb-8 lg:mb-12">
          <div className="text-xs font-bold tracking-[0.25em] text-stone-500 uppercase mb-2">
            STIR COFFEE · BRIXTON HILL · EST. 2016
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight max-w-4xl font-display leading-[1.08] text-balance">
            {SHOP_INFO.heroStatement}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl text-balance">
            {SHOP_INFO.subtext}
          </p>
        </div>

        {/* Main Content Grid: Information + Hero Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Location, Hours, Meta & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location & Hours Card - Clean unboxed metadata with subtle hairline separation */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/80 p-6 sm:p-7 shadow-xs">
              {/* Location Block */}
              <div className="pb-5 border-b border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold tracking-widest text-stone-400 uppercase">
                    LOCATION
                  </div>
                  <button
                    onClick={onCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/80 px-2.5 py-1 rounded-md transition-colors"
                    title="Copy address to clipboard"
                  >
                    {addressCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-lg font-bold text-stone-900 leading-snug">
                  111 Brixton Hill
                </div>
                <div className="text-sm text-stone-500">
                  London SW2 1AA · United Kingdom
                </div>
                <div className="text-xs text-stone-400 mt-1">
                  10 min walk from Brixton Underground (Victoria Line) or bus 159/250
                </div>
              </div>

              {/* Opening Hours Block */}
              <div className="pt-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold tracking-widest text-stone-400 uppercase">
                    OPENING HOURS
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span>{isOpenNow ? 'Open Now' : 'Closed · Opens 07:30'}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center text-stone-700">
                    <span className="font-medium">Monday – Friday</span>
                    <span className="font-mono tabular-nums text-stone-900 font-semibold">
                      07:30 – 15:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-stone-700">
                    <span className="font-medium">Saturday – Sunday</span>
                    <span className="font-mono tabular-nums text-stone-900 font-semibold">
                      09:00 – 15:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-amber-900 pt-2 border-t border-stone-100 text-xs">
                    <span className="font-semibold">Stir Lates (Friday Evening)</span>
                    <span className="font-mono tabular-nums font-semibold">17:00 – 22:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onExploreRoasters}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors shadow-xs group"
              >
                <span>Explore World Roasters</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onViewMenu}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-stone-800 bg-white border border-stone-200/90 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
              >
                <span>Café Drink Menu</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Swan Latte Art Visual with Origin Callout */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xl aspect-square sm:aspect-4/3 lg:aspect-square">
                <img
                  src={HERO_LATTE_IMG}
                  alt="Stir Coffee Brixton signature flat white with swan latte art on an ash wood café table"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Subtle scrim at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                {/* Caption overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs uppercase tracking-widest text-amber-200/90 font-bold mb-1">
                    Signature Pour
                  </div>
                  <div className="text-lg font-bold font-display">
                    Velvety Swan Microfoam on Guest Espresso
                  </div>
                  <div className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                    <span>Oatly or Organic Jersey Milk</span>
                    <span aria-hidden="true">·</span>
                    <span>Single Origin Batch Dialed In Daily</span>
                  </div>
                </div>
              </div>

              {/* Floating Tasting Note Callout Card */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-xl p-4 shadow-lg max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>On Bar This Week</span>
                </div>
                <div className="text-sm font-bold text-stone-900">
                  Friedhats (Amsterdam)
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Fiesole Pink Bourbon · Colombia
                </div>
                <div className="text-xs text-stone-600 mt-1.5 italic">
                  "Guava, blood orange, raw cacao nibs"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
