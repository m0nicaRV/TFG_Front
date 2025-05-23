import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarInterceptor } from './service/interceptor/calendar.interceptor';

import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

import { providePrimeNG } from 'primeng/config';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/interceptor/auth-interceptor.service';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CalendarInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      },
    }),
  ],
};