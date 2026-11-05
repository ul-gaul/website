import { Injectable, inject } from '@angular/core';
import emailjs from '@emailjs/browser';
import { CartLine } from '../merch/merch.models';
import { SiteContentService } from './site-content.service';
import { TranslateService } from './translate.service';

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  supportAmount: number;
  promoCode: string;
  comments: string;
}

@Injectable({ providedIn: 'root' })
export class MerchEmailService {
  private readonly siteContent = inject(SiteContentService);
  private readonly translate = inject(TranslateService);

  sendOrder(orderNumber: string, form: OrderFormData, lines: CartLine[], subtotal: number, total: number) {
    const items = lines.map(line => `${line.product.name} - ${line.variant.label} (${line.variant.size}) x ${line.quantity}`).join('\n');
    const content = this.siteContent.content();
    const config = content.emailjs;
    const currency = lines[0]?.variant.currency || 'CAD';
    return emailjs.send(config.serviceId, config.templateId, {
      order_number: orderNumber,
      customer_name: form.fullName,
      customer_email: form.email,
      customer_phone: form.phone || 'N/A',
      order_items: items,
      order_currency: currency,
      order_subtotal: this.formatCurrency(subtotal, currency),
      support_amount: this.formatCurrency(form.supportAmount, currency),
      promo_code: form.promoCode || 'N/A',
      order_total: this.formatCurrency(total, currency),
      comments: form.comments || this.translate.translate('merch.no_comments'),
      interac_email: config.interacEmail,
      admin_email: config.adminEmail,
      payment_instructions: `${this.translate.translate('merch.transfer_instructions')} ${this.translate.translate('merch.order_number')} ${orderNumber}.`,
      confirmation_instructions: this.translate.translate('merch.step_confirmation_text'),
      pickup_address: content.footer['address'] || '',
      pickup_hours: this.translate.translate('merch.pickup_hours'),
      pickup_instructions: this.translate.translate('merch.pickup_reminder')
    }, config.publicKey);
  }

  private formatCurrency(value: number, currency: string): string {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency }).format(value);
  }
}