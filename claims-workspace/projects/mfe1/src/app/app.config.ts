import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSharedDevTools, provideSharedEffects, provideSharedStore } from '@shared';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
     ...provideSharedStore(),
    ...provideSharedEffects(),
    ...provideSharedDevTools()
  ]
};
