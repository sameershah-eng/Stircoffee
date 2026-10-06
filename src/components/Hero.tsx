import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, ArrowRight, Sparkles, Check, Copy, Coffee, Navigation, Compass, Star } from 'lucide-react';
import { HERO_LATTE_IMG, SHOP_INFO, FEATURED_BEANS } from '../data/coffeeData';

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
  const [activeNote, setActiveNote] = useState<string>('Guava & Blood Orange');

  const tasteTags = [
    { note: 'Pink Guava', roaster: 'Friedhats (Amsterdam)' },
    { note: 'Cardamom Bun', roaster: 'DAK (Amsterdam)' },
    { note: 'Jasmine Peach', roaster: 'Manhattan (Rotterdam)' },
    { note: 'Bergamot Floral', roaster: 'La Cabra (Denmark)' },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 bg-mesh-subtle border-b border-stone-200/80">
      {/* Soft elegant ambient lighting spheres */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-100/50 via-stone-100/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-stone-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Live Status Ribbon */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-xs text-stone-700 shadow-2xs">
            <span className="flex h-2 w-2 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </span>
            <span className="font-semibold text-stone-900">
              {isOpenNow ? 'Open Now in Brixton' : 'Opens Mon–Fri 07:30'}
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500 hidden sm:inline">111 Brixton Hill, SW2 1AA</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="font-medium text-amber-800">Rotating European Guest Roasters</span>
          </div>
        </div>

        {/* Hero Grid: Editorial Typography Left + Cinematic Framing Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Elegant Copy & Functional Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.22em] text-stone-500 uppercase mb-3">
                ARTISAN SPECIALTY COFFEE · BRIXTON HILL · EST. 2016
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-bold text-stone-900 tracking-tight leading-[1.1] text-balance font-display">
                Probably one of London's best coffee shops,{' '}
                <span className="text-stone-800 font-extrabold relative inline-block">
                  showcasing coffee
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-amber-300/80 -z-10"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,15 Q50,0 100,15" fill="currentColor" />
                  </svg>
                </span>{' '}
                from around the world.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-balance">
              Perched midway up Brixton Hill. We source and rotate rare single origins and micro-lots from visionary roasters across Amsterdam, Rotterdam, and Copenhagen—poured alongside artisan bakes and Friday night natural wines.
            </p>

            {/* Interactive Tasting Notes Pills */}
            <div className="pt-1">
              <span className="text-xs font-semibold text-stone-400 block mb-2 uppercase tracking-wider">
                Currently Tasting on Counter
              </span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {tasteTags.map((item) => (
                  <button
                    key={item.note}
                    onClick={() => setActiveNote(item.note)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      activeNote === item.note
                        ? 'bg-stone-900 text-white shadow-2xs scale-105'
                        : 'bg-white border border-stone-200/80 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span>✨ {item.note}</span>
                    <span className="text-[10px] text-stone-400 ml-1.5 font-normal">
                      ({item.roaster.split(' ')[0]})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreRoasters}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-sm hover:shadow-md group"
              >
                <span>Explore World Roasters</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewMenu}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white border border-stone-200/90 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
              >
                <Coffee className="w-4 h-4 text-stone-600" />
                <span>Café Drink Menu</span>
              </button>
            </div>

            {/* Key Trust / Quality Markers Strip */}
            <div className="pt-6 border-t border-stone-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-lg font-bold text-stone-900 font-display">6+ Roasters</div>
                <div className="text-xs text-stone-500">Rotating weekly</div>
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 font-display">No Surcharge</div>
                <div className="text-xs text-stone-500">Oat & whole milk equal</div>
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 font-display">La Marzocco</div>
                <div className="text-xs text-stone-500">Linea PB & EK43 dialed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 font-display flex items-center gap-1">
                  <span>4.9</span>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-xs text-stone-500">Brixton community favorite</div>
              </div>
            </div>
          </div>

          {/* Right Column: Eyecatching Hero Frame with Swan Latte Art & Glass Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-200/60 via-stone-200/40 to-stone-100 rounded-[2.2rem] blur-xs -z-10" />

              {/* Main Photo Card Container */}
              <div className="relative rounded-[2rem] overflow-hidden bg-white border border-stone-200/90 shadow-xl aspect-square sm:aspect-4/3 lg:aspect-square group">
                <img
                  src={HERO_LATTE_IMG}
                  alt="Stir Coffee Brixton signature flat white with swan latte art on an ash wood table"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Subtle scrim for bottom text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-transparent" />

                {/* Bottom Photo Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                      SIGNATURE POUR
                    </span>
                    <span className="text-xs text-stone-300">La Marzocco Linea PB</span>
                  </div>
                  <div className="text-xl font-bold font-display leading-tight">
                    Swan Microfoam on Guest Espresso
                  </div>
                  <div className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                    <span>111 Brixton Hill</span>
                    <span>·</span>
                    <span>Dialed in fresh every morning</span>
                  </div>
                </div>
              </div>

              {/* Floating Glass Badge 1: Top Right */}
              <div className="absolute -top-4 -right-3 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 shadow-lg hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-900 leading-tight">
                    Guest Shelf Drop
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Friedhats · DAK · Manhattan
                  </div>
                </div>
              </div>

              {/* Floating Glass Badge 2: Bottom Left Location & Hours */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-4 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-4 shadow-lg sm:max-w-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>111 Brixton Hill</span>
                  </div>
                  <button
                    onClick={onCopyAddress}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 hover:text-stone-950 transition-colors"
                  >
                    {addressCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-stone-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Mon – Fri:</span>
                    <span className="font-semibold text-stone-900 font-mono">07:30 – 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sat – Sun:</span>
                    <span className="font-semibold text-stone-900 font-mono">09:00 – 15:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
