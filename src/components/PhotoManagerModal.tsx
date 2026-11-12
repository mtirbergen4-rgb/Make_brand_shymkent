import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Check, RotateCcw, Plus, Trash2, Camera, AlertCircle } from 'lucide-react';
import { Product, ShoeCategory } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProductPhoto: (productId: string, newImageUrl: string) => void;
  onUpdateHeroPhoto: (newImageUrl: string) => void;
  onUpdateShowroomPhoto: (newImageUrl: string) => void;
  onAddNewProduct: (newProduct: Product) => void;
  onResetAllPhotos: () => void;
  initialSelectedProductId?: string | null;
  currentHeroImage: string;
  currentShowroomImage: string;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProductPhoto,
  onUpdateHeroPhoto,
  onUpdateShowroomPhoto,
  onAddNewProduct,
  onResetAllPhotos,
  initialSelectedProductId,
  currentHeroImage,
  currentShowroomImage,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'add_new'>(
    initialSelectedProductId ? 'products' : 'products'
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialSelectedProductId || (products[0]?.id ?? '')
  );

  // Preview & feedback state
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [bannerTarget, setBannerTarget] = useState<'hero' | 'showroom'>('hero');

  // New product form
  const [newShoe, setNewShoe] = useState({
    name: '',
    category: 'sneakers' as ShoeCategory,
    categoryLabel: 'Кроссовкалар',
    gender: 'Ерлер' as 'Ерлер' | 'Әйелдер' | 'Унисекс',
    price: 18990,
    originalPrice: 24990,
    badge: 'PREMIUM CLASS',
    material: 'Табиғи былғары',
    sole: 'Амортизациялық резеңке табан',
    description: 'Жаңа сапалы аяқ киім үлгісі. Шымкент қоймасында қолжетімді.',
    sizesText: '39, 40, 41, 42, 43, 44',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Өтінеміз, сурет файлын таңдаңыз (JPG, PNG, WEBP)');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProductPhoto = () => {
    const finalUrl = previewUrl || urlInput.trim();
    if (!finalUrl) {
      alert('Алдымен компьютерден/телефоннан фото таңдаңыз немесе сілтемесін жазыңыз.');
      return;
    }
    if (selectedProductId) {
      onUpdateProductPhoto(selectedProductId, finalUrl);
      setSuccessMessage('Фото сәтті сақталды!');
      setPreviewUrl('');
      setUrlInput('');
      setTimeout(() => setSuccessMessage(''), 2500);
    }
  };

  const handleSaveBannerPhoto = () => {
    const finalUrl = previewUrl || urlInput.trim();
    if (!finalUrl) {
      alert('Алдымен компьютерден/телефоннан фото таңдаңыз немесе сілтемесін жазыңыз.');
      return;
    }
    if (bannerTarget === 'hero') {
      onUpdateHeroPhoto(finalUrl);
      setSuccessMessage('Басты бет банерінің фотосы сәтті жаңартылды!');
    } else {
      onUpdateShowroomPhoto(finalUrl);
      setSuccessMessage('Шоурум фотосы сәтті жаңартылды!');
    }
    setPreviewUrl('');
    setUrlInput('');
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const handleCreateNewShoe = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewUrl || urlInput.trim();
    if (!finalUrl) {
      alert('Жаңа аяқ киім үшін фото таңдаңыз немесе сілтемесін жазыңыз.');
      return;
    }
    if (!newShoe.name.trim()) {
      alert('Аяқ киім үлгісінің атауын жазыңыз.');
      return;
    }

    const sizesArr = newShoe.sizesText
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    const categoryLabels: Record<ShoeCategory, string> = {
      all: 'Барлығы',
      sneakers: 'Кроссовкалар',
      classic: 'Былғары & Классика',
      casual: 'Casual & Замша',
      sport: 'Спорттық'
    };

    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: newShoe.name,
      category: newShoe.category,
      categoryLabel: categoryLabels[newShoe.category] || 'Кроссовкалар',
      gender: newShoe.gender,
      price: Number(newShoe.price),
      originalPrice: newShoe.originalPrice ? Number(newShoe.originalPrice) : undefined,
      badge: newShoe.badge || 'PREMIUM CLASS',
      isPremium: true,
      image: finalUrl,
      sizes: sizesArr.length > 0 ? sizesArr : [40, 41, 42, 43, 44],
      material: newShoe.material,
      sole: newShoe.sole,
      insole: 'Анатомиялық жұмсақ ұлтарақ',
      season: 'Барлық маусым',
      description: newShoe.description,
      features: [
        'Табиғи сапалы материал',
        'Шымкент бойынша жедел жеткізу',
        'Өлшеп көруге 2 өлшем беріледі'
      ],
      inStock: true,
      rating: 5.0,
      reviewCount: 1,
    };

    onAddNewProduct(newProd);
    setSuccessMessage(`"${newShoe.name}" каталогыңызға сәтті қосылды!`);
    setPreviewUrl('');
    setUrlInput('');
    setNewShoe({
      name: '',
      category: 'sneakers',
      categoryLabel: 'Кроссовкалар',
      gender: 'Ерлер',
      price: 18990,
      originalPrice: 24990,
      badge: 'PREMIUM CLASS',
      material: 'Табиғи былғары',
      sole: 'Амортизациялық резеңке табан',
      description: 'Жаңа сапалы аяқ киім үлгісі. Шымкент қоймасында қолжетімді.',
      sizesText: '39, 40, 41, 42, 43, 44',
    });
    setActiveTab('products');
    setSelectedProductId(newProd.id);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold font-display">
                Өз фотоларыңызды қою & басқару
              </h2>
              <p className="text-xs text-stone-400">
                Дүкен иесі (Мейрамбек) үшін фото жүктеу құралы
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('products');
              setPreviewUrl('');
              setUrlInput('');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'products'
                ? 'bg-white text-stone-900 border-stone-950 shadow-xs'
                : 'text-stone-500 border-transparent hover:text-stone-900'
            }`}
          >
            Аяқ киім фотоларын ауыстыру
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('banners');
              setPreviewUrl('');
              setUrlInput('');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'banners'
                ? 'bg-white text-stone-900 border-stone-950 shadow-xs'
                : 'text-stone-500 border-transparent hover:text-stone-900'
            }`}
          >
            Басты банер & Шоурум фотосы
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('add_new');
              setPreviewUrl('');
              setUrlInput('');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'add_new'
                ? 'bg-white text-stone-900 border-stone-950 shadow-xs'
                : 'text-stone-500 border-transparent hover:text-stone-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-amber-600" />
            <span>Жаңа модель қосу</span>
          </button>
        </div>

        {/* Feedback message */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* TAB 1: PRODUCT PHOTOS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Product selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                  1. Фотосын өзгерткіңіз келетін модельді таңдаңыз:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setPreviewUrl('');
                        setUrlInput('');
                      }}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        selectedProductId === p.id
                          ? 'border-stone-950 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-md object-cover bg-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className={`text-[10px] tabular-nums ${selectedProductId === p.id ? 'text-amber-300' : 'text-stone-500'}`}>
                          {formatPrice(p.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload controls */}
              {currentProduct && (
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-800">
                        2. Жаңа фотоны жүктеңіз: {currentProduct.name}
                      </span>
                      <p className="text-[11px] text-stone-500">
                        Телефоннан, камерадан немесе компьютерден өз фотоңызды таңдаңыз
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    {/* Current vs New Preview */}
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-stone-300 bg-white shadow-xs flex items-center justify-center">
                      <img
                        src={previewUrl || currentProduct.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-stone-900/80 text-[10px] text-white font-medium">
                        {previewUrl ? 'Жаңа фотоның алдын ала көрінісі' : 'Қазіргі фото'}
                      </div>
                    </div>

                    {/* Choose file buttons */}
                    <div className="space-y-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Құрылғыдан фото таңдау (Галерея / Файлдар)</span>
                      </button>

                      <div className="text-center text-[11px] text-stone-400">немесе</div>

                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Интернеттегі фото сілтемесі (URL):
                        </label>
                        <input
                          type="url"
                          placeholder="https://... сурет сілтемесі"
                          value={urlInput}
                          onChange={(e) => {
                            setUrlInput(e.target.value);
                            setPreviewUrl(e.target.value);
                          }}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveProductPhoto}
                        disabled={!previewUrl && !urlInput}
                        className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Осы фотоны сақтау</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BANNERS (Hero & Showroom) */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                  Қай бөлімнің суретін ауыстырғыңыз келеді?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setBannerTarget('hero');
                      setPreviewUrl('');
                      setUrlInput('');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      bannerTarget === 'hero'
                        ? 'border-stone-950 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <p className="text-xs font-bold">Басты Hero банері</p>
                    <p className={`text-[11px] ${bannerTarget === 'hero' ? 'text-stone-300' : 'text-stone-500'}`}>
                      Сайттың ең үстіндегі негізгі промо-фото
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBannerTarget('showroom');
                      setPreviewUrl('');
                      setUrlInput('');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      bannerTarget === 'showroom'
                        ? 'border-stone-950 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <p className="text-xs font-bold">Шоурум суреті</p>
                    <p className={`text-[11px] ${bannerTarget === 'showroom' ? 'text-stone-300' : 'text-stone-500'}`}>
                      Шымкенттегі дүкен интерьері бөлімі
                    </p>
                  </button>
                </div>
              </div>

              {/* Banner upload preview */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <div className="aspect-16/9 rounded-xl overflow-hidden border border-stone-300 bg-white shadow-xs relative">
                  <img
                    src={
                      previewUrl ||
                      (bannerTarget === 'hero' ? currentHeroImage : currentShowroomImage)
                    }
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-stone-900/80 text-[10px] text-white font-medium">
                    {previewUrl ? 'Жаңа банердің алдын ала көрінісі' : 'Қазіргі сурет'}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Файлдан сурет таңдау</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveBannerPhoto}
                    disabled={!previewUrl && !urlInput}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Банерді сақтау</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW PRODUCT */}
          {activeTab === 'add_new' && (
            <form onSubmit={handleCreateNewShoe} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Дүкеніңізге жаңа аяқ киім түскен болса, оның суретін, атын және бағасын осы жерден бірден қосып қоя аласыз! Ол каталогта бірден пайда болып, WhatsApp арқылы тапсырыс қабылдайды.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Үлгі атауы *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Make Brand Leather Sport 2026"
                    value={newShoe.name}
                    onChange={(e) => setNewShoe({ ...newShoe, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Санаты
                  </label>
                  <select
                    value={newShoe.category}
                    onChange={(e) =>
                      setNewShoe({
                        ...newShoe,
                        category: e.target.value as ShoeCategory,
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    <option value="sneakers">Кроссовкалар</option>
                    <option value="classic">Былғары & Классика</option>
                    <option value="casual">Casual & Замша</option>
                    <option value="sport">Спорттық</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Бағасы (₸) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newShoe.price}
                    onChange={(e) => setNewShoe({ ...newShoe, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Бұрынғы/сызылған бағасы (₸)
                  </label>
                  <input
                    type="number"
                    value={newShoe.originalPrice}
                    onChange={(e) => setNewShoe({ ...newShoe, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Қолжетімді өлшемдер (үтірмен)
                  </label>
                  <input
                    type="text"
                    value={newShoe.sizesText}
                    onChange={(e) => setNewShoe({ ...newShoe, sizesText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ерекше белгі (Badge)
                  </label>
                  <input
                    type="text"
                    value={newShoe.badge}
                    onChange={(e) => setNewShoe({ ...newShoe, badge: e.target.value })}
                    placeholder="PREMIUM CLASS / ЖАҢА / ХИТ"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Photo upload for new shoe */}
              <div className="pt-2 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  Аяқ киімнің фотосын жүктеу:
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="w-24 h-24 rounded-lg border border-stone-300 bg-stone-100 overflow-hidden flex items-center justify-center shrink-0">
                    {previewUrl || urlInput ? (
                      <img
                        src={previewUrl || urlInput}
                        alt="New shoe preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-stone-400" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Телефоннан/компьютерден фото таңдау</span>
                    </button>
                    <input
                      type="url"
                      placeholder="немесе сурет сілтемесін жазыңыз..."
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-sm"
                >
                  Жаңа модельді каталогқа қосу
                </button>
              </div>
            </form>
          )}

          {/* Reset button at bottom */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Барлық өзгерістер браузер жадында сенімді сақталады.</span>
            <button
              type="button"
              onClick={() => {
                if (confirm('Барлық фотоларды бастапқы нұсқасына қайтарғыңыз келе ме?')) {
                  onResetAllPhotos();
                  setSuccessMessage('Фотолар бастапқы қалпына келтірілді!');
                  setTimeout(() => setSuccessMessage(''), 2000);
                }
              }}
              className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-700 underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Бастапқы фотоларды қайтару</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
