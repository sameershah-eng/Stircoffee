import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { CoffeeBean } from '../types';
import { FEATURED_BEANS } from '../data/coffeeData';

interface FlavorWheelMatcherProps {
  onSelectBean: (bean: CoffeeBean) => void;
}

interface FlavorCategory {
  id: string;
  name: string;
  color: string;
  badgeBg: string;
  notes: string[];
  recommendedBeanId: string;
  description: string;
}

export const FlavorWheelMatcher: React.FC<FlavorWheelMatcherProps> = ({ onSelectBean }) => {
  const flavorFamilies: FlavorCategory[] = [
    {
      id: 'tropical',
      name: 'Tropical & Vibrant',
      color: 'text-amber-700 border-amber-300 bg-amber-50',
      badgeBg: 'bg-amber-100 text-amber-900',
      notes: ['Pink Guava', 'Blood Orange', 'Sparkling Yuzu'],
      recommendedBeanId: 'friedhats-fiesole',
      description: 'Bright citric and malic acidity with explosive tropical sweetness.',
    },
    {
      id: 'pastry',
      name: 'Pastry & Decadent',
      color: 'text-orange-800 border-orange-300 bg-orange-50',
      badgeBg: 'bg-orange-100 text-orange-900',
      notes: ['Cardamom Bun', 'Vanilla Cream', 'Spiced Plum'],
      recommendedBeanId: 'dak-milky-cake',
      description: 'Creamy, sweet, and comforting with sweet baked pastry aromatics.',
    },
    {
      id: 'floral',
      name: 'Floral & Delicate',
      color: 'text-emerald-800 border-emerald-300 bg-emerald-50',
      badgeBg: 'bg-emerald-100 text-emerald-900',
      notes: ['Jasmine Blossom', 'Bergamot', 'Earl Grey'],
      recommendedBeanId: 'manhattan-letty-bermudez',
      description: 'Tea-like clarity, high-altitude aromatics, and lingering jasmine finish.',
    },
    {
      id: 'stonefruit',
      name: 'Clean & Stone Fruit',
      color: 'text-stone-800 border-stone-300 bg-stone-50',
      badgeBg: 'bg-stone-200 text-stone-900',
      notes: ['Apricot Nectar', 'Red Apple', 'Brown Sugar'],
      recommendedBeanId: 'la-cabra-guji-hambela',
      description: 'Classic Scandinavian washed profile with refined sweetness and juicy body.',
    },
  ];

  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('tropical');
  const activeFamily = flavorFamilies.find((f) => f.id === selectedFamilyId) || flavorFamilies[0];
  const matchedBean = FEATURED_BEANS.find((b) => b.id === activeFamily.recommendedBeanId) || FEATURED_BEANS[0];

  return (
    <section id="flavor-match" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-amber-800 uppercase mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE SENSORY FLAVOR MATCHER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            Find Your Sensory Match
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Every coffee lot on our ladder shelves has a distinctive sensory fingerprint. Select the flavor profile you crave and let our palate algorithm match you with the ideal roaster and varietal.
          </p>
        </div>

        {/* Sensory Wheel Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Flavor Family Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {flavorFamilies.map((fam) => {
              const isSelected = fam.id === selectedFamilyId;
              return (
                <button
                  key={fam.id}
                  onClick={() => setSelectedFamilyId(fam.id)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-white border-stone-900 ring-2 ring-stone-900/10 shadow-md'
                      : 'bg-white/70 border-stone-200/80 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-stone-900 font-display">
                      {fam.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                    )}
                  </div>

                  <p className="text-xs text-stone-500 mb-3 leading-relaxed">
                    {fam.description}
                  </p>

                  <div className="text-[11px] font-medium text-stone-700">
                    {fam.notes.join(' · ')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Matched Bean Result Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFamily.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      98% TASTE MATCH FOUND
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-stone-400">
                    In Stock on Brixton Shelf
                  </span>
                </div>

                <div className="my-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {matchedBean.roaster} ({matchedBean.roasterLocation})
                  </span>
                  <h3 className="text-2xl font-black text-stone-900 font-display mt-0.5">
                    {matchedBean.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {matchedBean.origin} · {matchedBean.process} · {matchedBean.variety}
                  </p>
                </div>

                {/* Key Tasting Notes Bar */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Dominant Sensory Notes
                  </span>
                  <div className="text-sm font-bold text-stone-800">
                    {matchedBean.tastingNotes.join(' · ')}
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-6">
                  {matchedBean.description}
                </p>

                {/* Footer and Reserve Button */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Bag Price</span>
                    <span className="font-mono text-lg font-bold text-stone-900 tabular-nums">
                      £{matchedBean.price.toFixed(2)} <span className="text-xs font-normal text-stone-500">/ 250g</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectBean(matchedBean)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Reserve Fresh Bag</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
