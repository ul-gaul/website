import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface SiteContent {
  links: Record<string, string>;
  images: Record<string, string>;
  carousel: Array<{ file: string; title: string }>;
  showcaseModels: Array<{ id: string; label: string; description: string; url: string }>;
  footer: Record<string, string>;
  videoTitle: string;
  partnerLevels: Record<string, string>;
}

const emptyContent: SiteContent = {
  links: {},
  images: {},
  carousel: [],
  showcaseModels: [],
  footer: {},
  videoTitle: '',
  partnerLevels: {}
};

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);
  readonly content = signal<SiteContent>(emptyContent);

  constructor() {
    this.http.get('assets/site-content.jsonc', { responseType: 'text' }).subscribe({
      next: (source) => this.content.set(this.parseJsonc(source)),
      error: (error) => console.error('Erreur chargement du contenu du site:', error)
    });
  }

  private parseJsonc(source: string): SiteContent {
    let json = '';
    let inString = false;
    let escaped = false;
    let lineComment = false;
    let blockComment = false;

    for (let index = 0; index < source.length; index++) {
      const character = source[index];
      const nextCharacter = source[index + 1];

      if (lineComment) {
        if (character === '\n' || character === '\r') {
          lineComment = false;
          json += character;
        }
        continue;
      }

      if (blockComment) {
        if (character === '*' && nextCharacter === '/') {
          blockComment = false;
          index++;
        } else if (character === '\n' || character === '\r') {
          json += character;
        }
        continue;
      }

      if (inString) {
        json += character;
        if (escaped) {
          escaped = false;
        } else if (character === '\\') {
          escaped = true;
        } else if (character === '"') {
          inString = false;
        }
        continue;
      }

      if (character === '"') {
        inString = true;
        json += character;
      } else if (character === '/' && nextCharacter === '/') {
        lineComment = true;
        index++;
      } else if (character === '/' && nextCharacter === '*') {
        blockComment = true;
        index++;
      } else {
        json += character;
      }
    }

    return JSON.parse(json) as SiteContent;
  }

  resourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}