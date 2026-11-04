import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartLine, MerchProduct, ProductVariant } from '../merch/merch.models';

const CART_STORAGE_KEY = 'gaul-merch-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly linesSubject = new BehaviorSubject<CartLine[]>(this.readCart());
  readonly lines$ = this.linesSubject.asObservable();
  readonly subtotal$ = this.lines$.pipe(map(lines => this.subtotal(lines)));

  add(product: MerchProduct, variant: ProductVariant): boolean {
    const lines = [...this.linesSubject.value];
    const existing = lines.find(line => line.variant.id === variant.id);
    const nextQuantity = (existing?.quantity ?? 0) + 1;
    if (!variant.available || !product.available) return false;

    if (existing) existing.quantity = nextQuantity;
    else lines.push({ product, variant, quantity: 1 });
    this.update(lines);
    return true;
  }

  setQuantity(variantId: string, quantity: number): boolean {
    const lines = [...this.linesSubject.value];
    const line = lines.find(item => item.variant.id === variantId);
    if (!line || !Number.isInteger(quantity) || quantity < 1) return false;
    line.quantity = quantity;
    this.update(lines);
    return true;
  }

  remove(variantId: string): void {
    this.update(this.linesSubject.value.filter(line => line.variant.id !== variantId));
  }

  clear(): void {
    this.update([]);
  }

  currentLines(): CartLine[] {
    return this.linesSubject.value;
  }

  subtotal(lines = this.linesSubject.value): number {
    return lines.reduce((total, line) => total + line.variant.price * line.quantity, 0);
  }

  private update(lines: CartLine[]): void {
    this.linesSubject.next(lines);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }

  private readCart(): CartLine[] {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) as CartLine[] : [];
    } catch {
      return [];
    }
  }
}