import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { TranslateService } from '../core/translate.service';

@Component({
  selector: 'app-partenaires',
  standalone: true,
  imports: [HeaderComponent, TranslatePipe],
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements AfterViewInit {
  // Nombre de partenaires
  partnersCount = 16;
  // Valeur affichée animée
  displayedCount = 0;

  constructor(private translate: TranslateService) {}

  ngAfterViewInit(): void {
    const grid = document.getElementById('partners-grid');
    if (grid) {
      this.partnersCount = grid.querySelectorAll('.card').length;
    }

    // Observer pour lancer l'animation seulement quand le compteur est visible
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
      // fallback : lancer immédiatement si pas support
      this.animateCounter();
    }
  }

  // animation simple du compteur (de 0 à partnersCount)
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