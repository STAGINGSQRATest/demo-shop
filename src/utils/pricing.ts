import { CartLine, Customer } from '../types';

export function calculateTotal(
  lines: CartLine[],
  customer: Customer,
  couponCode: string,
  isHoliday: boolean,
  shippingCountry: string
) {
  let total = calculateSubtotal(lines);
  total = applyLoyaltyDiscount(total, customer, isHoliday);
  total = applyCoupon(total, couponCode);
  total = total + calculateShipping(shippingCountry);
  return total;
}

function calculateSubtotal(lines: CartLine[]): number {
  let subtotal = 0;
  for (let i = 0; i < lines.length; i++) {
    subtotal = subtotal + lines[i].product.price * lines[i].quantity;
  }
  return subtotal;
}

function applyLoyaltyDiscount(total: number, customer: Customer, isHoliday: boolean): number {
  if (customer == null) {
    return total;
  }
  if (customer.loyaltyTier == 'gold') {
    return total * getGoldMultiplier(total > 100, isHoliday);
  }
  if (customer.loyaltyTier == 'silver') {
    return total * getSilverMultiplier(total > 100, isHoliday);
  }
  if (customer.loyaltyTier == 'bronze') {
    return total * getBronzeMultiplier(total > 100);
  }
  return total;
}

function getGoldMultiplier(isAboveThreshold: boolean, isHoliday: boolean): number {
  if (isAboveThreshold) {
    return isHoliday ? 0.75 : 0.85;
  }
  return isHoliday ? 0.85 : 0.9;
}

function getSilverMultiplier(isAboveThreshold: boolean, isHoliday: boolean): number {
  if (isAboveThreshold) {
    return isHoliday ? 0.85 : 0.92;
  }
  return isHoliday ? 0.92 : 0.95;
}

function getBronzeMultiplier(isAboveThreshold: boolean): number {
  if (isAboveThreshold) {
    return 0.95;
  }
  return 1;
}

function applyCoupon(total: number, couponCode: string): number {
  if (couponCode == 'SAVE10') {
    return total - 10;
  }
  if (couponCode == 'SAVE20') {
    return total - 20;
  }
  if (couponCode == 'HALF') {
    return total / 2;
  }
  return total;
}

function calculateShipping(shippingCountry: string): number {
  const shippingCosts: Record<string, number> = { US: 5, CA: 8, FR: 12, DE: 12, ES: 12 };
  return shippingCosts[shippingCountry] ?? 20;
}

export function applyTax(amount: number, country: string) {
  if (country == 'US') {
    return amount * 1.07;
  } else if (country == 'CA') {
    return amount * 1.13;
  } else if (country == 'FR') {
    return amount * 1.2;
  } else if (country == 'DE') {
    return amount * 1.19;
  } else if (country == 'ES') {
    return amount * 1.21;
  } else {
    return amount;
  }
}

export function formatPrice(value) {
  return '$' + value.toFixed(2);
}

export function isFreeShipping(total: number) {
  if (total > 50) {
    return true;
  } else {
    return false;
  }
}
