import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBookmark, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { TranslatePipe } from '../../core/translate.pipe';
import { TranslateService } from '../../core/translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() navSidebarVisible = false;
  @Output() navSidebarVisibleChange = new EventEmitter<boolean>();
  public navbarTransparent = true;
  public currentLang: 'fr' | 'en' = (localStorage.getItem('gaul-lang') as 'fr' | 'en') ?? 'fr';

  constructor(library: FaIconLibrary, private ts: TranslateService) {
    library.addIcons(faBookmark, faFacebookSquare, faInstagram, faYoutube, faGlobe);
    window.onscroll = () => { this.navbarTransparent = window.scrollY < 150; };
    // sync initial language from service
    this.currentLang = this.ts.currentLang;
    document.documentElement.lang = this.currentLang;
  }

  toggleLang() {
    const next = this.currentLang === 'fr' ? 'en' : 'fr';
    this.ts.setLang(next);
    this.currentLang = next;
  }

  sidebarToggle() {
    this.navSidebarVisible = !this.navSidebarVisible;
    this.navSidebarVisibleChange.emit(this.navSidebarVisible);
  }
}
