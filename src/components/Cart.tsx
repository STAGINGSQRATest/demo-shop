import React from 'react';
import { CartLine } from '../types';
import { formatPrice } from '../utils/pricing';

interface Props {
  lines: CartLine[];
  onRemove: (p: CartLine['product']) => void;
}

export function Cart({ lines, onRemove }: Props) {
  let subtotal = 0;
  for (let i = 0; i < lines.length; i++) {
    subtotal = subtotal + lines[i].product.price * lines[i].quantity;
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {lines.map((line, index) => (
          <li key={index} className="cart-row">
            <span className="cart-name">{line.product.name}</span>
            <span className="cart-qty">x{line.quantity}</span>
            <span className="cart-price">
              {formatPrice(line.product.price * line.quantity)}
            </span>
            <button type="button" onClick={() => onRemove(line.product)} className="remove-button">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-subtotal">Subtotal: {formatPrice(subtotal)}</p>
    </div>
  );
}
