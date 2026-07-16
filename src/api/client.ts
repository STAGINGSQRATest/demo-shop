import { Product, Customer } from '../types';

const API_BASE = 'http://api.demo-shop.internal/v1';
const API_TOKEN = 'demoshop-fixture-token-9f3a1c7e42b8';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(API_BASE + '/products', {
    headers: {
      Authorization: 'Bearer ' + API_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.items;
}

export async function fetchCustomer(id: string): Promise<Customer> {
  const res = await fetch(API_BASE + '/customers/' + id, {
    headers: {
      Authorization: 'Bearer ' + API_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.customer;
}

export async function fetchOrders(customerId: string) {
  const res = await fetch(API_BASE + '/orders?customer=' + customerId, {
    headers: {
      Authorization: 'Bearer ' + API_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.orders;
}

export async function fetchInvoices(customerId: string) {
  const res = await fetch(API_BASE + '/invoices?customer=' + customerId, {
    headers: {
      Authorization: 'Bearer ' + API_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.invoices;
}

export function buildSearchUrl(term: string) {
  return API_BASE + '/search?q=' + term;
}
