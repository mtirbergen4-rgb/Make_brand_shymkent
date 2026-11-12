import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Ruler, Check, Star, ShieldCheck, Truck, RotateCcw, Camera } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, openWhatsApp, generateSingleProductWhatsAppMessage } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number) => void;
  onOpenSizeGuide: () => void;
  onEditPhoto?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
  onEditPhoto,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 42);
  const [isCopied, setIsCopied] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleWhatsAppOrder = () => {
    const message = generateSingleProductWhatsAppMessage(product, selectedSize);
    openWhatsApp(message);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  const handleCopyDetails = () => {
    const message = generateSingleProductWhatsAppMessage(product, selectedSize);
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-950 bg-white/80 hover:bg-white rounded-full backdrop-blur-xs border border-stone-200 transition-colors"
          aria-label="Жабу"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image showcase */}
          <div className="relative bg-stone-100 flex items-center justify-center min-h-[320px] md:min-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center max-h-[550px]"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-md shadow-sm border border-stone-200">
                  {product.badge}
                </span>
              </div>
            )}

            {onEditPhoto && (
              <button
                type="button"
                onClick={() => onEditPhoto(product)}
                className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>Өз фотоңызды қою</span>
              </button>
            )}
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="uppercase font-semibold tracking-wider text-stone-700">
                  {product.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.gender}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-stone-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} пікір)</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-stone-900 font-display">
                {product.name}
              </h2>

              {/* Price & Legacy Promo Notice */}
              <div className="space-y-1 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-stone-950 font-display tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.legacyPromoPrice && (
                  <p className="text-xs text-amber-800 font-medium">
                    Бұрынғы жарнамалық акцияда: {formatPrice(product.legacyPromoPrice)} болған
                  </p>
                )}
                <div className="text-[11px] text-emerald-700 font-medium pt-1">
                  ✓ Шымкент қоймасында қолма-қол бар
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Өлшемін таңдаңыз (EUR):
                  </label>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium underline underline-offset-2"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Өлшем кестесі</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-sm font-bold rounded-lg border transition-all tabular-nums ${
                        selectedSize === size
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                          : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description & Specs */}
              <div className="space-y-3 pt-2">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Материалы:</span>
                    <span className="font-medium text-stone-800">{product.material}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Табаны:</span>
                    <span className="font-medium text-stone-800">{product.sole}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-stone-200/60">
                    <span className="text-stone-400 block text-[11px]">Ұлтарақ & Маусым:</span>
                    <span className="font-medium text-stone-800">{product.insole} · {product.season}</span>
                  </div>
                </div>

                {/* Key features */}
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp арқылы {selectedSize}-өлшемге тапсырыс беру</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold rounded-lg transition-all border ${
                    addedSuccess
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-stone-900 hover:bg-stone-800 text-white border-stone-900'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedSuccess ? 'Себетке қосылды!' : 'Себетке салу'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
                >
                  {isCopied ? 'Көшірілді!' : 'Тапсырыс мәтінін көшіру'}
                </button>
              </div>

              {/* Shymkent Guarantee Trust Box */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-600" />
                  Шымкент бойынша жедел жеткізу
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Өлшеп көріп төлеу
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
