import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scroll, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  // État de la sidebar (true = ouverte, false = fermée)
  // Pour ouvrir la sidebar, <app-route> doit avoir la classe 'nav-open'
  // La variable a un bind avec la classe 'nav-open' sur <app-route>
  public sidebarVisible = false;

  private cursorDot?: HTMLElement;
  private cursorOutline?: HTMLElement;
  private mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e);

  // Ferme la sidebar quand on change de page
  // .pipe ne garde que les event de type Scroll (quand on interagit avec RouterLink)
  constructor(private router: Router) {
    // this.router.events.subscribe(console.log);
    this.router.events.pipe(filter((event) => event instanceof Scroll)).subscribe(() => { this.sidebarVisible = false });
  }

   ngOnInit(): void {
    // n'activer que sur device non-tactile
    if ('ontouchstart' in window) return;

    // crée les éléments de curseur
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'custom-cursor-dot';
    this.cursorOutline = document.createElement('div');
    this.cursorOutline.className = 'custom-cursor-outline';
    document.body.appendChild(this.cursorOutline);
    document.body.appendChild(this.cursorDot);

    // cacher curseur natif via CSS (géré dans styles.scss)
    window.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
  }

  private onMouseMove(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    if (this.cursorDot) {
      this.cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    if (this.cursorOutline) {
      this.cursorOutline.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }

  ngOnDestroy(): void {
    if (this.cursorDot) document.body.removeChild(this.cursorDot);
    if (this.cursorOutline) document.body.removeChild(this.cursorOutline);
    window.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  // Ferme la sidebar quand on clique sur la page
  closeSidebar() {
    this.sidebarVisible = false;
  }
}
