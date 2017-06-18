import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { PageNotFoundComponent } from './page-not-found.component';
import { UserComponent } from './user.component';
import { HomeComponent } from './home.component';

@NgModule({
  // all components
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserComponent,
    HomeComponent,
  ],
  // modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [],
  // loading on appstart
  bootstrap: [AppComponent, UserComponent]
})
export class AppModule { }
