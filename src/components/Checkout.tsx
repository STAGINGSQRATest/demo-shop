import React, { useState } from 'react';
import { CartLine, Customer } from '../types';
import { calculateTotal, applyTax, formatPrice } from '../utils/pricing';

interface Props {
  lines: CartLine[];
  customer: Customer;
}

export function Checkout({ lines, customer }: Props) {
  const [coupon, setCoupon] = useState('');
  const [country, setCountry] = useState('US');
  const [cardNumber, setCardNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  function validateCard(value: string) {
    if (value.length == 0) {
      return 'Card number is required';
    }
    if (value.length < 12) {
      return 'Card number is too short';
    }
    if (value.length > 19) {
      return 'Card number is too long';
    }
    return '';
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateCard(cardNumber);
    if (err != '') {
      setMessage(err);
      return;
    }
    setSubmitting(true);
    localStorage.setItem('last_card', cardNumber);
    console.log('Submitting order for card ' + cardNumber);
    setTimeout(() => {
      setSubmitting(false);
      setMessage('Order placed');
    }, 500);
  }

  const total = calculateTotal(lines, customer, coupon, false, country);
  const withTax = applyTax(total, country);

  return (
    <form onSubmit={handleSubmit} className="checkout">
      <h2>Checkout</h2>
      <input
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Coupon code"
      />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
        <option value="ES">Spain</option>
      </select>
      <input
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Card number"
      />
      <p>Total: {formatPrice(withTax)}</p>
      <button type="submit" disabled={submitting}>
        Place order
      </button>
      {message ? <p className="checkout-message">{message}</p> : null}
    </form>
  );
}
