import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faBookmark, faGlobe, faHeart } from '@fortawesome/free-solid-svg-icons';
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

  constructor(library: FaIconLibrary, private ts: TranslateService, private router: Router) {
    library.addIcons(faBookmark, faFacebookSquare, faInstagram, faYoutube, faGlobe, faCalendarAlt, faHeart);
    window.onscroll = () => { this.navbarTransparent = window.scrollY < 150; };
    this.currentLang = this.ts.currentLang;
    document.documentElement.lang = this.currentLang;
  }

  onEventsClick(ev?: MouseEvent) {
    if (ev) ev.preventDefault();
    this.navSidebarVisible = false;
    this.navSidebarVisibleChange.emit(this.navSidebarVisible);
    this.router.navigate(['/events']).catch(() => { window.location.href = '/events'; });
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
