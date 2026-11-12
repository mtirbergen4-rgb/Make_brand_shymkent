import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Camera } from 'lucide-react';
import { STORE_PHONE, STORE_TIKTOK_URL } from '../data/products';
import { MakeBrandLogo } from './MakeBrandLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSizeGuide: () => void;
  onOpenPhotoManager?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSizeGuide,
  onOpenPhotoManager,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            {/* Zone 1: Brand Wordmark with Official Logo Icon */}
            <a
              href="#"
              className="flex items-center gap-2.5 text-stone-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
            >
              <MakeBrandLogo size="sm" variant="badge" />
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-black tracking-tight font-display text-stone-950">
                  MAKE_BRAND
                </span>
                <span className="text-[9px] font-bold text-stone-500 tracking-[0.25em]">
                  SHYMKENT
                </span>
              </div>
            </a>

            {/* Zone 2: 4–5 clean single-line text navigation links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
              <a
                href="#catalog"
                className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
              >
                Каталог
              </a>
              <a
                href="#legacy-promo"
                className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
              >
                Акциялар
              </a>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 text-left"
              >
                Өлшем кестесі
              </button>
              <a
                href="#showroom"
                className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
              >
                Шоурум & Жеткізу
              </a>
              <a
                href="#reviews"
                className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
              >
                Пікірлер
              </a>
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center gap-3 shrink-0">
              {onOpenPhotoManager && (
                <button
                  type="button"
                  onClick={onOpenPhotoManager}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-900 bg-amber-300 hover:bg-amber-400 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs"
                  title="Дүкен иесі (Мейрамбек) үшін фотоларды жүктеу"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Фото жүктеу</span>
                </button>
              )}

              <a
                href={STORE_TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap shrink-0"
                title="TikTok: @make_brand_shymkent"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.33 6.33 0 0 0 3.1 15.68 6.34 6.34 0 0 0 9.44 22a6.34 6.34 0 0 0 6.34-6.32V8.78a8.2 8.2 0 0 0 4.81 1.54v-3.63h-1z"/>
                </svg>
                <span>TikTok</span>
              </a>

              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе! Make Brand Shymkent аяқ киім дүкені бойынша сұрағым бар еді.')}`}
                target="_blank"
                rel="noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors whitespace-nowrap shrink-0"
                title="WhatsApp: +7 (747) 341-62-23"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp
              </a>

              <button
                type="button"
                onClick={onOpenCart}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
                aria-label="Себетті ашу"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Себет</span>
                {cartCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold text-stone-900 bg-amber-300 rounded-full tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-md hover:bg-stone-100"
                aria-label="Мәзірді ашу"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-2">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              Каталог
            </a>
            <a
              href="#legacy-promo"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              Акциялар & Тарих
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSizeGuide();
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              Өлшем кестесі
            </button>
            <a
              href="#showroom"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              Шоурум & Жеткізу
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-950"
            >
              Пікірлер
            </a>
            {onOpenPhotoManager && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPhotoManager();
                }}
                className="flex items-center gap-2 w-full py-2 text-sm font-semibold text-amber-700 hover:text-amber-900"
              >
                <Camera className="w-4 h-4 text-amber-600" />
                <span>Өз фотоларымды жүктеу / баптау</span>
              </button>
            )}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <a
                href={STORE_TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-stone-900 bg-stone-100 rounded-md"
              >
                <svg className="w-4 h-4 fill-current text-stone-900" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.33 6.33 0 0 0 3.1 15.68 6.34 6.34 0 0 0 9.44 22a6.34 6.34 0 0 0 6.34-6.32V8.78a8.2 8.2 0 0 0 4.81 1.54v-3.63h-1z"/>
                </svg>
                <span>TikTok: @make_brand_shymkent</span>
              </a>

              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе! Make Brand Shymkent аяқ киім дүкені бойынша кеңес алғым келеді.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +7 (747) 341-62-23</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
