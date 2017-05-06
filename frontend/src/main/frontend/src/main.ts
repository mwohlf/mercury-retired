
// bootstraping

import { enableProdMode } from '@angular/core';
// target platform
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// loading the app module into browser platform
platformBrowserDynamic().bootstrapModule(AppModule);
