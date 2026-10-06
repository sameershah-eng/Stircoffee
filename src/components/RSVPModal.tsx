import React, { useState } from 'react';
import { EventItem } from '../types';
import { X, Check, Calendar, Clock, Users } from 'lucide-react';

interface RSVPModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  event,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmed(true);
      onSuccess(`RSVP confirmed for ${event.title}!`);
    }, 450);
  };

  const handleClose = () => {
    setConfirmed(false);
    setName('');
    setEmail('');
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
        className="relative bg-white rounded-2xl overflow-hidden max-w-md w-full border border-stone-200 shadow-2xl p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">
              You're on the Guestlist!
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
              We've saved your spot ({guests} {guests === 1 ? 'person' : 'people'}) for{' '}
              <span className="font-semibold text-stone-900">{event.title}</span>. We've sent details to {email}.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
              <div className="font-bold text-stone-900">{event.date} · {event.time}</div>
              <div>111 Brixton Hill, London SW2 1AA</div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors"
            >
              Great, see you then
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700">
                COMMUNITY EVENT RSVP
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-display mt-0.5">
                {event.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-stone-500 mt-2">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {event.time}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-stone-600 font-medium block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="text-stone-600 font-medium block mb-1">
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50 text-stone-800"
                >
                  <option value={1}>1 person (Just me)</option>
                  <option value={2}>2 people</option>
                  <option value={3}>3 people</option>
                  <option value={4}>4 people</option>
                  <option value={5}>5+ people (Group)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-2xs"
                >
                  {isSubmitting ? 'Reserving...' : 'Confirm Free RSVP'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
