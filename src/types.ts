export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  email: string;
  country: string;
  loyaltyTier: string;
}
