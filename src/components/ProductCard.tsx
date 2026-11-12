import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Star, Check, Camera } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, openWhatsApp, generateSingleProductWhatsAppMessage } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: number) => void;
  onQuickView: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onEditPhoto?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onOpenSizeGuide,
  onEditPhoto,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 42);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = generateSingleProductWhatsAppMessage(product, selectedSize);
    openWhatsApp(msg);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Top subtle badge if exists */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs border border-stone-200">
            {product.badge}
          </span>
        </div>
      )}

      {/* Photo edit button for owner */}
      {onEditPhoto && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEditPhoto(product);
          }}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-xs border border-stone-200 transition-colors"
          title="Осы аяқ киімнің фотосын ауыстыру"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Product Image Frame (65-70% visual focus) */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/5 transition-colors" />
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Metadata row: unboxed, clean typography with separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px] text-stone-600">
              {product.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.gender}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-stone-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold tabular-nums">{product.rating}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-stone-900 font-display line-clamp-1 group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>

          {/* Material & Feature quiet line */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
            {product.material}
          </p>
        </div>

        {/* Pricing Row */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-stone-950 font-display tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.legacyPromoPrice && (
                <p className="text-[11px] text-amber-700 font-medium">
                  Бұрынғы акция: {formatPrice(product.legacyPromoPrice)}
                </p>
              )}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">
              Қоймада бар
            </span>
          </div>
        </div>

        {/* Size Selection bar */}
        <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span className="font-medium text-[11px]">Өлшемді таңдаңыз:</span>
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="text-[11px] text-stone-500 hover:text-stone-900 underline underline-offset-2"
            >
              Кесте
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-xs font-semibold rounded border transition-colors tabular-nums ${
                  selectedSize === size
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: WhatsApp direct + Cart */}
        <div className="pt-2 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
            title="WhatsApp арқылы осы өлшемге тікелей тапсырыс беру"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">WhatsApp тапсырыс</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Қосылды!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span>Себетке</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
