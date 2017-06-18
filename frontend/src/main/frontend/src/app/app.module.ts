import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserComponent } from './user.component';

const appRoutes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    data: { title: 'User List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  // all components
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserComponent
  ],
  // routes and modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  //  RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  // loading on appstart
  bootstrap: [AppComponent, UserComponent]
})
export class AppModule { }
