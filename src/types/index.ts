export type ShoeCategory = 'all' | 'sneakers' | 'classic' | 'casual' | 'sport';

export interface Product {
  id: string;
  name: string;
  category: ShoeCategory;
  categoryLabel: string;
  gender: 'Ерлер' | 'Әйелдер' | 'Унисекс';
  price: number;
  originalPrice?: number;
  legacyPromoPrice?: number; // e.g. 9 990 ₸ (бұрынғы 17 990 ₸ 50% акция)
  badge?: string;
  isPremium: boolean;
  image: string;
  gallery?: string[];
  sizes: number[];
  material: string;
  sole: string;
  insole: string;
  season: 'Барлық маусым' | 'Көктем-жаз' | 'Күз-қыс';
  description: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  quantity: number;
}

export interface CustomerOrderData {
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  deliveryMethod: 'shymkent_express' | 'shymkent_pickup' | 'kazakhstan_post';
  paymentMethod: 'kaspi_qr' | 'kaspi_red' | 'cash_on_delivery';
  comment?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verifiedPurchase: boolean;
}
