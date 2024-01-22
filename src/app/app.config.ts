import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingOptions, withInMemoryScrolling, provideRouter } from '@angular/router';
import { IMAGE_CONFIG } from '@angular/common';

import { routes } from './app.routes';

const scrollingOptions: InMemoryScrollingOptions = {
  // Scroll top on route change
  scrollPositionRestoration: 'top',
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling(scrollingOptions)),
    {
      // Disable Image Size Warning
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true
      }
    },
  ]
};
