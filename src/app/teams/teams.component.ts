import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faRocket, faGlobe, faCloud, faUserTie, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-team',
    standalone: true,
    imports: [HeaderComponent, CommonModule, TranslatePipe, FontAwesomeModule, HttpClientModule],
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss']
})
export class TeamComponent implements OnInit {
  // Icons
  directorIcon: IconDefinition = faUserTie;
  iconMap: Record<string, IconDefinition> = {
    'fusee.title': faRocket,
    'espace.title': faGlobe,
    'stratos.title': faCloud
  };

  // Director + Sections
  director: any = { name: '', role: '', photo: '', linkedin: '' };
  teamSections: Array<any> = [];

  // <-- Single constructor: register icons + inject HttpClient
  constructor(private faLib: FaIconLibrary, private http: HttpClient) {
    this.faLib.addIcons(faLinkedin, faRocket, faGlobe, faCloud, faUserTie, faUser);
  }

  ngOnInit(): void {
    // CSV
    this.http.get('assets/docs/members.csv', { responseType: 'text' }).subscribe({
      next: (csvText) => this.parseCsvToSections(csvText),
      error: (err) => console.error('Failed loading members CSV', err)
    });
  }

  getIcon(section: any): IconDefinition {
    return this.iconMap[section.titleKey] || faUser;
  }

  private parseCsvToSections(csvText: string) {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length);
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => {
      // naive split — good for simple CSV without quoted commas
      const cols = line.split(',').map(c => c.trim());
      const obj: any = {};
      headers.forEach((h, i) => obj[h] = cols[i] ?? '');
      return obj;
    });

    const sectionsMap = new Map<string, any>();
    for (const r of rows) {
      if (!r || !r.section) continue;
      if (r.section === 'director') {
        this.director = {
          name: r.name || this.director.name,
          role: r.role || this.director.role,
          photo: r.photo || this.director.photo,
          linkedin: r.linkedin || this.director.linkedin
        };
        continue;
      }

      const sectionKey = r.section || r.titleKey || 'unknown';
      if (!sectionsMap.has(sectionKey)) {
        sectionsMap.set(sectionKey, { titleKey: r.titleKey || sectionKey, lead: r.lead || '', members: [] });
      }
      sectionsMap.get(sectionKey).members.push({
        name: r.name,
        role: r.role,
        photo: r.photo,
        linkedin: r.linkedin
      });
    }

    this.teamSections = Array.from(sectionsMap.values());
  }
}