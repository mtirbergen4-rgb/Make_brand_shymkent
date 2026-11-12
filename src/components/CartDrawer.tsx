import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, quantity: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 25000;
  const isFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="text-lg font-bold text-stone-900 font-display">
              Сіздің себетіңіз ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-100 text-xs text-amber-900 flex items-center justify-between">
          <span>
            {isFreeShipping ? (
              <strong className="text-emerald-700">✓ Шымкент бойынша тегін жеткізу қолжетімді!</strong>
            ) : (
              <>
                Тегін жеткізуге дейін тағы{' '}
                <strong>{formatPrice(freeShippingThreshold - subtotal)}</strong>
              </>
            )}
          </span>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-stone-900 font-display">
                  Себетіңіз әзірге бос
                </p>
                <p className="text-xs text-stone-500 max-w-xs">
                  Каталогтан өзіңізге ұнаған аяқ киімді таңдап, өлшемін белгілеп себетке қосыңыз.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Каталогты қарау
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="py-4 flex gap-4 items-start"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-sm font-semibold text-stone-900 truncate">
                    {item.product.name}
                  </h3>
                  <div className="text-xs text-stone-500">
                    Өлшемі: <strong className="text-stone-800">{item.selectedSize} EUR</strong>
                  </div>
                  <div className="text-sm font-bold text-stone-950 tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-200 rounded-md">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                        aria-label="Азайту"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-semibold text-stone-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                        aria-label="Көбейту"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                      aria-label="Өшіру"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout CTA */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4 bg-stone-50">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Тауарлар құны:</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Жеткізу (Шымкент):</span>
                <span className="font-semibold text-stone-900">
                  {isFreeShipping ? (
                    <span className="text-emerald-700">Тегін</span>
                  ) : (
                    '1 000 ₸ (немесе алып кету 0 ₸)'
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-bold text-stone-950">
                <span>Барлығы:</span>
                <span className="font-display tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-white bg-stone-950 hover:bg-stone-800 rounded-xl transition-all shadow-md active:scale-95"
            >
              <span>WhatsApp арқылы тапсырысты рәсімдеу</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Шымкент бойынша өлшеп көріп төлейсіз</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
