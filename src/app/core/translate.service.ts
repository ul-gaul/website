import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Import JSON
import frJson from '../../assets/i18n/fr.json';
import enJson from '../../assets/i18n/en.json';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private _lang$ = new BehaviorSubject<'fr' | 'en'>((localStorage.getItem('gaul-lang') as 'fr' | 'en') ?? 'fr');
  public lang$ = this._lang$.asObservable();

  private translations: { fr: any; en: any } = { fr: frJson as any, en: enJson as any };

  constructor() {
    document.documentElement.lang = this.currentLang;
  }

  setLang(l: 'fr' | 'en') {
    localStorage.setItem('gaul-lang', l);
    this._lang$.next(l);
    document.documentElement.lang = l;
  }

  get currentLang(): 'fr' | 'en' {
    return this._lang$.value;
  }

  translate(key: string): string {
    if (!key) return '';
    const tree = this.translations[this.currentLang] || {};
    const byPath = this.getByPath(tree, key);
    if (byPath !== null && byPath !== undefined) return byPath;
    const found = this.findKeyRecursive(tree, key);
    return found != null ? found : key;
  }

  private getByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc: any, k: string) => acc && acc[k] != null ? acc[k] : null, obj);
  }

  private findKeyRecursive(obj: any, key: string): any {
    if (!obj || typeof obj !== 'object') return null;
    if (Object.prototype.hasOwnProperty.call(obj, key)) return obj[key];
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (typeof v === 'object') {
        const found = this.findKeyRecursive(v, key);
        if (found != null) return found;
      }
    }
    return null;
  }
}
