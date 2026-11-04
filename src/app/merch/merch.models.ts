export interface MerchProduct {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  available: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  label: string;
  size: string;
  price: number;
  currency: string;
  available: boolean;
}

export interface MerchCatalog {
  products: MerchProduct[];
  variants: ProductVariant[];
}

export interface CartLine {
  product: MerchProduct;
  variant: ProductVariant;
  quantity: number;
}