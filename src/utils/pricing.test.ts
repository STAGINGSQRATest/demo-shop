import { describe, it, expect } from 'vitest';
import { formatPrice, isFreeShipping } from './pricing';

describe('formatPrice', () => {
  it('formats a whole number', () => {
    expect(formatPrice(10)).toBe('$10.00');
  });

  it('formats a decimal', () => {
    expect(formatPrice(4.5)).toBe('$4.50');
  });
});

describe('isFreeShipping', () => {
  it('is true above the threshold', () => {
    expect(isFreeShipping(60)).toBe(true);
  });

  it('is false below the threshold', () => {
    expect(isFreeShipping(20)).toBe(false);
  });
});
