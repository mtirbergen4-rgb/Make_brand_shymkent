import React from 'react';
import { MessageCircle, MapPin, Phone, Clock, Instagram } from 'lucide-react';
import {
  STORE_PHONE,
  STORE_DISPLAY_PHONE,
  STORE_ADDRESS,
  STORE_WORKING_HOURS,
  STORE_TIKTOK_URL,
  STORE_TIKTOK_HANDLE,
} from '../data/products';
import { MakeBrandLogo } from './MakeBrandLogo';

interface FooterProps {
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MakeBrandLogo size="md" variant="badge" />
              <div>
                <h3 className="text-lg font-black tracking-tight text-white font-display">
                  MAKE_BRAND
                </h3>
                <span className="text-[10px] font-bold text-stone-400 tracking-[0.25em]">
                  SHYMKENT
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Шымкент қаласындағы Premium Class сапасындағы аяқ киімдер мен кроссовкалар дүкені. Ыңғайлылық, стиль және сенімділік.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={`https://wa.me/${STORE_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-stone-900 hover:bg-emerald-600 text-stone-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs"
                aria-label="WhatsApp"
                title="WhatsApp: +7 (747) 341-62-23"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-semibold text-stone-300">WhatsApp</span>
              </a>

              <a
                href={STORE_TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs border border-stone-800"
                aria-label="TikTok"
                title="TikTok: @make_brand_shymkent"
              >
                <svg className="w-4 h-4 fill-current text-amber-300" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.33 6.33 0 0 0 3.1 15.68 6.34 6.34 0 0 0 9.44 22a6.34 6.34 0 0 0 6.34-6.32V8.78a8.2 8.2 0 0 0 4.81 1.54v-3.63h-1z"/>
                </svg>
                <span className="text-[11px] font-semibold text-stone-200">TikTok</span>
              </a>
            </div>
            <a
              href={STORE_TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-[11px] text-stone-400 hover:text-amber-300 transition-colors"
            >
              TikTok видео шолулар: <span className="font-semibold text-stone-300 underline underline-offset-2">{STORE_TIKTOK_HANDLE}</span>
            </a>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Бөлімдер
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Барлық каталог
                </a>
              </li>
              <li>
                <a href="#legacy-promo" className="hover:text-white transition-colors">
                  Бұрынғы жарнамалар & Акциялар
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors text-left"
                >
                  Өлшем қалай анықталады?
                </button>
              </li>
              <li>
                <a href="#showroom" className="hover:text-white transition-colors">
                  Шоурум мекенжайы
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Клиенттердің пікірлері
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Төлем және Кепілдік
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>• Kaspi QR & Kaspi Gold</li>
              <li>• Kaspi Red (бөліп төлеу 0-0-3)</li>
              <li>• Шымкентте өлшеп көріп төлеу</li>
              <li>• 14 күн ішінде өлшем ауыстыру</li>
              <li>• СДЭК арқылы ҚР бойынша жеткізу</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-xs text-stone-400">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Байланыс
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{STORE_ADDRESS}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{STORE_DISPLAY_PHONE}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{STORE_WORKING_HOURS}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Make Brand Shymkent. Барлық құқықтар қорғалған.</p>
          <p className="text-stone-400">
            Мейрамбек үшін арнайы дайындалған онлайн дүкен жобасы
          </p>
        </div>
      </div>
    </footer>
  );
};
