// import { Component } from '@angular/core';
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Variable qui contrôle l'ouverture de la sidebar
  // Bind avec la classe
  sidebarVisible = false;

  // EventEmitter pour envoier la variable sidebarVisible aux parents
  // lorsque la fonction sidebarToggle() est appelée
  @Output() toggleSidebarEvent = new EventEmitter<boolean>();

  sidebarToggle() {
    // Inverse la variable (true -> false) (false -> true)
    // pour ouvrir ou fermer la sidebar
    this.sidebarVisible = !this.sidebarVisible;
    // Envoie la variable sidebarVisible aux parents
    this.toggleSidebarEvent.emit(this.sidebarVisible);
  };
}
