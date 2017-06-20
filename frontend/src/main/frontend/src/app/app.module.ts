import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RoutingModule } from './app.routing';

import { PageNotFoundComponent } from './page-not-found.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  // all components
  declarations: [
    AppComponent,
    RegisterComponent,
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
    NgbModule.forRoot(),
  ],
  providers: [],
  // loading on appstart
  bootstrap: [AppComponent]
})
export class AppModule { }
