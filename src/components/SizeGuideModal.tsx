import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, Footprints, Info } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: number) => void;
}

const SIZE_CHART = [
  { eur: 38, cm: 24.0, us: 6.0, uk: 5.5 },
  { eur: 39, cm: 24.5, us: 6.5, uk: 6.0 },
  { eur: 40, cm: 25.0, us: 7.0, uk: 6.5 },
  { eur: 41, cm: 26.0, us: 8.0, uk: 7.5 },
  { eur: 42, cm: 26.5, us: 8.5, uk: 8.0 },
  { eur: 43, cm: 27.5, us: 9.5, uk: 9.0 },
  { eur: 44, cm: 28.0, us: 10.0, uk: 9.5 },
  { eur: 45, cm: 29.0, us: 11.0, uk: 10.5 },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  const [footCm, setFootCm] = useState<number>(26.5);

  if (!isOpen) return null;

  // Find nearest size
  const closestMatch = SIZE_CHART.reduce((prev, curr) => {
    return Math.abs(curr.cm - footCm) < Math.abs(prev.cm - footCm) ? curr : prev;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-stone-900 font-display">
              Аяқ киім өлшемін анықтау кестесі
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Interactive Calculator */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                Интерактивті калькулятор
              </span>
              <span className="text-xs text-stone-500">
                Табан ұзындығы бойынша
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="foot-slider" className="text-sm font-medium text-stone-700">
                  Табан ұзындығы: <span className="font-bold text-stone-950 tabular-nums">{footCm.toFixed(1)} см</span>
                </label>
                <span className="text-xs text-stone-500">24.0 — 29.0 см аралығы</span>
              </div>
              <input
                id="foot-slider"
                type="range"
                min="24"
                max="29"
                step="0.5"
                value={footCm}
                onChange={(e) => setFootCm(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
            </div>

            <div className="bg-white rounded-lg p-4 border border-amber-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500">Сізге сәйкес келетін өлшем:</p>
                <p className="text-2xl font-extrabold text-stone-900 font-display">
                  {closestMatch.eur} <span className="text-sm font-normal text-stone-500">(EUR)</span>
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  US: {closestMatch.us} · UK: {closestMatch.uk}
                </p>
              </div>

              {onSelectSize && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectSize(closestMatch.eur);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all"
                >
                  Осы өлшемді таңдау
                </button>
              )}
            </div>
          </div>

          {/* How to measure step-by-step */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Footprints className="w-4 h-4 text-stone-700" />
              Табанды қалай дұрыс өлшейді?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900">1-қадам:</span>
                <p>Ақ қағазды қатты еденге қойып, аяғыңызбен үстіне нық басыңыз.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900">2-қадам:</span>
                <p>Қаламмен өкше мен бас бармақтың шеткі нүктесін белгілеп алыңыз.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900">3-қадам:</span>
                <p>Сызғышпен өлшеп, алынған сантиметрді (см) төмендегі кестеден қараңыз.</p>
              </div>
            </div>
          </div>

          {/* Standard Size Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900">Стандартты өлшемдер кестесі</h3>
            <div className="overflow-x-auto border border-stone-200 rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-700 border-b border-stone-200 uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">EUR (Қазақстан)</th>
                    <th className="py-2.5 px-3">Табан ұзындығы (см)</th>
                    <th className="py-2.5 px-3">US</th>
                    <th className="py-2.5 px-3">UK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono tabular-nums">
                  {SIZE_CHART.map((row) => (
                    <tr
                      key={row.eur}
                      className={closestMatch.eur === row.eur ? 'bg-amber-100/50 font-semibold' : 'hover:bg-stone-50'}
                    >
                      <td className="py-2 px-3 font-sans font-bold text-stone-900">{row.eur}</td>
                      <td className="py-2 px-3">{row.cm.toFixed(1)} см</td>
                      <td className="py-2 px-3">{row.us.toFixed(1)}</td>
                      <td className="py-2 px-3">{row.uk.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shymkent Guarantee Note */}
          <div className="flex items-start gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Шымкент тұрғындары үшін арнайы қызмет:</strong> Өлшемге сенімді болмасаңыз, курьер сізге қатар екі өлшемді (мысалы, 41 және 42) жеткізіп береді. Өлшеп көріп, нақты шақ келгенін ғана сатып аласыз!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-md hover:bg-stone-100 transition-colors"
          >
            Түсінікті, жабу
          </button>
        </div>
      </div>
    </div>
  );
};
