import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Variable qui contrôle l'ouverture de la sidebar
  // Bind avec la classe 'nav-open'
  // Voir sidebarToggle()
  public sidebarVisible = false;

  // EventEmitter pour envoier la variable sidebarVisible aux parents
  // lorsque la fonction sidebarToggle() est appelée
  // Voir sidebarToggle()
  @Output() toggleSidebarEvent = new EventEmitter<boolean>();

  // Variable qui contrôle la transparence de la navbar
  // Bind avec la classe 'navbar-transparent'
  // Voir window.onscroll
  public navbarTransparent = true;

  constructor() {
    // Fonction appelée à chaque fois que l'utilisateur scroll
    window.onscroll = () => {
      this.navbarTransparent = window.scrollY < 150
    }
  }

  sidebarToggle() {
    // Inverse la variable (true -> false) (false -> true)
    // pour ouvrir ou fermer la sidebar
    this.sidebarVisible = !this.sidebarVisible;
    // Envoie la variable sidebarVisible aux parents
    this.toggleSidebarEvent.emit(this.sidebarVisible);
  };
}
