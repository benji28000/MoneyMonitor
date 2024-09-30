// app.config.ts
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';  // Assurez-vous que le chemin est correct

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
