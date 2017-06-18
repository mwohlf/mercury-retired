import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const appRoutes: Routes = [
 { path: 'home', component: HomeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
