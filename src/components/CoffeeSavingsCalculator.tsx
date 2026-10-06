import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, PiggyBank, Check, Coffee, Package, Sparkles } from 'lucide-react';

interface CoffeeSavingsCalculatorProps {
  onSubscribe: (summary: string) => void;
}

export const CoffeeSavingsCalculator: React.FC<CoffeeSavingsCalculatorProps> = ({ onSubscribe }) => {
  const [cupsPerDay, setCupsPerDay] = useState(2);
  const [frequency, setFrequency] = useState<'biweekly' | 'monthly'>('biweekly');
  const [roastType, setRoastType] = useState('Surprise Guest Rotation');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Financial model:
  // Average London flat white: £3.80
  // Stir Coffee home brew (15g dose from 250g £17 bag = ~16 cups per bag = ~£1.06/cup or ~£0.68/cup on subscription discount)
  const londonCafeCostPerCup = 3.80;
  const stirHomeCostPerCup = 0.72;

  const monthlyCups = cupsPerDay * 30;
  const cafeMonthlySpend = Math.round(monthlyCups * londonCafeCostPerCup);
  const stirMonthlySpend = Math.round(monthlyCups * stirHomeCostPerCup);
  const monthlySavings = cafeMonthlySpend - stirMonthlySpend;
  const annualSavings = monthlySavings * 12;

  // Estimated 250g bags needed per month (15g per cup = 450g per 30 cups = ~2 bags per cup/day)
  const bagsPerMonth = Math.max(1, Math.ceil((monthlyCups * 15) / 250));

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    onSubscribe(`Subscribed to ${bagsPerMonth} bags/mo (${roastType}) - Saving £${annualSavings}/yr!`);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <section id="subscription" className="py-16 lg:py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-amber-800 uppercase mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>VALUE & SUBSCRIPTION CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            The London Coffee Habit Economics
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Buying takeaway coffee in London adds up to thousands a year. See how much you save by brewing world-class guest beans from Amsterdam, Rotterdam, and Copenhagen right at home.
          </p>
        </div>

        {/* 2-Column Layout: Calculator + Subscription Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Spend & Savings Engine */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/80 flex flex-col justify-between">
            <div>
              {/* Slider Controller */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Your Household Daily Coffee Consumption
                  </label>
                  <span className="font-mono text-base font-bold text-stone-900 bg-white px-3.5 py-1 rounded-xl border border-stone-200/80 shadow-2xs tabular-nums">
                    {cupsPerDay} {cupsPerDay === 1 ? 'cup' : 'cups'} / day
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={cupsPerDay}
                  onChange={(e) => setCupsPerDay(Number(e.target.value))}
                  className="w-full accent-stone-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-2">
                  <span>1 cup (Solo drinker)</span>
                  <span>2-3 cups (Couples / Coffee devotee)</span>
                  <span>4-5 cups (Home office)</span>
                </div>
              </div>

              {/* Real-Time Comparative Value Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
                  <div className="text-xs text-stone-500 mb-1">London Takeaway Spend</div>
                  <div className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                    £{cafeMonthlySpend} <span className="text-xs font-normal text-stone-400">/ month</span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    Based on £3.80 average takeaway flat white
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
                  <div className="text-xs text-amber-800 font-semibold mb-1">Stir Guest Bean Subscription</div>
                  <div className="font-mono text-2xl font-bold text-amber-900 tabular-nums">
                    £{stirMonthlySpend} <span className="text-xs font-normal text-amber-700">/ month</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Includes {bagsPerMonth}x 250g fresh international bags
                  </div>
                </div>
              </div>

              {/* Big Highlighted ROI Callout */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-stone-100 border border-amber-200/90 text-stone-900">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  <PiggyBank className="w-4 h-4 text-amber-700" />
                  <span>TOTAL ESTIMATED HOUSEHOLD SAVINGS</span>
                </div>
                <div className="flex items-baseline gap-3 my-1">
                  <span className="font-mono text-4xl sm:text-5xl font-extrabold text-stone-950 tabular-nums">
                    £{annualSavings}
                  </span>
                  <span className="text-sm font-semibold text-stone-600">saved every year</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Plus you're drinking micro-lot 86+ SCA rated specialty coffees from Friedhats, DAK, and Manhattan instead of commercial high-street chains.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>Freshly roasted in Europe · Dispatched from Brixton</span>
              <span className="font-mono font-semibold text-stone-700">{bagsPerMonth * 16} cups brewed/mo</span>
            </div>
          </div>

          {/* Right Column: Custom Subscription Configurator */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                    BRIXTON ROTATING DISPATCH
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    Configure Your Plan
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                    SAVE 10%
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubscribeSubmit} className="space-y-5 text-xs">
                {/* Frequency Choice */}
                <div>
                  <label className="text-stone-300 font-medium block mb-2">
                    Delivery Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFrequency('biweekly')}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        frequency === 'biweekly'
                          ? 'border-amber-400 bg-stone-800 text-white ring-1 ring-amber-400'
                          : 'border-stone-700 bg-stone-800/40 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">Every 2 Weeks</div>
                      <div className="text-[10px] text-stone-400">Peak freshness</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        frequency === 'monthly'
                          ? 'border-amber-400 bg-stone-800 text-white ring-1 ring-amber-400'
                          : 'border-stone-700 bg-stone-800/40 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">Monthly Box</div>
                      <div className="text-[10px] text-stone-400">Standard batch</div>
                    </button>
                  </div>
                </div>

                {/* Flavor Profile Profile */}
                <div>
                  <label className="text-stone-300 font-medium block mb-2">
                    Curator Flavor Profile
                  </label>
                  <div className="space-y-1.5">
                    {[
                      'Surprise Guest Rotation (Recommended)',
                      'Light & Floral (Washed Ethiopian / Gesha)',
                      'Funky & Fruity (Thermal Shock / Anaerobic)',
                      'Rich & Comforting (Cardamom, Chocolate, Nuts)',
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setRoastType(opt)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-colors ${
                          roastType === opt
                            ? 'border-amber-400 bg-stone-800 text-amber-300 font-semibold'
                            : 'border-stone-800 bg-stone-800/30 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plan Highlights */}
                <div className="py-3 border-t border-stone-800 space-y-1.5 text-stone-300 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Free shipping across London & UK via Royal Mail 24</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Skip, pause, or cancel anytime with 1 click</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Includes subscriber digital stamps towards in-café rewards</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-stone-950" />
                  <span>Start Subscription ({bagsPerMonth} bags · £{stirMonthlySpend}/mo)</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
