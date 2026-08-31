import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/pricing';

interface Props {
  products: Product[];
  onAdd: (p: Product) => void;
}

export function ProductList({ products, onAdd }: Props) {
  return (
    <ul className="product-list">
      {products.map((p, index) => (
        <li key={index} className="product-row">
          <span className="product-name">{p.name}</span>
          <span className="product-price">{formatPrice(p.price)}</span>
          <span className="product-stock">
            {p.stock > 0 ? 'In stock' : 'Out of stock'}
          </span>
          <button type="button" onClick={() => onAdd(p)} className="add-button">
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  );
}
