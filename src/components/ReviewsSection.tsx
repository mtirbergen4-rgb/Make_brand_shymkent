import React from 'react';
import { Star, ShieldCheck, MessageCircle } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { STORE_PHONE } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <span>Шымкент тұрғындарының пікірлері</span>
              <span aria-hidden="true">·</span>
              <span>100% Шынайы</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
              Клиенттеріміз не дейді?
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-stone-900 text-sm">4.9 / 5.0</span>
            <span className="text-stone-400">· 500+ қанағаттанған клиенттер</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{review.date}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 font-display">
                      {review.author}
                    </h4>
                    <p className="text-[11px] text-stone-500">{review.location}</p>
                  </div>
                  {review.verifiedPurchase && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" />
                      Сатып алынған
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-stone-400 mt-1 truncate">
                  Үлгі: {review.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Review Invitation */}
        <div className="mt-10 p-6 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold font-display">
              Make Brand-тен аяқ киім алдыңыз ба?
            </h3>
            <p className="text-xs text-stone-300">
              WhatsApp арқылы өз пікіріңіз бен суретіңізді жіберіп, келесі тапсырысқа жеңілдік алыңыз!
            </p>
          </div>
          <a
            href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Сәлеметсіз бе, Make Brand Shymkent! Аяқ киім туралы пікірімді қалдырғым келеді.')}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Пікір қалдыру</span>
          </a>
        </div>
      </div>
    </section>
  );
};
