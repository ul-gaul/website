import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scroll, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // État de la sidebar (true = ouverte, false = fermée)
  // Pour ouvrir la sidebar, <app-route> doit avoir la classe 'nav-open'
  // La variable a un bind avec la classe 'nav-open' sur <app-route>
  public sidebarVisible = false;

  // Ferme la sidebar quand on change de page
  // .pipe ne garde que les event de type Scroll (quand on interagit avec RouterLink)
  constructor(private router: Router) {
    // this.router.events.subscribe(console.log);
    this.router.events.pipe(filter((event) => event instanceof Scroll)).subscribe(() => { this.sidebarVisible = false });
  }

  // Ferme la sidebar quand on clique sur la page
  closeSidebar() {
    this.sidebarVisible = false;
  }
}
