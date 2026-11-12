import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, ShieldCheck, MapPin, Truck, CreditCard } from 'lucide-react';
import { CartItem, CustomerOrderData } from '../types';
import { formatPrice, generateCartWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState<CustomerOrderData>({
    customerName: '',
    customerPhone: '+7 ',
    city: 'Шымкент',
    address: '',
    deliveryMethod: 'shymkent_express',
    paymentMethod: 'kaspi_qr',
    comment: '',
  });

  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      setErrorMsg('Өтінеміз, аты-жөніңізді жазыңыз.');
      return;
    }
    if (formData.customerPhone.length < 10) {
      setErrorMsg('Өтінеміз, дұрыс телефон нөмірін көрсетіңіз.');
      return;
    }

    const message = generateCartWhatsAppMessage(items, formData, totalAmount);
    openWhatsApp(message);
    onOrderSuccess();
  };

  const handleCopyMessage = () => {
    const message = generateCartWhatsAppMessage(items, formData, totalAmount);
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-stone-900 font-display">
              Тапсырысты WhatsApp арқылы рәсімдеу
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {errorMsg}
            </div>
          )}

          {/* Quick order summary */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
              <span>Таңдалған аяқ киімдер ({items.length} дана):</span>
              <span className="text-stone-950 font-bold text-sm tabular-nums">
                {formatPrice(totalAmount)}
              </span>
            </div>
            <div className="space-y-1 text-xs text-stone-600 max-h-24 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex justify-between"
                >
                  <span className="truncate pr-2">
                    {item.product.name} ({item.selectedSize} өлшем, {item.quantity}x)
                  </span>
                  <span className="tabular-nums font-medium shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Inputs */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Аты-жөніңіз *
              </label>
              <input
                type="text"
                required
                placeholder="Мысалы: Бауыржан Нұрланұлы"
                value={formData.customerName}
                onChange={(e) => {
                  setErrorMsg('');
                  setFormData({ ...formData, customerName: e.target.value });
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                WhatsApp телефоныңыз *
              </label>
              <input
                type="tel"
                required
                placeholder="+7 (705) 000-00-00"
                value={formData.customerPhone}
                onChange={(e) => {
                  setErrorMsg('');
                  setFormData({ ...formData, customerPhone: e.target.value });
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Қала
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Шымкент"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Мекенжай (көше, үй, пәтер)
                </label>
                <input
                  type="text"
                  placeholder="Тәуке хан даңғылы, 45, 12-пәтер"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700">
              Жеткізу тәсілі:
            </label>
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                <input
                  type="radio"
                  name="delivery"
                  checked={formData.deliveryMethod === 'shymkent_express'}
                  onChange={() =>
                    setFormData({ ...formData, deliveryMethod: 'shymkent_express' })
                  }
                  className="mt-0.5 accent-stone-900"
                />
                <div className="text-xs">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Шымкент бойынша жедел жеткізу (1-2 сағат)</span>
                  </div>
                  <p className="text-stone-500 mt-0.5">
                    Курьер қатар 2 өлшемді әкеледі. Өлшеп көріп, ұнағанын аласыз.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                <input
                  type="radio"
                  name="delivery"
                  checked={formData.deliveryMethod === 'shymkent_pickup'}
                  onChange={() =>
                    setFormData({ ...formData, deliveryMethod: 'shymkent_pickup' })
                  }
                  className="mt-0.5 accent-stone-900"
                />
                <div className="text-xs">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-700" />
                    <span>Шымкент шоурумынан өзім алып кетемін (0 ₸)</span>
                  </div>
                  <p className="text-stone-500 mt-0.5">
                    Бәйдібек би даңғылы, 128 (Mega Planet жанында, 10:00 - 21:00)
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                <input
                  type="radio"
                  name="delivery"
                  checked={formData.deliveryMethod === 'kazakhstan_post'}
                  onChange={() =>
                    setFormData({ ...formData, deliveryMethod: 'kazakhstan_post' })
                  }
                  className="mt-0.5 accent-stone-900"
                />
                <div className="text-xs">
                  <div className="font-semibold text-stone-900">
                    Қазақстанның басқа қалаларына жеткізу (СДЭК, 2-4 күн)
                  </div>
                  <p className="text-stone-500 mt-0.5">
                    Алматы, Астана, Атырау, Ақтөбе және т.б. қалаларға
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700">
              Төлем тәсілі:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <label
                className={`p-2.5 border rounded-lg cursor-pointer text-center transition-all ${
                  formData.paymentMethod === 'kaspi_qr'
                    ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'kaspi_qr'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'kaspi_qr' })}
                  className="sr-only"
                />
                <span>Kaspi QR</span>
              </label>

              <label
                className={`p-2.5 border rounded-lg cursor-pointer text-center transition-all ${
                  formData.paymentMethod === 'kaspi_red'
                    ? 'border-red-600 bg-red-600 text-white font-semibold'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'kaspi_red'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'kaspi_red' })}
                  className="sr-only"
                />
                <span>Kaspi Red (0-0-3)</span>
              </label>

              <label
                className={`p-2.5 border rounded-lg cursor-pointer text-center transition-all ${
                  formData.paymentMethod === 'cash_on_delivery'
                    ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'cash_on_delivery'}
                  onChange={() =>
                    setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })
                  }
                  className="sr-only"
                />
                <span>Қолма-қол</span>
              </label>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp-та тапсырысты жіберу</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Мәтін алмасу буферіне көшірілді!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Тапсырыс мәтінін көшіріп алу</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
