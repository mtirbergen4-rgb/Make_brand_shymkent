import { Product } from '../types';

export const STORE_PHONE = '77473416223'; // 87473416223
export const STORE_DISPLAY_PHONE = '+7 (747) 341-62-23';
export const STORE_TIKTOK_URL = 'https://www.tiktok.com/@make_brand_shymkent?_r=1&_t=ZS-9BLEHnZ7gov';
export const STORE_TIKTOK_HANDLE = '@make_brand_shymkent';
export const STORE_ADDRESS = 'Шымкент қ., Бәйдібек би даңғылы, 128 (Mega Planet жанында)';
export const STORE_WORKING_HOURS = 'Күн сайын: 10:00 – 21:00 (демалыссыз)';

export const PRODUCTS: Product[] = [
  {
    id: 'mb-01',
    name: 'Make Brand Court Classic White',
    category: 'classic',
    categoryLabel: 'Былғары & Классика',
    gender: 'Ерлер',
    price: 18990,
    originalPrice: 24990,
    legacyPromoPrice: 9990,
    badge: 'PREMIUM CLASS',
    isPremium: true,
    image: '/src/assets/images/shoe_premium_white_sneaker_1794479479918.jpg',
    sizes: [39, 40, 41, 42, 43, 44],
    material: '100% табиғи бұзау терісі (Calfskin leather)',
    sole: 'Вулканизацияланған резеңке, сырғанамайды',
    insole: 'Анатомиялық ортопедиялық жұмсақ ұлтарақ',
    season: 'Барлық маусым',
    description: 'Минималистік стильдегі премиум ақ кроссовка. Табиғи жұмсақ былғарыдан тігілген, алтын реңкті эксклюзивті фурнитурамен көмкерілген. Күнделікті джинсымен де, классикалық шалбармен де мінсіз үйлеседі.',
    features: [
      'Премиум санаттағы табиғи былғары',
      'Аяқты шаршатпайтын анатомиялық табан',
      'Екі рет күшейтілген тігіс',
      'Шымкентте өлшеп көруге 2 өлшем жеткізіледі'
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 38
  },
  {
    id: 'mb-02',
    name: 'Make Brand Aero-Flow Speed Runner',
    category: 'sport',
    categoryLabel: 'Спорттық & Streetwear',
    gender: 'Ерлер',
    price: 17990,
    originalPrice: 22990,
    legacyPromoPrice: 9990,
    badge: 'ХИТ 2026',
    isPremium: true,
    image: '/src/assets/images/shoe_streetwear_runner_black_1794479480123.jpg',
    sizes: [40, 41, 42, 43, 44, 45],
    material: 'Тыныс алатын аэро-тор және полимерлі қаңқа',
    sole: 'Responsive Cushioning амортизациялық ауа капсуласы',
    insole: 'Антибактериалды сүзбелі ұлтарақ',
    season: 'Көктем-жаз',
    description: 'Жоғары технологиялы қара-неон түсті спорттық кроссовка. Табанындағы ауа жастықшасы әрбір қадамды жеңілдетіп, буындарға түсетін салмақты азайтады. Жүгіруге, фитнеске және белсенді қалалық өмірге арналған.',
    features: [
      'Аэродинамикалық дизайн және торлы желдету',
      'Responsive Cushion соққы жұмсарту жүйесі',
      'Аса жеңіл салмақ (бар болғаны 290 грамм)',
      'Түнгі уақытта жарық шағылыстыратын сызықтар'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'mb-03',
    name: 'Make Brand Suede Explorer Desert',
    category: 'casual',
    categoryLabel: 'Casual & Замша',
    gender: 'Ерлер',
    price: 21990,
    originalPrice: 28990,
    legacyPromoPrice: 17990,
    badge: 'PREMIUM CLASS',
    isPremium: true,
    image: '/src/assets/images/shoe_casual_suede_olive_1794479481139.jpg',
    sizes: [39, 40, 41, 42, 43, 44],
    material: 'Италиялық сапалы табиғи күдері (замша)',
    sole: 'Қалың тракторлы табиғи каучук (Gum sole)',
    insole: 'Былғары қапталған эко-гель ұлтарақ',
    season: 'Күз-қыс',
    description: 'Зәйтүн жасыл (Olive) түсті қолдан өңделген замша бәтіңке. Мықты Goodyear-стиліндегі айналма тігіс пен протекторлы каучук табан суық пен тайғақтан сенімді қорғайды.',
    features: [
      'Қолдан тігілген табиғи замша',
      'Су мен шаң өткізбейтін зауыттық қорғаныс',
      'Ыңғайлы металл ілмектер мен мықты баулар',
      'Шымкент бойынша жедел жеткізу'
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 29
  },
  {
    id: 'mb-04',
    name: 'Make Brand Retro Wave 90s Edition',
    category: 'sneakers',
    categoryLabel: 'Кроссовкалар',
    gender: 'Унисекс',
    price: 15990,
    originalPrice: 19990,
    legacyPromoPrice: 9990,
    badge: 'АКЦИЯ ҰСЫНЫСЫ',
    isPremium: false,
    image: '/src/assets/images/hero_sneaker_store_banner_1794479478692.jpg',
    sizes: [38, 39, 40, 41, 42, 43],
    material: 'Эко-былғары және замша үйлесімі',
    sole: 'Екі деңгейлі EVA көбік + резеңке табан',
    insole: 'Comfort Foam жастықшасы',
    season: 'Барлық маусым',
    description: '90-жылдардың винтаждық сәніндегі заманауи қайта жаңғыру. Көпқабатты текстура, бейтарап сұр-ақ гамма және керемет төзімділік. Жастар арасындағы сұранысқа ие топ-модель.',
    features: [
      'Ретро қалалық дизайн',
      'Төзімді көпқабатты табан',
      'Күнделікті 10+ сағат жүруге ыңғайлы',
      'Сәнді комби түстер'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 54
  },
  {
    id: 'mb-05',
    name: 'Make Brand Urban Stealth All-Black',
    category: 'sneakers',
    categoryLabel: 'Кроссовкалар',
    gender: 'Ерлер',
    price: 16990,
    originalPrice: 21990,
    legacyPromoPrice: 9990,
    badge: 'ТОП ТАҢДАУ',
    isPremium: true,
    image: '/src/assets/images/shoe_streetwear_runner_black_1794479480123.jpg',
    sizes: [40, 41, 42, 43, 44],
    material: 'Матовый гидрофобты былғары + баллистикалық нейлон',
    sole: 'Монолитті күшейтілген қара табан',
    insole: 'Тері тыныс алатын OrthoLite ұлтарағы',
    season: 'Барлық маусым',
    description: 'Толық қара монохром түстегі әмбебап қалалық аяқ киім. Шаң мен ылғалды байқатпайды, күтімді көп қажет етпейді. Жұмысқа, көлік жүргізуге және кешкі серуенге өте ыңғайлы.',
    features: [
      'Толық қара монохром дизайн',
      'Шаң-тозаңға төзімді матовый текстура',
      'Кез келген киім үлгісімен үйлеседі',
      'Қоймада Шымкентте дайын тұр'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'mb-06',
    name: 'Make Brand Luxury Low-Top Caramel',
    category: 'classic',
    categoryLabel: 'Былғары & Классика',
    gender: 'Ерлер',
    price: 22990,
    originalPrice: 29990,
    legacyPromoPrice: 17990,
    badge: 'PREMIUM CLASS',
    isPremium: true,
    image: '/src/assets/images/shoe_casual_suede_olive_1794479481139.jpg',
    sizes: [40, 41, 42, 43, 44],
    material: 'Премиум деңгейлі табиғи тері және тері астары',
    sole: 'Италиялық каучук табан',
    insole: '100% былғарымен қапталған ортопедиялық төсем',
    season: 'Барлық маусым',
    description: 'Бай әрі талғампаз стильді қалайтындар үшін арнайы жасалған модель. Дүкеніміздегі PREMIUM CLASS топтамасының ең көп сұранысқа ие таңдаулы үлгісі.',
    features: [
      'Премиум класты ішкі және сыртқы былғары',
      'Иіс шығармайтын табиғи астар',
      'Нұр-Сұлтан, Алматы, Шымкент бойынша жылдам жеткізу',
      'Арнайы фирмалық қораппен келеді'
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 23
  }
];
