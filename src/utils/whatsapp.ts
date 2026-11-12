import { CartItem, Product, CustomerOrderData } from '../types';
import { STORE_PHONE } from '../data/products';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('kk-KZ').format(price) + ' ₸';
}

export function generateSingleProductWhatsAppMessage(
  product: Product,
  selectedSize: number,
  customer?: Partial<CustomerOrderData>
): string {
  let message = `Сәлеметсіз бе, Make Brand Shymkent! 👟\n`;
  message += `Сайттан мына аяқ киімді таңдадым, тапсырыс бергім келеді:\n\n`;
  message += `▫️ Үлгі: ${product.name}\n`;
  message += `▫️ Санаты: ${product.categoryLabel}\n`;
  message += `▫️ Өлшемі: ${selectedSize}\n`;
  message += `▫️ Бағасы: ${formatPrice(product.price)}\n`;
  if (product.badge) {
    message += `▫️ Ерекшелігі: ${product.badge}\n`;
  }
  
  if (customer && (customer.customerName || customer.address)) {
    message += `\n👤 Клиент: ${customer.customerName || 'Көрсетілмеген'}\n`;
    if (customer.customerPhone) {
      message += `📞 Телефон: ${customer.customerPhone}\n`;
    }
    if (customer.city || customer.address) {
      message += `📍 Мекенжай: ${customer.city || 'Шымкент'}, ${customer.address || ''}\n`;
    }
    if (customer.deliveryMethod) {
      const deliveryNames: Record<string, string> = {
        shymkent_express: 'Шымкент бойынша жедел жеткізу (1-2 сағат)',
        shymkent_pickup: 'Шымкент шоурумынан алып кету',
        kazakhstan_post: 'Қазақстан бойынша жеткізу (СДЭК / Қазпошта)'
      };
      message += `🚚 Жеткізу түрі: ${deliveryNames[customer.deliveryMethod] || customer.deliveryMethod}\n`;
    }
  }

  message += `\nОсы өлшем қоймада бар ма? Растап жіберсеңіз, рақмет!`;
  return message;
}

export function generateCartWhatsAppMessage(
  items: CartItem[],
  customer: CustomerOrderData,
  totalAmount: number
): string {
  let message = `Сәлеметсіз бе, Make Brand Shymkent! 👟\n`;
  message += `Сайттан себет арқылы мына тапсырысты рәсімдедім:\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name}\n`;
    message += `   📏 Өлшемі: ${item.selectedSize} | Саны: ${item.quantity} дана\n`;
    message += `   💰 Бағасы: ${formatPrice(item.product.price * item.quantity)}\n\n`;
  });

  message += `-------------------------\n`;
  message += `ЖАЛПЫ СОМАСЫ: ${formatPrice(totalAmount)}\n\n`;

  message += `👤 Клиент: ${customer.customerName}\n`;
  message += `📞 Байланыс телефоны: ${customer.customerPhone}\n`;
  message += `📍 Қала / Мекенжай: ${customer.city}, ${customer.address}\n`;

  const deliveryNames: Record<string, string> = {
    shymkent_express: 'Шымкент бойынша жедел жеткізу (1-2 сағат, өлшеп көруге болады)',
    shymkent_pickup: 'Шымкент шоурумынан өзім алып кетемін',
    kazakhstan_post: 'Қазақстан бойынша жеткізу (СДЭК)'
  };
  message += `🚚 Жеткізу: ${deliveryNames[customer.deliveryMethod] || customer.deliveryMethod}\n`;

  const paymentNames: Record<string, string> = {
    kaspi_qr: 'Kaspi QR / Kaspi Gold',
    kaspi_red: 'Kaspi Red бөліп төлеу',
    cash_on_delivery: 'Қолма-қол курьерге'
  };
  message += `💳 Төлем: ${paymentNames[customer.paymentMethod] || customer.paymentMethod}\n`;

  if (customer.comment) {
    message += `💬 Қосымша ескертпе: ${customer.comment}\n`;
  }

  message += `\nТапсырысымды қабылдап, растап жібересіз бе?`;
  return message;
}

export function openWhatsApp(message: string, phone: string = STORE_PHONE) {
  const cleanPhone = phone.replace(/\D/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
