import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Gift, Sparkles, Check, RotateCcw, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';

interface DigitalStampCardProps {
  onShowToast: (msg: string) => void;
}

export const DigitalStampCard: React.FC<DigitalStampCardProps> = ({ onShowToast }) => {
  const TOTAL_STAMPS = 8;
  const [stamps, setStamps] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('stir_coffee_stamps');
      return saved ? Math.min(Number(saved), TOTAL_STAMPS) : 5; // default 5 for great initial engagement preview
    } catch {
      return 5;
    }
  });

  const [showRewardModal, setShowRewardModal] = useState(false);
  const isComplete = stamps >= TOTAL_STAMPS;
  const progressPercent = Math.round((stamps / TOTAL_STAMPS) * 100);

  useEffect(() => {
    try {
      localStorage.setItem('stir_coffee_stamps', stamps.toString());
    } catch {}
  }, [stamps]);

  const handleAddStamp = () => {
    if (stamps < TOTAL_STAMPS) {
      const next = stamps + 1;
      setStamps(next);
      if (next === TOTAL_STAMPS) {
        setShowRewardModal(true);
        onShowToast('🎉 Congratulations! You have unlocked your FREE Stir Coffee drink voucher!');
      } else {
        onShowToast(`Stamp #${next} collected! Only ${TOTAL_STAMPS - next} more for your free drink.`);
      }
    } else {
      setShowRewardModal(true);
    }
  };

  const handleResetCard = () => {
    setStamps(0);
    setShowRewardModal(false);
    onShowToast('Passport reset. Fresh round of stamps started!');
  };

  return (
    <section id="passport" className="py-16 lg:py-24 bg-mesh-subtle border-b border-stone-200/70 relative overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-amber-800 uppercase mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>COMMUNITY LOYALTY PASSPORT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            Digital Coffee Stamp Card
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            No paper stamp cards to lose in your coat pocket. Collect stamps on Brixton Hill with every handcrafted cup. Your 8th drink is entirely on the house.
          </p>
        </div>

        {/* Passport Card UI */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200/90 shadow-lg p-6 sm:p-10 relative overflow-hidden">
            {/* Top Bar of Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-stone-400">
                  PASSPORT NO. STR-BRX-2026
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display mt-0.5">
                  Brixton Regular Loyalty Pass
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Valid for all espresso drinks, batch brews, and single origin V60s.
                </p>
              </div>

              {/* Progress Summary Pill */}
              <div className="flex items-center gap-3 bg-stone-50 px-4 py-2.5 rounded-2xl border border-stone-200/80 self-start sm:self-auto">
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">
                    {stamps} of {TOTAL_STAMPS} Collected
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    {TOTAL_STAMPS - stamps === 0 ? 'Reward ready!' : `${TOTAL_STAMPS - stamps} drinks to free reward`}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  {progressPercent}%
                </div>
              </div>
            </div>

            {/* Smooth Progress Bar */}
            <div className="py-6">
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-stone-200/60">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* The 8 Stamp Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 my-2">
              {Array.from({ length: TOTAL_STAMPS }).map((_, index) => {
                const isStamped = index < stamps;
                const isGoal = index === TOTAL_STAMPS - 1;

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-2xl aspect-square flex flex-col items-center justify-center border transition-all ${
                      isStamped
                        ? 'bg-amber-50/80 border-amber-300 text-amber-900 shadow-2xs'
                        : isGoal
                        ? 'bg-stone-50 border-dashed border-amber-400 text-amber-700'
                        : 'bg-stone-50/60 border-dashed border-stone-200 text-stone-300'
                    }`}
                  >
                    {isStamped ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs mb-1">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-amber-800">
                          #{index + 1}
                        </span>
                      </motion.div>
                    ) : isGoal ? (
                      <div className="flex flex-col items-center text-center p-1">
                        <Gift className="w-6 h-6 text-amber-600 animate-bounce mb-0.5" />
                        <span className="text-[9px] font-bold uppercase tracking-tight text-amber-800">
                          FREE CUP
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Coffee className="w-5 h-5 text-stone-300 mb-1" />
                        <span className="text-[10px] font-mono text-stone-400">
                          {index + 1}
                        </span>
                      </div>
                    )}

                    {/* Corner badge for final stamp */}
                    {isGoal && !isStamped && (
                      <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[8px] font-bold px-1 rounded-full uppercase">
                        Perk
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Controller & Action Buttons */}
            <div className="pt-8 mt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Simulate your real in-store Brixton visits or scan QR code on counter.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddStamp}
                  disabled={isComplete}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isComplete
                      ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm'
                      : 'bg-stone-900 text-white hover:bg-stone-800 shadow-2xs'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>{isComplete ? 'View Free Reward' : '+ Add Test Stamp'}</span>
                </button>

                {stamps > 0 && (
                  <button
                    onClick={handleResetCard}
                    className="p-2.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
                    title="Reset stamp card"
                    aria-label="Reset stamp card"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Celebratory Reward Modal */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm p-4 flex items-center justify-center"
            onClick={() => setShowRewardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 flex items-center justify-center mx-auto shadow-md mb-4">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <div className="text-xs font-bold uppercase tracking-widest text-amber-800">
                PASSPORT COMPLETE!
              </div>
              <h3 className="text-2xl font-black text-stone-900 font-display mt-1">
                Your Next Drink is Free
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Thank you for being part of our Brixton specialty coffee community! Show this digital voucher to the barista at 111 Brixton Hill.
              </p>

              {/* Digital Voucher Display */}
              <div className="my-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-amber-900 uppercase">
                    VOUCHER CODE
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Active & Valid
                  </span>
                </div>
                <div className="font-mono text-xl font-black text-stone-900 tracking-wider">
                  STR-FREE-9821
                </div>
                <div className="text-[11px] text-amber-800 mt-1">
                  Valid for any drink on our menu (Hand Drip V60, Geisha, Flat White, or Stir Lates Beer).
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-2xs"
                >
                  Keep Voucher Ready
                </button>
                <button
                  onClick={handleResetCard}
                  className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 py-1"
                >
                  Redeem & Start New Stamp Card
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
