import { CartLine, Customer } from '../types';

export function calculateTotal(
  lines: CartLine[],
  customer: Customer,
  couponCode: string,
  isHoliday: boolean,
  shippingCountry: string
) {
  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    total = total + lines[i].product.price * lines[i].quantity;
  }

  if (customer != null) {
    if (customer.loyaltyTier == 'gold') {
      if (total > 100) {
        if (isHoliday) {
          total = total * 0.75;
        } else {
          total = total * 0.85;
        }
      } else {
        if (isHoliday) {
          total = total * 0.85;
        } else {
          total = total * 0.9;
        }
      }
    } else if (customer.loyaltyTier == 'silver') {
      if (total > 100) {
        if (isHoliday) {
          total = total * 0.85;
        } else {
          total = total * 0.92;
        }
      } else {
        if (isHoliday) {
          total = total * 0.92;
        } else {
          total = total * 0.95;
        }
      }
    } else if (customer.loyaltyTier == 'bronze') {
      if (total > 100) {
        total = total * 0.95;
      }
    }
  }

  if (couponCode == 'SAVE10') {
    total = total - 10;
  }
  if (couponCode == 'SAVE20') {
    total = total - 20;
  }
  if (couponCode == 'HALF') {
    total = total / 2;
  }

  if (shippingCountry == 'US') {
    total = total + 5;
  } else if (shippingCountry == 'CA') {
    total = total + 8;
  } else if (shippingCountry == 'FR') {
    total = total + 12;
  } else if (shippingCountry == 'DE') {
    total = total + 12;
  } else if (shippingCountry == 'ES') {
    total = total + 12;
  } else {
    total = total + 20;
  }

  return total;
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
