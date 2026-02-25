import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

const providerconfigtostart=provideToastr({
  timeOut: 3000, // Duration in milliseconds
  positionClass: 'toast-bottom-left', // Position: toast-top-right, toast-bottom-right, toast-top-left, toast-bottom-left, toast-top-full-width, toast-bottom-full-width
  preventDuplicates: true, // Prevent duplicate messages
  progressBar: true, // Show progress bar
  closeButton: true, // Show close button
  tapToDismiss: true, // Tap to dismiss
  easing: 'ease-in', // Animation easing
  easeTime: 300, // Animation duration
  newestOnTop: true, // New toasts appear on top
  maxOpened: 5, // Maximum number of toasts open at once
})


export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),providerconfigtostart,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};
