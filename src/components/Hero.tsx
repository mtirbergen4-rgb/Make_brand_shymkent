import React from 'react';
import { ArrowRight, MessageCircle, Ruler, Truck, ShieldCheck, Award, Camera } from 'lucide-react';
import { STORE_PHONE } from '../data/products';
import { MakeBrandLogo } from './MakeBrandLogo';

interface HeroProps {
  onOpenSizeGuide: () => void;
  onExploreCatalog: () => void;
  heroImage?: string;
  onEditHeroPhoto?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSizeGuide,
  onExploreCatalog,
  heroImage,
  onEditHeroPhoto,
}) => {
  const currentImage = heroImage || '/src/assets/images/hero_sneaker_store_banner_1794479478692.jpg';

  return (
    <section className="relative bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3">
              <MakeBrandLogo size="md" variant="badge" />
              <div className="flex flex-col text-xs font-semibold text-amber-400 tracking-wider uppercase">
                <span>MAKE_BRAND SHYMKENT</span>
                <span className="text-[10px] text-stone-400 font-normal">2026 Ресми интернет-дүкені</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight [text-wrap:balance]">
              Шымкенттегі таңдаулы <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                PREMIUM CLASS
              </span>{' '}
              аяқ киімдері
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed">
              Жай ғана дүкен емес — толыққанды ыңғайлылық. Каталогтан үлгіні таңдаңыз, өлшеміңізді белгілеңіз және WhatsApp арқылы тікелей тапсырыс беріңіз.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md active:scale-95"
              >
                <span>Каталогты таңдау</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе, Make Brand Shymkent! Аяқ киім таңдау бойынша кеңес алғым келеді.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-100 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp-пен кеңесу</span>
              </a>

              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors"
              >
                <Ruler className="w-4 h-4" />
                <span>Өлшем қалай таңдалады?</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Шымкентте 1-2 сағатта</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Өлшеп көріп төлеу</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Premium сапа кепілдігі</span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl group">
              <img
                src={currentImage}
                alt="Make Brand Shymkent Premium Sneakers"
                className="w-full h-auto aspect-16/10 object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Photo edit button for hero */}
              {onEditHeroPhoto && (
                <button
                  type="button"
                  onClick={onEditHeroPhoto}
                  className="absolute top-3 right-3 z-10 px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-colors shadow-sm border border-stone-700"
                  title="Банердің суретін өзгерту"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Банерді ауыстыру</span>
                </button>
              )}

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-800 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white font-display">Make Brand Shymkent</p>
                  <p className="text-stone-400 text-[11px]">Бәйдібек би даңғылындағы ресми дүкен</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block">Шымкент бойынша</span>
                  <span className="font-semibold text-amber-400">2 өлшем жеткізу</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
