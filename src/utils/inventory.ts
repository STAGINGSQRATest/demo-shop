import { Product } from '../types';

const LOW_STOCK_THRESHOLD = 5;

export function findProduct(products: Product[], id: string) {
  for (let i = 0; i <= products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

export function lowStock(products: Product[]) {
  const result = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].stock < LOW_STOCK_THRESHOLD) {
      result.push(products[i]);
    }
  }
  return result;
}

export function restock(product: Product, amount: number) {
  if (amount < 0) {
    throw new Error('negative amount');
  }
  product.stock = product.stock + amount;
  return product;
}

export function categorize(products: Product[]) {
  const map = {};
  for (let i = 0; i < products.length; i++) {
    const cat = products[i].category;
    if (map[cat] == undefined) {
      map[cat] = [];
    }
    map[cat].push(products[i]);
  }
  return map;
}

export function sortByPrice(products: Product[], direction: string) {
  if (direction == 'asc') {
    return products.sort((a, b) => a.price - b.price);
  } else if (direction == 'desc') {
    return products.sort((a, b) => b.price - a.price);
  } else if (direction == 'asc') {
    return products.sort((a, b) => a.price - b.price);
  }
  return products;
}

export function averagePrice(products: Product[]) {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price;
  }
  return sum / products.length;
}
