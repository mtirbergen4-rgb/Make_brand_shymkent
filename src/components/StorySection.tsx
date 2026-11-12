import React from 'react';
import { Tag, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface StorySectionProps {
  onExploreCatalog: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onExploreCatalog }) => {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Make Brand Shymkent тарихы мен философиясы</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-display [text-wrap:balance]">
            Жарнамадағы хиттерден толыққанды заманауи интернет-дүкенге дейін
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Шымкент қаласында Make Brand аяқ киімдері жылдар бойы мыңдаған тұтынушының сеніміне ие болды. Біздің бұрынғы жарнамалық ұсыныстарымыз бен Premium Class стандарттарымыз қашанда өз мәнін сақтайды.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: 17 990 ₸ */}
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                Дәстүрлі санат
              </span>
              <p className="text-2xl font-extrabold text-stone-900 font-display tabular-nums">
                17 990 ₸
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Көптеген хит үлгілеріміздің классикалық бағалық базасы. Сапасы мен төзімділігі жоғары бағаланған стандарт.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500">
              ✓ Әділ баға мен төзімділік
            </div>
          </div>

          {/* Card 2: 50% Жеңілдік */}
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">
                Жарнамалық хит
              </span>
              <p className="text-2xl font-extrabold text-amber-600 font-display tabular-nums">
                -50% Жеңілдік
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Клиенттер жақсы білетін маусымдық тиімді акциялар. Әрқашан ашық әрі таза баға ұсынысы.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500">
              ✓ Тұтынушыға шынайы пайда
            </div>
          </div>

          {/* Card 3: 9 990 ₸ */}
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
                Акция бағасы
              </span>
              <p className="text-2xl font-extrabold text-emerald-700 font-display tabular-nums">
                9 990 ₸
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Бұрынғы жарнамаларда ерекше сұраныс тудырған қолжетімді акциялық бағалар мен ерекше танымал топтамалар.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500">
              ✓ Қолжетімді стиль
            </div>
          </div>

          {/* Card 4: PREMIUM CLASS */}
          <div className="p-6 bg-stone-900 text-white rounded-2xl border border-stone-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                Біздің стандарт
              </span>
              <p className="text-xl font-extrabold text-white font-display">
                PREMIUM CLASS
              </p>
              <p className="text-xs text-stone-300 leading-relaxed">
                Табиғи сапалы былғары, анатомиялық ұлтарақ және ұқыпты тігіс. Сападан ешқашан ымыраға келмейміз.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-amber-400">
              ✓ Шымкентте 100% кепілдік
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="text-center">
          <button
            type="button"
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95"
          >
            <span>Қазіргі қолжетімді аяқ киімдерді таңдау</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
