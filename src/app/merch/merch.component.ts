import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartService } from '../core/cart.service';
import { MerchDataService } from '../core/merch-data.service';
import { MerchEmailService } from '../core/merch-email.service';
import { SiteContentService } from '../core/site-content.service';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { MerchCatalog, MerchProduct, ProductVariant } from './merch.models';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, TranslatePipe],
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss']
})
export class MerchComponent implements OnInit {
  private readonly data = inject(MerchDataService);
  private readonly email = inject(MerchEmailService);
  readonly siteContent = inject(SiteContentService);
  readonly cart = inject(CartService);
  private readonly formBuilder = inject(FormBuilder);

  readonly catalog$: Observable<MerchCatalog> = this.data.loadCatalog();
  readonly lines$ = this.cart.lines$;
  readonly subtotal$ = this.cart.subtotal$;
  readonly orderForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^\d{10}$/)]],
    supportAmount: [0, [Validators.min(0), Validators.max(10000)]],
    promoCode: ['', [Validators.maxLength(80)]],
    comments: ['', [Validators.maxLength(1000)]],
    agreement: [false, Validators.requiredTrue]
  });

  submitting = false;
  errorMessage = '';
  toastMessage = '';
  toastTimer?: ReturnType<typeof setTimeout>;
  successfulOrderNumber = '';

  ngOnInit(): void {
    this.orderForm.valueChanges.subscribe(() => this.errorMessage = '');
  }

  variantsFor(catalog: MerchCatalog, productId: string): ProductVariant[] {
    return catalog.variants.filter(variant => variant.productId === productId);
  }

  addToCart(product: MerchProduct, variant: ProductVariant): void {
    if (this.cart.add(product, variant)) this.showToast('merch.added');
    else this.showToast(this.cart.hasCurrencyConflict(variant) ? 'merch.currency_error' : 'merch.quantity_error');
  }

  updateQuantity(variantId: string, value: string): void {
    const quantity = Number(value);
    if (!this.cart.setQuantity(variantId, quantity)) this.showToast('merch.quantity_error');
  }

  removeFromCart(variantId: string): void {
    this.cart.remove(variantId);
    this.showToast('merch.removed');
  }

  sanitizePhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 10);
    if (input.value !== digitsOnly) input.value = digitsOnly;
    this.orderForm.controls.phone.setValue(digitsOnly);
  }

  submitOrder(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      this.errorMessage = 'merch.form_error';
      return;
    }

    const lines = this.cart.currentLines();
    if (!lines.length) {
      this.errorMessage = 'merch.empty_cart_error';
      return;
    }

    this.submitting = true;
    const orderNumber = `GAUL-${globalThis.crypto.randomUUID().toUpperCase()}`;
    const form = this.orderForm.getRawValue();
    const subtotal = this.cart.subtotal(lines);
    const supportAmount = Number(form.supportAmount) || 0;
    const total = subtotal + supportAmount;

    this.email.sendOrder(orderNumber, { ...form, supportAmount, comments: form.comments }, lines, subtotal, total).then(() => {
      this.successfulOrderNumber = orderNumber;
      this.cart.clear();
      this.orderForm.reset({ fullName: '', email: '', phone: '', supportAmount: 0, promoCode: '', comments: '', agreement: false });
      this.errorMessage = '';
    }).catch(() => {
      this.errorMessage = 'merch.email_error';
    }).finally(() => this.submitting = false);
  }

  formatPrice(price: number | null, currency = 'CAD'): string {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency }).format(price ?? 0);
  }

  orderTotal(subtotal: number | null): number {
    return (subtotal ?? 0) + (Number(this.orderForm.controls.supportAmount.value) || 0);
  }

  cartCurrency(): string {
    return this.cart.currency();
  }

  copyToClipboard(value: string, successMessage = 'merch.copied'): void {
    navigator.clipboard.writeText(value).then(
      () => this.showToast(successMessage),
      () => this.showToast('merch.copy_error')
    );
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastMessage = '', 3500);
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.orderForm.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }
}