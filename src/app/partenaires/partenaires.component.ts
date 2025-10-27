import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { TranslateService } from '../core/translate.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Partner = {
  level: string;
  name: string;
  logo: string;
  url?: string;
};

type Section = { key: string; title: string; partners: Partner[] };

@Component({
  selector: 'app-partenaires',
  standalone: true,
  imports: [HeaderComponent, TranslatePipe, HttpClientModule, CommonModule],
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit, AfterViewInit {
  partnersCount = 0;
  displayedCount = 0;

  sections: Section[] = [];

  constructor(private translate: TranslateService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPartnersCsv('assets/docs/parteners.csv', () => this.loadPartnersCsv('assets/docs/parteners.csv'));
  }

  private loadPartnersCsv(path: string, fallback?: () => void): void {
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (txt: string) => {
        console.log('[Partenaires] loaded CSV:', path);
        const lines = txt.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
        if (!lines.length) return;
        const sep = lines[0].includes(';') ? ';' : ',';
        const splitter = new RegExp(`${sep}(?=(?:[^"]*"[^"]*")*[^"]*$)`);
        const header = lines.shift()!.split(splitter).map(h => h.replace(/^"|"$/g, '').toLowerCase());

        const rows = lines.map(l => {
          const cols = l.split(splitter).map(c => c.replace(/^"|"$/g, ''));
          const obj: any = {};
          header.forEach((h, i) => obj[h] = (cols[i] ?? '').trim());
          return obj;
        });

        console.log('[Partenaires] rows parsed:', rows.length);

        const groups = new Map<string, Partner[]>();
        let count = 0;
        for (const r of rows) {
          const rawLogo = (r.logo || r.image || '').trim();
          const logoPath = rawLogo ? rawLogo.replace(/^\.\//, '') : '';

          const p: Partner = {
            level: (r.level || 'other').trim() || 'other',
            name: r.name || r.label || '',
            logo: logoPath || 'assets/img/logos-partenaires/placeholder.webp',
            url: (r.url || r.href || r.link || '').trim()
          };

          if (!groups.has(p.level)) groups.set(p.level, []);
          groups.get(p.level)!.push(p);
          count++;
        }

        console.log('[Partenaires] first section sample:', Array.from(groups.entries()).slice(0,2));

        this.sections = Array.from(groups.entries()).map(([k, v]) => ({
          key: k,
          title: this.levelToTitle(k),
          partners: v
        }));

        this.partnersCount = count;
      },
      error: (err) => {
        if (fallback) {
          console.warn('[Partenaires] failed to load', path, '— trying fallback');
          fallback();
        } else {
          console.error('Failed to load partners CSV', err);
        }
      }
    });
  }

  private levelToTitle(key: string): string {
    const k = key.toLowerCase();
    if (k.includes('intergal')) return 'Niveau intergalactique 🌌';
    if (k.includes('interstell')) return 'Niveau interstellaire 💫';
    if (k.includes('interplan')) return 'Niveau interplanétaire 🪐';
    if (k.includes('orbite') || k.includes('terrest')) return 'Orbite terreste 🌍';
    return key.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  ngAfterViewInit(): void {
    const el = document.getElementById('sponsor-count');
    if (el && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter();
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(el);
    } else {
      this.animateCounter();
    }
  }

  // animation simple du compteur
  private animateCounter(duration = 800) {
    const startTime = performance.now();
    const from = 0;
    const to = this.partnersCount;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      this.displayedCount = Math.floor(from + (to - from) * progress);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        this.displayedCount = to;
      }
    };
    requestAnimationFrame(tick);
  }

  // href
  get planHref(): string {
    return this.translate.currentLang === 'fr' ? './assets/docs/plan-partenariat-2025-fr.pdf' : './assets/docs/plan-partenariat-2025-en.pdf';
  }

  // label
  get planLabel(): string {
    const key = this.translate.currentLang === 'fr' ? 'partenaires.plan_fr' : 'partenaires.plan_en';
    return this.translate.translate(key) || (this.translate.currentLang === 'fr' ? 'Plan de partenariat (FR)' : 'Partnership plan (EN)');
  }
}