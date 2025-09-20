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

  constructor(private faLib: FaIconLibrary, private http: HttpClient) {
    this.faLib.addIcons(faLinkedin, faRocket, faGlobe, faCloud, faUserTie, faUser);
  }

  ngOnInit(): void {
    this.http.get('assets/docs/members.csv', { responseType: 'text' }).subscribe(csv => {
      const parsed = this.parseCsv(csv);
      if (!parsed || parsed.length === 0) return;

      const header = parsed[0].map(h => h.trim());
      const rows = parsed.slice(1).map(r => {
        const obj: any = {};
        header.forEach((h, i) => obj[h] = (r[i] ?? '').trim());
        return obj;
      });

      const sectionsMap: Record<string, any> = {};

      rows.forEach(r => {
        let sectionKey = (r['section'] || '').trim();
        if (!sectionKey) return;
        if (sectionKey.includes('.')) sectionKey = sectionKey.split('.')[0];

        if (sectionKey === 'director') {
          this.director = {
            name: r.name || this.director.name,
            role: r.role || this.director.role,
            photo: r.photo || this.director.photo,
            linkedin: r.linkedin || this.director.linkedin
          };
          return;
        }

        let subsectionKey = (r['subsection'] || '').trim();
        if (subsectionKey.includes('.') || subsectionKey === sectionKey) subsectionKey = '';

        if (!sectionsMap[sectionKey]) {
          sectionsMap[sectionKey] = { titleKey: r['titleKey'] || sectionKey, lead: r['lead'] || '', members: [], subsections: {} };
        }

        sectionsMap[sectionKey].members.push(r);

        if (subsectionKey) {
          if (!sectionsMap[sectionKey].subsections[subsectionKey]) {
            sectionsMap[sectionKey].subsections[subsectionKey] = { key: subsectionKey, title: this.prettySubsection(subsectionKey), members: [] };
          }
          sectionsMap[sectionKey].subsections[subsectionKey].members.push(r);
        }
      });

      this.teamSections = Object.keys(sectionsMap).map(k => {
        const s = sectionsMap[k];
        const subsectionsArr = Object.keys(s.subsections).map(sk => s.subsections[sk]);
        return { key: k, titleKey: s.titleKey, members: s.members, subsections: subsectionsArr, lead: s.lead };
      });
    }, err => {
      console.error('Failed to load members.csv', err);
    });
  }

  private parseCsv(text: string): string[][] {
    if (!text) return [];
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    const reSplit = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    return lines.map(line => line.split(reSplit).map(cell => {
      let v = cell.trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/""/g, '"');
      return v;
    }));
  }

  private prettySubsection(key: string) {
    return key.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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