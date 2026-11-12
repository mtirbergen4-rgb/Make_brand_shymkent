import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Tag, X } from 'lucide-react';

export const PromoNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      id="legacy-promo"
      className="bg-stone-900 text-stone-100 border-b border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              Make Brand дәстүрі
            </span>
            <span className="hidden sm:inline text-stone-600">·</span>
            <span className="text-stone-300">
              Бұрынғы жарнамалық ұсыныстар: <strong>17 990 ₸</strong> орнына <strong>50% жеңілдікпен 9 990 ₸</strong> болған хиттер және әрдайым <strong>PREMIUM CLASS</strong> сапасы!
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 shrink-0 self-end sm:self-center">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Шымкентте өлшеп көру бар
            </span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="p-1 hover:text-white transition-colors"
              aria-label="Жабу"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
