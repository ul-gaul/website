import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Variable qui contrôle l'ouverture de la sidebar
  // Bind avec la classe 'nav-open'
  // @Input pour recevoir la variable du parent si elle change
  // Voir sidebarToggle()
  @Input() navSidebarVisible = false;

  // EventEmitter pour envoier la variable navSidebarVisible aux parents
  // lorsque la fonction sidebarToggle() est appelée
  // Voir sidebarToggle()
  @Output() navSidebarVisibleChange = new EventEmitter<boolean>();

  // Variable qui contrôle la transparence de la navbar
  // Bind avec la classe 'navbar-transparent'
  // Voir window.onscroll
  public navbarTransparent = true;

  constructor(library: FaIconLibrary) {
    // Rend les icônes disponibles dans le composant
    library.addIcons(faBookmark, faFacebookSquare, faInstagram);
    // Fonction appelée à chaque fois que l'utilisateur scroll
    window.onscroll = () => {
      this.navbarTransparent = window.scrollY < 150
    }
  }

  sidebarToggle() {
    // Inverse la variable (true -> false) (false -> true)
    // pour ouvrir ou fermer la sidebar
    this.navSidebarVisible = !this.navSidebarVisible;
    // Envoie la variable sidebarVisible aux parents
    this.navSidebarVisibleChange.emit(this.navSidebarVisible);
  };
}
