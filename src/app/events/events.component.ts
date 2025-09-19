import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type EventItem = { date: string; title: string; desc?: string; };

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
        const dateIdx = header.indexOf('date');
        const titleIdx = header.indexOf('title');
        const descIdx = header.indexOf('desc');
        const parsed: EventItem[] = lines.map((l: string) => {
          const cols = l.split(splitter).map((c: string) => c.replace(/^"|"$/g, ''));
          return {
            date: (cols[dateIdx] || '').trim(),
            title: (cols[titleIdx] || '').trim(),
            desc: (cols[descIdx] || '').trim()
          };
        }).filter((e: EventItem) => !!(e.date && e.title));
        if (parsed.length) {
          this.events = parsed;
          this.findNextEvent();
        }
      },
      error: (err) => console.warn('Failed to load events CSV', err)
    });
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
      .map((e: EventItem) => ({ e, d: this.parseDateISO(e.date) }))
      .filter((x: { e: EventItem; d: Date }) => x.d.getTime() >= todayStart.getTime())
      .sort((a: { e: EventItem; d: Date }, b: { e: EventItem; d: Date }) => a.d.getTime() - b.d.getTime());

    if (future.length) {
      this.nextEvent = future[0].e;
      this.nextEventDate = future[0].d;
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
    this.findNextEvent();
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
      // événement atteint : recalculer le prochain
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
        const iso = new Date(this.viewYear, this.viewMonth, dayIndex).toISOString().slice(0, 10);
        const evs = this.events.filter((e: EventItem) => e.date === iso);
        days.push({ d: dayIndex, iso, events: evs });
      } else {
        days.push({ d: 0, iso: undefined, events: [] });
      }
    }
    return days;
  }
}