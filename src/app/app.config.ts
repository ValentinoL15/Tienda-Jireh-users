import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './authentication.interceptor';
import { SpinnerInterceptor } from './spinner.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterReducer } from './states/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(),
    provideRouter(routes ,withComponentInputBinding(), withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })), provideHttpClient(withFetch(), withInterceptors([SpinnerInterceptor, authInterceptor])),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr({
      preventDuplicates: true,              // Evita mensajes duplicados
      progressBar: true,                    // Muestra barra de progreso
      timeOut: 4000,                        // Duración 5 segundos
      closeButton: true,                    // Botón de cerrar visible
      tapToDismiss: false,                  // Requiere clic explícito para cerrar
      enableHtml: true                      // Permite HTML en mensajes
    }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
          preset: Aura,
          options: {
            darkModeSelector: '.my-app-dark'
        }
      }
  }),
  provideStore({ counterReducer }),
  provideStoreDevtools(),
  provideEffects(),]

};
