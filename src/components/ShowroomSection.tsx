import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, ShieldCheck, CheckCircle2, Camera } from 'lucide-react';
import {
  STORE_PHONE,
  STORE_DISPLAY_PHONE,
  STORE_ADDRESS,
  STORE_WORKING_HOURS,
  STORE_TIKTOK_URL,
  STORE_TIKTOK_HANDLE,
} from '../data/products';

interface ShowroomSectionProps {
  showroomImage?: string;
  onEditShowroomPhoto?: () => void;
}

export const ShowroomSection: React.FC<ShowroomSectionProps> = ({
  showroomImage,
  onEditShowroomPhoto,
}) => {
  const currentImage =
    showroomImage || '/src/assets/images/store_makebrand_shymkent_showroom_1794479481094.jpg';

  return (
    <section id="showroom" className="py-16 md:py-24 bg-stone-100/70 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Showroom Image Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-300 group">
              <img
                src={currentImage}
                alt="Make Brand Shymkent Showroom"
                className="w-full h-auto aspect-16/10 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

              {onEditShowroomPhoto && (
                <button
                  type="button"
                  onClick={onEditShowroomPhoto}
                  className="absolute top-3 right-3 z-10 px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Шоурум суретін ауыстыру"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Фотоны ауыстыру</span>
                </button>
              )}

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 block">
                  Шымкенттегі ресми кеңістік
                </span>
                <p className="text-lg font-bold font-display">Make Brand Showroom</p>
                <p className="text-xs text-stone-300">Келіп, барлық модельдерді өз көзіңізбен көріп киіп көріңіз</p>
              </div>
            </div>
          </div>

          {/* Right: Info and Guarantees */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                <span>Шоурум & Жеткізу</span>
                <span aria-hidden="true">·</span>
                <span>Шымкент</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display [text-wrap:balance]">
                Шымкенттегі дүкенімізге келіңіз немесе үйіңізге алдырыңыз
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Make Brand Shymkent — тек онлайн ғана емес, қала орталығында орналасқан заманауи аяқ киім дүкені. Барлық аяқ киімдер қоймада дайын тұр.
              </p>
            </div>

            {/* Address & Hours Cards */}
            <div className="space-y-3">
              <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-stone-200">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block text-sm">
                    {STORE_ADDRESS}
                  </span>
                  <p className="text-stone-500 mt-0.5">
                    Ыңғайлы автотұрақ бар. 2GIS және Яндекс Карталарда "Make Brand Shymkent" деп іздеңіз.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-stone-200">
                <Clock className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block text-sm">
                    {STORE_WORKING_HOURS}
                  </span>
                  <p className="text-stone-500 mt-0.5">
                    Үзіліссіз және демалыссыз жұмыс істейміз.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-stone-200">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block text-sm">
                    {STORE_DISPLAY_PHONE}
                  </span>
                  <p className="text-stone-500 mt-0.5">
                    WhatsApp және қоңырауларға 24/7 жауап береміз.
                  </p>
                </div>
              </div>

              <a
                href={STORE_TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3.5 p-3.5 bg-stone-900 text-white rounded-xl border border-stone-800 hover:border-amber-400 transition-colors group"
              >
                <div className="p-1 rounded bg-stone-800 text-amber-300 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.33 6.33 0 0 0 3.1 15.68 6.34 6.34 0 0 0 9.44 22a6.34 6.34 0 0 0 6.34-6.32V8.78a8.2 8.2 0 0 0 4.81 1.54v-3.63h-1z"/>
                  </svg>
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block text-sm">
                    TikTok: {STORE_TIKTOK_HANDLE}
                  </span>
                  <p className="text-stone-400 mt-0.5">
                    Аяқ киімдердің шынайы видео шолулары мен клиенттердің реакциясы
                  </p>
                </div>
              </a>
            </div>

            {/* Service Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <div className="font-bold text-stone-900 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2 өлшемді жеткізу</span>
                </div>
                <p className="text-stone-500">
                  Өлшемнен қателеспес үшін курьер 2 өлшем әкеледі.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <div className="font-bold text-stone-900 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Kaspi Red & QR</span>
                </div>
                <p className="text-stone-500">
                  Үстемесіз 0-0-3 және 0-0-12 бөліп төлеу қолжетімді.
                </p>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе, Make Brand Shymkent! Дүкеннің орналасқан жерін жібере аласыз ба?')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {STORE_DISPLAY_PHONE}</span>
              </a>

              <a
                href={STORE_TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current text-stone-900" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.33 6.33 0 0 0 3.1 15.68 6.34 6.34 0 0 0 9.44 22a6.34 6.34 0 0 0 6.34-6.32V8.78a8.2 8.2 0 0 0 4.81 1.54v-3.63h-1z"/>
                </svg>
                <span>TikTok-ты көру</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
