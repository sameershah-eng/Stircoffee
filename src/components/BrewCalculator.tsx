import React, { useState, useEffect } from 'react';
import { BREW_RECIPES } from '../data/coffeeData';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Clock, Sparkles, Copy, Check } from 'lucide-react';

export const BrewCalculator: React.FC = () => {
  const [selectedMethodId, setSelectedMethodId] = useState('v60');
  const [coffeeGrams, setCoffeeGrams] = useState(15);
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 mins default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [copiedRecipe, setCopiedRecipe] = useState(false);

  const currentRecipe = BREW_RECIPES.find((r) => r.id === selectedMethodId) || BREW_RECIPES[0];
  const totalWaterGrams = Math.round(coffeeGrams * currentRecipe.ratio);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(selectedMethodId === 'aeropress' ? 120 : selectedMethodId === 'batch-press' ? 240 : 180);
  };

  const handleMethodChange = (id: string) => {
    setSelectedMethodId(id);
    setIsTimerRunning(false);
    setTimerSeconds(id === 'aeropress' ? 120 : id === 'batch-press' ? 240 : 180);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopyRecipe = () => {
    const text = `Stir Coffee Brixton Home Brew Recipe:
Method: ${currentRecipe.name}
Coffee: ${coffeeGrams}g
Water: ${totalWaterGrams}g (${currentRecipe.temp})
Ratio: 1:${currentRecipe.ratio}
Grind: ${currentRecipe.grind}
Target Time: ${currentRecipe.time}`;
    navigator.clipboard.writeText(text);
    setCopiedRecipe(true);
    setTimeout(() => setCopiedRecipe(false), 2000);
  };

  return (
    <section id="brew-guide" className="py-16 lg:py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-amber-700 uppercase mb-2">
            HOME EXTRACTION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            The Brixton Brew Ratio Calculator
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Take our European guest beans home and dial them in perfectly. Adjust your dose in grams to calculate the exact water weight, temperature, and pour timeline.
          </p>
        </div>

        {/* Main Grid: Calculator Controller + Extraction Timer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Method Selector & Dose Controller */}
          <div className="lg:col-span-7 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/80 space-y-8">
            {/* Method Tabs */}
            <div>
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">
                1. Select Extraction Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {BREW_RECIPES.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleMethodChange(method.id)}
                    className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                      selectedMethodId === method.id
                        ? 'bg-white border-stone-900 text-stone-900 shadow-2xs ring-1 ring-stone-900'
                        : 'bg-stone-100/70 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <div className="font-bold text-sm text-stone-900">{method.name.split(' ')[0]}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Ratio 1:{method.ratio}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coffee Dose Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  2. Ground Coffee Dose
                </label>
                <span className="font-mono text-base font-bold text-stone-900 bg-white px-3 py-1 rounded-lg border border-stone-200 tabular-nums">
                  {coffeeGrams}g
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="35"
                step="1"
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="w-full accent-stone-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>12g (Single cup)</span>
                <span>20g (Standard mug)</span>
                <span>35g (Two cups / Chemex)</span>
              </div>
            </div>

            {/* Calculated Metrics Grid (Zero-pill tabular layout) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-200">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-amber-700" />
                  <span>Total Water</span>
                </div>
                <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                  {totalWaterGrams}g
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-rose-600" />
                  <span>Water Temp</span>
                </div>
                <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                  {currentRecipe.temp}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>Target Time</span>
                </div>
                <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                  {currentRecipe.time}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Grind Size</span>
                </div>
                <div className="text-xs font-semibold text-stone-800 leading-tight mt-1">
                  {currentRecipe.grind.split(' ')[0]}
                </div>
              </div>
            </div>

            {/* Step-by-step pour guide */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Pouring Sequence
                </span>
                <button
                  onClick={handleCopyRecipe}
                  className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  {copiedRecipe ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied Recipe</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Recipe</span>
                    </>
                  )}
                </button>
              </div>

              <ol className="space-y-2 text-xs text-stone-600">
                {currentRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="font-mono font-bold text-amber-800 text-[11px] shrink-0 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Column: Live Extraction Stopwatch Timer */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-3 border-b border-stone-800">
                <span className="uppercase font-mono tracking-wider">Dialed-in Timer</span>
                <span>{currentRecipe.name}</span>
              </div>

              <div className="text-center py-8">
                <div className="font-mono text-6xl sm:text-7xl font-bold tracking-tight text-white tabular-nums">
                  {formatTimer(timerSeconds)}
                </div>
                <p className="text-xs text-stone-400 mt-3">
                  {isTimerRunning
                    ? 'Pour in controlled spirals, checking water weight on scale'
                    : timerSeconds === 0
                    ? 'Extraction complete! Swirl and enjoy.'
                    : 'Ready to brew. Tap Start when pouring first 45g bloom.'}
                </p>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="pt-6 border-t border-stone-800 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-colors shadow-sm ${
                  isTimerRunning
                    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                    : 'bg-white text-stone-950 hover:bg-stone-100'
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-stone-950" />
                    <span>Pause Timer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-stone-950" />
                    <span>Start Timer</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetTimer}
                className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
