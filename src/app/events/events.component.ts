import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type EventItem = {
  // raw CSV
  start_date: string;
  end_date?: string;
  title: string;
  desc?: string;
  link?: string;

  // parsed helpers
  start?: Date;
  end?: Date;
};

@Component({
    selector: 'app-events',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TranslatePipe, HttpClientModule],
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient) { }

  events: EventItem[] = [];

  private loadEventsFromCsv(): void {
    this.http.get('/assets/docs/events.csv', { responseType: 'text' }).subscribe({
      next: (txt: string) => {
        const lines = txt.split(/\r?\n/).map((l: string) => l.trim()).filter((l: string) => l && !l.startsWith('#'));
        if (!lines.length) return;
        const sep = lines[0].includes(';') ? ';' : ',';
        const splitter = new RegExp(`${sep}(?=(?:[^"]*"[^"]*")*[^"]*$)`);
        const header = lines.shift()!.split(splitter).map((h: string) => h.replace(/^"|"$/g, '').toLowerCase());

        const startIdx = header.indexOf('start_date') >= 0 ? header.indexOf('start_date') : header.indexOf('date');
        const endIdx = header.indexOf('end_date') >= 0 ? header.indexOf('end_date') : -1;
        const titleIdx = header.indexOf('title');
        const descIdx = header.indexOf('desc');
        const linkIdx = header.indexOf('link') >= 0 ? header.indexOf('link') : (header.indexOf('url') >= 0 ? header.indexOf('url') : -1);

        const parsed: EventItem[] = lines.map((l: string) => {
          const cols = l.split(splitter).map((c: string) => c.replace(/^"|"$/g, ''));
          const startRaw = (cols[startIdx] || '').trim();
          const endRaw = endIdx >= 0 ? (cols[endIdx] || '').trim() : '';
          const linkRaw = linkIdx >= 0 ? (cols[linkIdx] || '') : '';

          const linkClean = (linkRaw || '').toString().replace(/^"|"$/g, '').trim().replace(/,+$/g, '');
          const ev: EventItem = {
            start_date: startRaw,
            end_date: endRaw || startRaw,
            title: (cols[titleIdx] || '').trim(),
            desc: (cols[descIdx] || '').trim(),
            link: linkClean ? linkClean : undefined
          };
          ev.start = this.parseDateISO(ev.start_date);
          ev.end = this.parseDateISO(ev.end_date || ev.start_date);
          return ev;
        }).filter((e: EventItem) => !!(e.start && e.title));

        if (parsed.length) {
          this.events = parsed;
          this.findNextEvent();
        }
      },
      error: (err) => console.warn('Failed to load events CSV', err)
    });
  }

  public eventTitleForDay(e: EventItem, iso?: string): string {
    if (!iso) return e.title;
    const s = e.start || this.parseDateISO(e.start_date);
    const en = e.end || this.parseDateISO(e.end_date || e.start_date);
    const ds = s.toISOString().slice(0,10);
    const de = en.toISOString().slice(0,10);
    if (ds !== de) {
      if (iso === ds) return `${e.title} (start)`;
      if (iso === de) return `${e.title} (end)`;
    }
    return e.title;
  }

  onDayClick(day: { d: number; iso?: string; events: EventItem[] }) {
    if (!day || !day.events || !day.events.length) return;
    const evWithLink = day.events.find(e => !!e.link);
    if (evWithLink && evWithLink.link) {
      window.open(this.normalizeUrl(evWithLink.link), '_blank', 'noopener');
      return;
    }
    if (day.events.length === 1) {
      console.debug('[Events] clicked single event without link', day.events[0]);
    } else {
      console.debug('[Events] clicked multiple events, none with link');
    }
  }

  public normalizeUrl(link?: string): string {
    if (!link) return '';
    let url = ('' + link).replace(/^"|"$/g, '').trim().replace(/,+$/g, '');
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) {
      url = 'https://' + url;
    }
    return url;
  }

  viewYear = new Date().getFullYear();
  viewMonth = new Date().getMonth(); // 0-11

  // countdown
  nextEvent?: EventItem;
  nextEventDate?: Date;
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private intervalId: any;

  private parseDateISO(dateStr: string): Date {
    const parts = (dateStr || '').split('-').map(p => parseInt(p, 10));
    if (parts.length >= 3 && !parts.some(isNaN)) {
      // year, monthIndex, day
      return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
    }
    // fallback to native parse
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date(0) : d;
  }

  private findNextEvent() {
    const todayStart = new Date();
    todayStart.setHours(0,0,0,0);

    const future = this.events
      .map((e: EventItem) => ({ e, start: e.start || new Date(0), end: e.end || e.start || new Date(0) }))
      .filter(x => x.end.getTime() >= todayStart.getTime())
      .sort((a, b) => a.start.getTime() - b.start.getTime() || a.end.getTime() - b.end.getTime());

    if (future.length) {
      this.nextEvent = future[0].e;

      const now = new Date();
      if (future[0].start.getTime() > now.getTime()) {
        this.nextEventDate = future[0].start;
      } else {
        this.nextEventDate = future[0].end;
      }
      console.debug('[Events] nextEvent found', this.nextEvent, this.nextEventDate);
      this.updateCountdown();
    } else {
      this.nextEvent = undefined;
      this.nextEventDate = undefined;
      console.debug('[Events] no upcoming events');
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  ngOnInit(): void {
    this.loadEventsFromCsv();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private updateCountdown() {
    if (!this.nextEventDate) return;
    const now = new Date();
    const diff = this.nextEventDate.getTime() - now.getTime();
    if (diff <= 0) {
      this.findNextEvent();
      return;
    }
    let remaining = Math.floor(diff / 1000);
    const days = Math.floor(remaining / 86400);
    remaining -= days * 86400;
    const hours = Math.floor(remaining / 3600);
    remaining -= hours * 3600;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining - minutes * 60;
    this.countdown = { days, hours, minutes, seconds };
  }

  prevMonth() {
    if (this.viewMonth === 0) { this.viewMonth = 11; this.viewYear--; } else { this.viewMonth--; }
  }
  nextMonth() {
    if (this.viewMonth === 11) { this.viewMonth = 0; this.viewYear++; } else { this.viewMonth++; }
  }

  get calendarDays(): { d: number; iso?: string; events: EventItem[] }[] {
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const startWeekday = first.getDay(); // 0=dim
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const offset = startWeekday;
    const total = 42;
    const days: { d: number; iso?: string; events: EventItem[] }[] = [];
    for (let i = 0; i < total; i++) {
      const dayIndex = i - offset + 1;
      if (dayIndex >= 1 && dayIndex <= daysInMonth) {
        const dateObj = new Date(this.viewYear, this.viewMonth, dayIndex);
        const iso = dateObj.toISOString().slice(0, 10);
        // include events whose [start..end] covers this date
        const evs = this.events.filter((e: EventItem) => {
          const s = e.start || this.parseDateISO(e.start_date);
          const en = e.end || this.parseDateISO(e.end_date || e.start_date);
          // normalize to yyyy-mm-dd by comparing yyyy-mm-dd strings
          const ds = s.toISOString().slice(0,10);
          const de = en.toISOString().slice(0,10);
          return iso >= ds && iso <= de;
        });
        days.push({ d: dayIndex, iso, events: evs });
      } else {
        days.push({ d: 0, iso: undefined, events: [] });
      }
    }
    return days;
  }
}