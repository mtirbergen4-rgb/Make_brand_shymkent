import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PromoNotice } from './components/PromoNotice';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { StorySection } from './components/StorySection';
import { ShowroomSection } from './components/ShowroomSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Check, X } from 'lucide-react';

const CART_STORAGE_KEY = 'make_brand_shymkent_cart_v1';
const PRODUCTS_STORAGE_KEY = 'make_brand_custom_products_v2';
const HERO_IMG_STORAGE_KEY = 'make_brand_custom_hero_v2';
const SHOWROOM_IMG_STORAGE_KEY = 'make_brand_custom_showroom_v2';

export default function App() {
  // Products state (persisted so custom photos stay saved)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Custom Banners
  const [heroImage, setHeroImage] = useState<string>(() => {
    try {
      return localStorage.getItem(HERO_IMG_STORAGE_KEY) || '/src/assets/images/hero_sneaker_store_banner_1794479478692.jpg';
    } catch {
      return '/src/assets/images/hero_sneaker_store_banner_1794479478692.jpg';
    }
  });

  const [showroomImage, setShowroomImage] = useState<string>(() => {
    try {
      return localStorage.getItem(SHOWROOM_IMG_STORAGE_KEY) || '/src/assets/images/store_makebrand_shymkent_showroom_1794479481094.jpg';
    } catch {
      return '/src/assets/images/store_makebrand_shymkent_showroom_1794479481094.jpg';
    }
  });

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [focusedProductIdForPhoto, setFocusedProductIdForPhoto] = useState<string | null>(null);

  // Quick toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const handleUpdateProductPhoto = (productId: string, newImageUrl: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, image: newImageUrl } : p))
    );
    if (activeProduct && activeProduct.id === productId) {
      setActiveProduct((prev) => (prev ? { ...prev, image: newImageUrl } : null));
    }
    setToastMessage('Аяқ киімнің фотосы жаңартылды!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateHeroPhoto = (newImageUrl: string) => {
    setHeroImage(newImageUrl);
    try {
      localStorage.setItem(HERO_IMG_STORAGE_KEY, newImageUrl);
    } catch (e) {
      console.error(e);
    }
    setToastMessage('Басты бет банерінің суреті жаңартылды!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateShowroomPhoto = (newImageUrl: string) => {
    setShowroomImage(newImageUrl);
    try {
      localStorage.setItem(SHOWROOM_IMG_STORAGE_KEY, newImageUrl);
    } catch (e) {
      console.error(e);
    }
    setToastMessage('Шоурум фотосы жаңартылды!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setToastMessage(`"${newProduct.name}" қосылды!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetAllPhotos = () => {
    try {
      localStorage.removeItem(PRODUCTS_STORAGE_KEY);
      localStorage.removeItem(HERO_IMG_STORAGE_KEY);
      localStorage.removeItem(SHOWROOM_IMG_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setProducts(PRODUCTS);
    setHeroImage('/src/assets/images/hero_sneaker_store_banner_1794479478692.jpg');
    setShowroomImage('/src/assets/images/store_makebrand_shymkent_showroom_1794479481094.jpg');
  };

  const handleAddToCart = (product: Product, size: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevItems, { product, selectedSize: size, quantity: 1 }];
      }
    });

    setToastMessage(`${product.name} (${size} өлшем) себетке қосылды!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpdateQuantity = (productId: string, size: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: number) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPhotoManagerFor = (productId?: string) => {
    setFocusedProductIdForPhoto(productId || null);
    setIsPhotoManagerOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Banner with Legacy Promo Context */}
      <PromoNotice />

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenPhotoManager={() => openPhotoManagerFor()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          heroImage={heroImage}
          onEditHeroPhoto={() => openPhotoManagerFor()}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onExploreCatalog={scrollToCatalog}
        />

        <CatalogSection
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setActiveProduct(p)}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onEditPhoto={(p) => openPhotoManagerFor(p.id)}
          onOpenPhotoManager={() => openPhotoManagerFor()}
        />

        <StorySection onExploreCatalog={scrollToCatalog} />

        <ShowroomSection
          showroomImage={showroomImage}
          onEditShowroomPhoto={() => openPhotoManagerFor()}
        />

        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setActiveProduct(null);
          setIsSizeGuideOpen(true);
        }}
        onEditPhoto={(p) => openPhotoManagerFor(p.id)}
      />

      {/* Size Guide & Measurement Calculator Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* WhatsApp Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setIsCheckoutOpen(false);
          handleClearCart();
          setToastMessage('Тапсырыс WhatsApp-қа сәтті жіберілді!');
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />

      {/* Photo Manager Modal for Store Owner */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        products={products}
        onUpdateProductPhoto={handleUpdateProductPhoto}
        onUpdateHeroPhoto={handleUpdateHeroPhoto}
        onUpdateShowroomPhoto={handleUpdateShowroomPhoto}
        onAddNewProduct={handleAddNewProduct}
        onResetAllPhotos={handleResetAllPhotos}
        initialSelectedProductId={focusedProductIdForPhoto}
        currentHeroImage={heroImage}
        currentShowroomImage={showroomImage}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-stone-900 text-white p-3.5 rounded-xl shadow-2xl border border-stone-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full">
              <Check className="w-4 h-4" />
            </span>
            <span className="font-medium">{toastMessage}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setToastMessage(null);
                setIsCartOpen(true);
              }}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-2"
            >
              Себетті ашу
            </button>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="p-1 text-stone-400 hover:text-white"
              aria-label="Жабу"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
