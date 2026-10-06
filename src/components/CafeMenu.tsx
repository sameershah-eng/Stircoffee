import React, { useState } from 'react';
import { MENU_ITEMS, BARISTA_POUROVER_IMG } from '../data/coffeeData';
import { Coffee, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

export const CafeMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'espresso' | 'filter' | 'iced' | 'food'>('espresso');

  const categories = [
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'filter', label: 'Filter & Batch Brew' },
    { id: 'iced', label: 'Iced & Refreshing' },
    { id: 'food', label: 'Brixton Deli & Bakery' },
  ];

  const currentItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-amber-700 uppercase mb-2">
            DAILY COUNTER MENU
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            Crafted on Brixton Hill
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            From our calibrated La Marzocco Linea PB espresso machine to hand-poured single origins and toasted sourdough melts, everything is prepared fresh with uncompromised attention to detail.
          </p>
        </div>

        {/* Category Tabs (Functional segmented controls) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-200/60 rounded-xl max-w-fit mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Layout: Menu Items List + High-Fidelity Feature Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Menu Items List */}
          <div className="lg:col-span-7 space-y-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-2xs hover:border-stone-300 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
                    {item.originOrRoaster && (
                      <span>{item.originOrRoaster}</span>
                    )}
                    {item.originOrRoaster && item.dietary && (
                      <span aria-hidden="true">·</span>
                    )}
                    {item.dietary && (
                      <span className="font-medium text-amber-800/80">{item.dietary}</span>
                    )}
                  </div>
                </div>

                <div className="sm:self-start">
                  <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}

            {/* Milk & Dietary Promise Box */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold">No Milk Surcharge:</span> We believe oat milk (Oatly Barista) and Minor Figures should never carry an extra fee. Decaf single origins also available on request.
              </div>
            </div>
          </div>

          {/* Feature Spotlight Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-xs">
              <div className="aspect-4/3 relative overflow-hidden bg-stone-100">
                <img
                  src={BARISTA_POUROVER_IMG}
                  alt="Precision barista pour-over at Stir Coffee Brixton"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
                    Filter Bar Routine
                  </div>
                  <div className="text-base font-bold">
                    Brewed by Hand, Gram by Gram
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h4 className="text-base font-bold text-stone-900 font-display">
                  Our Water & Grinder Standards
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Water is 98% of your cup. In Brixton, we run custom multi-stage reverse osmosis filtration re-mineralized with magnesium and calcium for luminous acidity and sweetness. Grinding is handled exclusively on our Mahlkönig EK43S.
                </p>
                <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block">Espresso</span>
                    <span className="font-semibold text-stone-800">La Marzocco Linea PB</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Water Temp</span>
                    <span className="font-semibold text-stone-800">93.5°C Controlled</span>
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
