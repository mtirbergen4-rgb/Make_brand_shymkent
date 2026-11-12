import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Tag, RotateCcw, Camera } from 'lucide-react';
import { Product, ShoeCategory } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: number) => void;
  onQuickView: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onEditPhoto?: (product: Product) => void;
  onOpenPhotoManager?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onOpenSizeGuide,
  onEditPhoto,
  onOpenPhotoManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ShoeCategory>('all');
  const [selectedSize, setSelectedSize] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [premiumOnly, setPremiumOnly] = useState(false);

  const categories: { id: ShoeCategory; label: string }[] = [
    { id: 'all', label: 'Барлығы' },
    { id: 'sneakers', label: 'Кроссовкалар' },
    { id: 'classic', label: 'Былғары & Классика' },
    { id: 'casual', label: 'Casual & Замша' },
    { id: 'sport', label: 'Спорттық' },
  ];

  const sizes = [39, 40, 41, 42, 43, 44, 45];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Size filter
        if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;
        // Premium filter
        if (premiumOnly && !p.isPremium) return false;
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchMat = p.material.toLowerCase().includes(q);
          const matchCat = p.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchMat && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedSize, premiumOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSearchQuery('');
    setPremiumOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-12 md:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <span>Make Brand Shymkent каталогы</span>
              <span aria-hidden="true">·</span>
              <span>2026 Модельдері</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
              Аяқ киім топтамасы
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Таңдаңыз, өлшемін белгілеңіз және WhatsApp арқылы тапсырыс беріңіз. Шымкент бойынша өлшеп көру үшін 2 өлшем жеткізіледі.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {onOpenPhotoManager && (
              <button
                type="button"
                onClick={onOpenPhotoManager}
                className="text-xs font-semibold text-stone-900 bg-amber-300 hover:bg-amber-400 border border-amber-400 px-3.5 py-2 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                title="Өз фотоларыңызды қою"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Өз фотоларымды жүктеу</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="text-xs font-semibold text-stone-800 bg-white border border-stone-200 hover:border-stone-400 px-3.5 py-2 rounded-lg transition-colors shadow-xs"
            >
              📏 Өлшем кестесі
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 mb-8 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Үлгі атауы, былғары, ақ кроссовка..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Тазалау
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 whitespace-nowrap hidden sm:inline">
                Сұрыптау:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Сұрыптау"
                className="py-2 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 font-medium"
              >
                <option value="featured">Ұсынылғандар</option>
                <option value="price-asc">Бағасы: төменнен жоғарыға</option>
                <option value="price-desc">Бағасы: жоғарыдан төменге</option>
                <option value="rating">Жоғары рейтинг бойынша</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (interactive button segmented control as per guidelines) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100/80 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Filter: PREMIUM CLASS Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPremiumOnly(!premiumOnly)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                  premiumOnly
                    ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Тек PREMIUM CLASS</span>
              </button>
            </div>
          </div>

          {/* Size Filter Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-500 font-medium mr-1">Өлшем бойынша сүзу:</span>
            <button
              type="button"
              onClick={() => setSelectedSize('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
                selectedSize === 'all'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Барлығы
            </button>
            {sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors tabular-nums ${
                  selectedSize === sz
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {sz}
              </button>
            ))}

            {(selectedCategory !== 'all' || selectedSize !== 'all' || premiumOnly || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 underline underline-offset-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Сүзгілерді тазарту</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid: 3-column desktop as per e-commerce guidelines */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900 font-display">
                Көрсетілген сүзгі бойынша модель табылмады
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Өлшемді немесе іздеу сөзін өзгертіп көріңіз, немесе барлық модельдерді көру үшін сүзгілерді тазартыңыз.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Барлық үлгілерді көрсету
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onOpenSizeGuide={onOpenSizeGuide}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
