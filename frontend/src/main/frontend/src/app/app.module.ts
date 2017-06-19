import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RoutingModule } from './app.routing';

import { PageNotFoundComponent } from './page-not-found.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  // all components
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    PageNotFoundComponent,
  ],
  // modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
  ],
  providers: [],
  // loading on appstart
  bootstrap: [AppComponent]
})
export class AppModule { }
