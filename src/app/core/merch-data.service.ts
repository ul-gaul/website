import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';
import { MerchCatalog, MerchProduct, ProductVariant } from '../merch/merch.models';

@Injectable({ providedIn: 'root' })
export class MerchDataService {
  private readonly http = inject(HttpClient);
  private readonly catalog$ = forkJoin({
    products: this.http.get('assets/data/products.csv', { responseType: 'text' }),
    variants: this.http.get('assets/data/product-variants.csv', { responseType: 'text' })
  }).pipe(
    map(({ products, variants }): MerchCatalog => ({
      products: this.parseCsv<MerchProduct>(products, row => ({
        id: row['id'],
        name: row['name'],
        type: row['type'],
        description: row['description'],
        image: row['image'],
        available: this.toBoolean(row['available'])
      })),
      variants: this.parseCsv<ProductVariant>(variants, row => ({
        id: row['id'],
        productId: row['product_id'],
        label: row['label'],
        size: row['size'],
        price: Number(row['price']),
        currency: row['currency'] || 'CAD',
        available: this.toBoolean(row['available'])
      }))
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  loadCatalog(): Observable<MerchCatalog> {
    return this.catalog$;
  }

  private parseCsv<T>(text: string, factory: (row: Record<string, string>) => T): T[] {
    const rows = text.split(/\r?\n/).filter(line => line.trim().length > 0).map(line => this.splitCsvLine(line));
    if (rows.length < 2) return [];

    const headers = rows[0].map(header => header.trim());
    return rows.slice(1).map(columns => {
      const row = headers.reduce<Record<string, string>>((result, header, index) => {
        result[header] = (columns[index] ?? '').trim();
        return result;
      }, {});
      return factory(row);
    });
  }

  private splitCsvLine(line: string): string[] {
    const values: string[] = [];
    let value = '';
    let quoted = false;
    for (const character of line) {
      if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        values.push(value.replace(/^"|"$/g, '').replace(/""/g, '"'));
        value = '';
      } else {
        value += character;
      }
    }
    values.push(value.replace(/^"|"$/g, '').replace(/""/g, '"'));
    return values;
  }

  private toBoolean(value: string): boolean {
    return ['true', '1', 'yes', 'oui'].includes(value.toLowerCase());
  }
}