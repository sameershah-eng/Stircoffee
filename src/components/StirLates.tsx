import React, { useState } from 'react';
import { STIR_LATES_IMG, UPCOMING_EVENTS } from '../data/coffeeData';
import { Wine, Beer, Disc, Sparkles, Calendar, Clock, Users, Check } from 'lucide-react';
import { EventItem } from '../types';

interface StirLatesProps {
  onRSVP: (event: EventItem) => void;
}

export const StirLates: React.FC<StirLatesProps> = ({ onRSVP }) => {
  return (
    <section id="lates" className="py-16 lg:py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-violet-700 uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FRIDAY EVENINGS · 17:00 – 22:00</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            Stir Lates: Wine, Beer, Food & Music
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            As evening settles on Brixton Hill, we switch off the steam wands, dim the pendant lights, and open up our wine and beer fridges. No reservations required—just drop in for low-intervention orange wines, chilled craft cans, and freshly pressed toasties.
          </p>
        </div>

        {/* Feature Grid: Hero Banner + Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Visual Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-md aspect-4/3 sm:aspect-16/10">
              <img
                src={STIR_LATES_IMG}
                alt="Stir Lates evening atmosphere with natural wine and craft beer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-mono font-bold tracking-widest text-violet-300 uppercase mb-1">
                  BEER · WINE · FOOD · MUSIC
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display">
                  Every Friday Night at 111 Brixton Hill
                </div>
                <div className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                  <span>Doors open 17:00</span>
                  <span aria-hidden="true">·</span>
                  <span>Walk-ins always welcome</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center">
                  <Wine className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-stone-900 font-display">
                  Natural & Low-Intervention Wines
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Rotating skin-contact orange wines, pet-nats, un-oaked reds, and mineral whites sourced from small, independent European biodynamic vintners. Available by the glass or chilled bottle.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Beer className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-stone-900 font-display">
                  Craft Beer Can Bar
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cold cans fresh from our chiller, featuring Bandit Pale Ale, Outlooker, and guest microbrews from South London, Yorkshire, and Belgium.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center">
                  <Disc className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-stone-900 font-display">
                  Vinyl & Sound
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Local vinyl selectors and Brixton regulars spin soul, funk, reggae, dub, and rare grooves on our analog sound system.
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Lates & Community Sessions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                Upcoming Community Sessions
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Reserve a spot for special tastings or drop by freely on Friday nights.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-amber-800 uppercase tracking-wide">
                      {event.genre}
                    </span>
                    <span className="font-mono">{event.time}</span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2 font-display">
                    {event.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    <span className="font-semibold text-stone-800">{event.spotsLeft}</span> spots left
                  </span>
                  <button
                    onClick={() => onRSVP(event)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-2xs"
                  >
                    RSVP Free
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
