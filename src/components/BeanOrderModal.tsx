import React, { useState } from 'react';
import { CoffeeBean } from '../types';
import { X, Check, ShoppingBag, Coffee, Sparkles } from 'lucide-react';

interface BeanOrderModalProps {
  bean: CoffeeBean | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderSummary: string) => void;
}

export const BeanOrderModal: React.FC<BeanOrderModalProps> = ({
  bean,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [grindType, setGrindType] = useState('Whole Bean');
  const [quantity, setQuantity] = useState(1);
  const [collectionMethod, setCollectionMethod] = useState<'pickup' | 'shipping'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  if (!isOpen || !bean) return null;

  const totalPrice = (bean.price * quantity + (collectionMethod === 'shipping' ? 3.5 : 0)).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const refNumber = `STR-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedRef(refNumber);
      onSuccess(`Reserved ${quantity}x ${bean.name} (${refNumber})`);
    }, 500);
  };

  const handleClose = () => {
    setConfirmedRef(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedRef ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                Bean Bag Reserved!
              </h3>
              <p className="text-xs font-mono font-semibold text-amber-800 mt-1">
                Reference: {confirmedRef}
              </p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
              We've set aside your bag of <span className="font-semibold text-stone-900">{bean.name}</span> by {bean.roaster}. A confirmation has been sent to {customerEmail}.
            </p>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 text-left">
              <span className="font-bold text-stone-900 block mb-0.5">Pickup Location:</span>
              111 Brixton Hill, London SW2 1AA (Show reference code to barista at the counter).
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                RESERVE FRESH ROAST
              </span>
              <h3 className="text-xl font-bold text-stone-900 font-display mt-0.5">
                {bean.name}
              </h3>
              <div className="text-xs text-stone-500 flex items-center gap-2 mt-1">
                <span>{bean.roaster}</span>
                <span aria-hidden="true">·</span>
                <span>{bean.origin}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-semibold text-stone-800">£{bean.price.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Grind Selector */}
              <div>
                <label className="font-semibold text-stone-700 block mb-1.5">
                  Grind Requirement (Ground on Mahlkönig EK43)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {['Whole Bean', 'Espresso', 'V60 / Filter', 'AeroPress', 'French Press'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setGrindType(type)}
                      className={`py-2 px-2.5 rounded-lg border text-center transition-colors ${
                        grindType === type
                          ? 'bg-stone-900 text-white border-stone-900 font-bold'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between py-2 border-y border-stone-100">
                <span className="font-semibold text-stone-700">Quantity (250g bags)</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-md bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="w-7 h-7 rounded-md bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Collection Method */}
              <div>
                <label className="font-semibold text-stone-700 block mb-1.5">
                  Fulfillment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCollectionMethod('pickup')}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      collectionMethod === 'pickup'
                        ? 'border-stone-900 bg-stone-50 font-bold text-stone-900 ring-1 ring-stone-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className="font-bold">Café Collection</div>
                    <div className="text-[11px] text-stone-500">Free · 111 Brixton Hill</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollectionMethod('shipping')}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      collectionMethod === 'shipping'
                        ? 'border-stone-900 bg-stone-50 font-bold text-stone-900 ring-1 ring-stone-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className="font-bold">UK 1st Class Post</div>
                    <div className="text-[11px] text-stone-500">+£3.50 · 24-48h dispatch</div>
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-stone-600 font-medium block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="text-stone-600 font-medium block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">Total Due</span>
                  <span className="font-mono text-lg font-bold text-stone-900 tabular-nums">
                    £{totalPrice}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-2xs"
                >
                  {isSubmitting ? 'Reserving...' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
