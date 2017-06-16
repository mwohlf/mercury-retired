import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';


@NgModule({
  // all components
  declarations: [
    AppComponent,
    UserComponent
  ],
  // routes and modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  // loading on appstart
  bootstrap: [AppComponent, UserComponent]
})
export class AppModule { }
