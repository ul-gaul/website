import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBookmark, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() navSidebarVisible = false;
  @Output() navSidebarVisibleChange = new EventEmitter<boolean>();
  public navbarTransparent = true;
  public currentLang: 'fr' | 'en' = (localStorage.getItem('gaul-lang') as 'fr' | 'en') ?? 'fr';

  constructor(library: FaIconLibrary) {
    library.addIcons(faBookmark, faFacebookSquare, faInstagram, faYoutube, faGlobe);
    window.onscroll = () => { this.navbarTransparent = window.scrollY < 150; };
    document.documentElement.lang = this.currentLang;
  }

  toggleLang() {
    this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('gaul-lang', this.currentLang);
    document.documentElement.lang = this.currentLang;
    window.dispatchEvent(new CustomEvent('languageChange', { detail: this.currentLang }));
  }

  sidebarToggle() {
    this.navSidebarVisible = !this.navSidebarVisible;
    this.navSidebarVisibleChange.emit(this.navSidebarVisible);
  }
}
