import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from './translate.service';
import { Subscription } from 'rxjs';

@Pipe({ name: 'translate', pure: false, standalone: true })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private sub: Subscription;
  private lastKey = '';
  private lastValue = '';
  constructor(private ts: TranslateService, private cd: ChangeDetectorRef) {
    this.sub = this.ts.lang$.subscribe(() => { this.lastValue = ''; this.cd.markForCheck(); });
  }

  transform(key: string): string {
    if (!key) return '';
    if (this.lastKey === key && this.lastValue) return this.lastValue;
    this.lastKey = key;
    this.lastValue = this.ts.translate(key);
    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
