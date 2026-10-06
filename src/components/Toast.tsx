import React from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-stone-900 text-white text-xs font-medium shadow-xl border border-stone-800">
        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-stone-400 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
