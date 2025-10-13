import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';

interface Rocket {
  id: string;
  name: string;
  year: string;
  image: string;
  competition?: string;
  category?: string;
  ranking?: string;
  altitude?: string;
  showDetails?: boolean;
  specs?: {
    fusee?: {
      dimensions?: string;
      materials?: string;
      flight?: string;
      motor?: string;
      recovery?: string;
    };
    avionique?: {
      ground?: string;
      communication?: string;
      sensors?: string;
      power?: string;
    };
    payload?: { text?: string };
  };
  description?: string;
}

@Component({
  selector: 'app-fusee',
  standalone: true,
  imports: [HeaderComponent, CommonModule, TranslatePipe, HttpClientModule],
  templateUrl: './fusee.component.html',
  styleUrls: ['./fusee.component.scss']
})
export class FuseeComponent implements OnInit {
  rockets: Rocket[] = [];
  selected: Rocket | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFromCsv();
  }

  private loadFromCsv() {
    this.http.get('assets/docs/rockets.csv', { responseType: 'text' }).subscribe({
      next: (csv) => {
        this.rockets = this.parseCsv(csv);
        this.selected = this.rockets.length ? this.rockets[0] : null;
      },
      error: (err) => {
        console.error('Erreur chargement CSV rockets:', err);
      }
    });
  }

  private parseCsv(text: string): Rocket[] {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (!lines.length) return [];

    const headers = this.splitCsvLine(lines[0]).map(h => h.trim());
    const rows = lines.slice(1).map(line => {
      const cols = this.splitCsvLine(line);
      const obj: any = {};
      headers.forEach((h, i) => {
        obj[h] = typeof cols[i] === 'undefined' ? '' : cols[i];
      });
      obj.showDetails = obj.showDetails === 'true' || obj.showDetails === '1';
      if (obj.specs) {
        try { obj.specs = JSON.parse(obj.specs); } catch { obj.specs = {}; }
      }
      return obj as Rocket;
    });

    return rows;
  }

  private splitCsvLine(line: string): string[] {
    const res: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          cur += '"'; // escaped quote
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        res.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    res.push(cur);
    return res;
  }

  selectRocket(r: Rocket) {
    if (typeof r.showDetails === 'undefined') {
      r.showDetails = !!r.specs;
    }
    this.selected = r;
  }

  toggleDetails(r: Rocket) {
    r.showDetails = !r.showDetails;
  }
    // scroll doux vers la zone détails (optionnel)
    // const el = document.getElementById('fusee-details');
    // if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
