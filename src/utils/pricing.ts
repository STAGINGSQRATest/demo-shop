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
  total = applyCouponDiscount(total, couponCode);
  total = total + getShippingCost(shippingCountry);
  return total;
}

function calculateSubtotal(lines: CartLine[]) {
  let subtotal = 0;
  for (let i = 0; i < lines.length; i++) {
    subtotal = subtotal + lines[i].product.price * lines[i].quantity;
  }
  return subtotal;
}

const loyaltyMultipliers: Record<string, Record<string, Record<string, number>>> = {
  gold: {
    high: { holiday: 0.75, regular: 0.85 },
    low: { holiday: 0.85, regular: 0.9 },
  },
  silver: {
    high: { holiday: 0.85, regular: 0.92 },
    low: { holiday: 0.92, regular: 0.95 },
  },
  bronze: {
    high: { holiday: 0.95, regular: 0.95 },
    low: { holiday: 1, regular: 1 },
  },
};

function getLoyaltyMultiplier(loyaltyTier: string, isHighValue: boolean, isHoliday: boolean): number {
  const tierData = loyaltyMultipliers[loyaltyTier];
  const valueKey = isHighValue ? 'high' : 'low';
  const holidayKey = isHoliday ? 'holiday' : 'regular';
  return tierData?.[valueKey]?.[holidayKey] ?? 1;
}

function applyLoyaltyDiscount(total: number, customer: Customer, isHoliday: boolean) {
  if (customer == null) {
    return total;
  }
  return total * getLoyaltyMultiplier(customer.loyaltyTier, total > 100, isHoliday);
}

function applyCouponDiscount(total: number, couponCode: string) {
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

const shippingRates: Record<string, number> = {
  US: 5,
  CA: 8,
  FR: 12,
  DE: 12,
  ES: 12,
};

function getShippingCost(shippingCountry: string) {
  return shippingRates[shippingCountry] ?? 20;
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
