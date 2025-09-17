import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule, NgbNavModule, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, NgbCarouselModule, NgbNavModule, HeaderComponent, TranslatePipe],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageCarousel', { read: ElementRef }) pageCarouselRef!: ElementRef;

  private mutationObs?: MutationObserver;
  private resizeHandler = () => this.adjustCarouselHeight();

  ngAfterViewInit(): void {
    // initial adjustment
    setTimeout(() => this.adjustCarouselHeight(), 100);

    // observe mutations to detect when .carousel-item.active changes
    const carouselInner = this.pageCarouselRef?.nativeElement.querySelector('.carousel-inner');
    if (carouselInner) {
      this.mutationObs = new MutationObserver(() => {
        // run in next tick to ensure DOM settled
        setTimeout(() => this.adjustCarouselHeight(), 20);
      });
      // observe class attribute changes within carousel items
      this.mutationObs.observe(carouselInner, { subtree: true, attributes: true, attributeFilter: ['class'] });
    }

    window.addEventListener('resize', this.resizeHandler);
  }

  private adjustCarouselHeight() {
    if (!this.pageCarouselRef) return;
    const carouselInner: HTMLElement | null = this.pageCarouselRef.nativeElement.querySelector('.carousel-inner');
    if (!carouselInner) return;

    // pick the currently active slide (fallback to first slide)
    const activeItem = carouselInner.querySelector('.carousel-item.active') as HTMLElement
      || carouselInner.querySelector('.carousel-item') as HTMLElement;
    if (!activeItem) return;

    const img = activeItem.querySelector('img') as HTMLImageElement | null;
    if (!img) return;

    const applyHeight = () => {
      // compute displayed height preserving aspect ratio
      let height = img.clientHeight;
      if (img.naturalWidth && img.naturalHeight) {
        const displayedWidth = img.clientWidth || activeItem.clientWidth;
        height = Math.round((img.naturalHeight / img.naturalWidth) * displayedWidth);
      }
      carouselInner.style.transition = 'height 450ms ease';
      carouselInner.style.height = height + 'px';
    };

    if (!img.complete) {
      img.onload = () => applyHeight();
    } else {
      applyHeight();
    }
  }

  ngOnDestroy(): void {
    if (this.mutationObs) this.mutationObs.disconnect();
    window.removeEventListener('resize', this.resizeHandler);
  }
}
