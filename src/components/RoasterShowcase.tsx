import React, { useState } from 'react';
import { CoffeeBean } from '../types';
import { FEATURED_BEANS, COFFEE_SHELF_IMG } from '../data/coffeeData';
import { Globe, Sparkles, ShoppingBag, Info, Check, Filter } from 'lucide-react';

interface RoasterShowcaseProps {
  onSelectBean: (bean: CoffeeBean) => void;
}

export const RoasterShowcase: React.FC<RoasterShowcaseProps> = ({ onSelectBean }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'anaerobic' | 'washed' | 'featured'>('all');

  const filteredBeans = FEATURED_BEANS.filter((bean) => {
    if (activeFilter === 'featured') return bean.featured;
    if (activeFilter === 'anaerobic') return bean.process.toLowerCase().includes('anaerobic');
    if (activeFilter === 'washed') return bean.process.toLowerCase().includes('washed');
    return true;
  });

  return (
    <section id="roasters" className="py-16 lg:py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[0.2em] text-amber-700 uppercase mb-2">
              THE WORLD IN BRIXTON
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
              Rotating Guest Roasters from Amsterdam to Tokyo
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              We don't tie ourselves to one house roaster. Every week, our custom ladder shelves fill with fresh roasts from Europe's most groundbreaking roasters—each selected for vivid varietals, terroir clarity, and ethical farm partnerships.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/80 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Bags ({FEATURED_BEANS.length})
            </button>
            <button
              onClick={() => setActiveFilter('featured')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'featured'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Curator's Pick
            </button>
            <button
              onClick={() => setActiveFilter('anaerobic')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'anaerobic'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Anaerobic & Experimental
            </button>
            <button
              onClick={() => setActiveFilter('washed')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'washed'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Clean Washed
            </button>
          </div>
        </div>

        {/* Featured Bean Shelf Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white mb-12 border border-stone-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-300 uppercase mb-3">
                <Globe className="w-4 h-4" />
                <span>DIRECT IMPORTS ON BRIXTON HILL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                Our Famous Ladder Shelves: Weekly Curations
              </h3>
              <p className="mt-3 text-stone-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Step inside 111 Brixton Hill and browse our iconic floor-to-ceiling wooden ladder. From Friedhats' iconic apothecary containers to DAK's pastel illustrations, every bag is rested and ready for home extraction or batch brews.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-stone-300">
                <div>
                  <span className="font-bold text-white block text-sm">6+ Roasters</span>
                  <span>Rotating Monthly</span>
                </div>
                <div className="w-px h-8 bg-stone-700" />
                <div>
                  <span className="font-bold text-white block text-sm">250g Whole Bean</span>
                  <span>Fresh Ground On Demand</span>
                </div>
                <div className="w-px h-8 bg-stone-700" />
                <div>
                  <span className="font-bold text-white block text-sm">Mahlkönig EK43</span>
                  <span>Precision Dialed</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] relative">
              <img
                src={COFFEE_SHELF_IMG}
                alt="Curated specialty coffee bags on Stir Coffee's wooden ladder shelf"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent lg:block hidden" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBeans.map((bean) => (
            <div
              key={bean.id}
              className="group flex flex-col justify-between bg-stone-50/70 hover:bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-stone-300 transition-all duration-200 shadow-2xs hover:shadow-xs"
            >
              <div>
                {/* Header: Roaster & Origin Info */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                      {bean.roaster}
                    </span>
                    <span className="text-xs text-stone-500">
                      {bean.roasterLocation}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                    £{bean.price.toFixed(2)}
                  </span>
                </div>

                {/* Bean Title */}
                <h4 className="text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {bean.name}
                </h4>

                {/* Tasting Notes - Anti-Slop Zero-Pill: Clean unboxed text with typographic separators */}
                <div className="mt-3 py-2 px-3 bg-white/90 rounded-lg border border-stone-200/60 text-xs">
                  <span className="text-stone-400 font-medium mr-1.5">Notes:</span>
                  <span className="font-semibold text-stone-800">
                    {bean.tastingNotes.join(' · ')}
                  </span>
                </div>

                {/* Technical Metadata - Unboxed clean layout */}
                <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-stone-600 border-t border-stone-200/60 pt-3">
                  <div>
                    <span className="text-stone-400 block">Origin</span>
                    <span className="font-medium text-stone-800">{bean.origin}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Process</span>
                    <span className="font-medium text-stone-800">{bean.process}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Variety</span>
                    <span className="font-medium text-stone-800">{bean.variety}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Elevation</span>
                    <span className="font-medium text-stone-800">{bean.altitude}</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {bean.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between gap-3">
                <span className="text-xs text-stone-500">
                  {bean.weight} · {bean.inStock ? 'In Stock in Café' : 'Low Stock'}
                </span>
                <button
                  onClick={() => onSelectBean(bean)}
                  disabled={!bean.inStock}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    bean.inStock
                      ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-2xs'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{bean.inStock ? 'Reserve 250g' : 'Sold Out'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Roaster Partner Lineup Marquee */}
        <div className="mt-16 pt-8 border-t border-stone-200">
          <div className="text-center text-xs font-bold tracking-widest text-stone-400 uppercase mb-6">
            FEATURED ROASTING PARTNERS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { name: 'FRIEDHATS', city: 'Amsterdam' },
              { name: 'DAK COFFEE', city: 'Amsterdam' },
              { name: 'MANHATTAN', city: 'Rotterdam' },
              { name: 'LA CABRA', city: 'Denmark' },
              { name: 'NOMAD', city: 'Barcelona' },
              { name: 'CLOUD PICKER', city: 'Dublin' },
            ].map((partner) => (
              <div
                key={partner.name}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 hover:bg-stone-100 transition-colors"
              >
                <div className="font-extrabold text-sm text-stone-800 tracking-tight font-display">
                  {partner.name}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">{partner.city}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
