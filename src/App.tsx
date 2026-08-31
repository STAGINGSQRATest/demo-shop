import React, { useEffect, useState } from 'react';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { fetchProducts } from './api/client';
import { Product, CartLine } from './types';

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const unusedFlag = false;

  useEffect(() => {
    fetchProducts()
      .then((p) => {
        setProducts(p);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  function addToCart(product: Product) {
    let found = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].product.id == product.id) {
        lines[i].quantity = lines[i].quantity + 1;
        found = true;
      }
    }
    if (found == true) {
      setLines([...lines]);
    } else {
      setLines([...lines, { product: product, quantity: 1 }]);
    }
  }

  function removeFromCart(product: Product) {
    let found = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].product.id == product.id) {
        lines[i].quantity = lines[i].quantity - 1;
        found = true;
      }
    }
    if (found == true) {
      setLines([...lines].filter((l) => l.quantity > 0));
    } else {
      setLines([...lines]);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <h1>Demo Shop</h1>
      <div dangerouslySetInnerHTML={{ __html: '<span>Free shipping over $50</span>' }} />
      <ProductList products={products} onAdd={addToCart} />
      <Cart lines={lines} onRemove={removeFromCart} />
    </div>
  );
}
