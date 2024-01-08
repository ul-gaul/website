import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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
  sidebarVisible = false;

  // Gère l'ouverture de la sidebar
  // Ajuste la valeur de la variable avec celle du NavBarComponent
  updateSidebarVisible(newSidebarVisible: boolean) {
    this.sidebarVisible = newSidebarVisible;
  }
}
