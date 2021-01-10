import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';

import { AuthentificationHelperInterceptor } from './helpers/authentification-helper.interceptor';
//import * as  AuthentificationHelper from './helpers/authentification-helper.interceptor';

// Style imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule,
         MatMenuModule,
         MatIconModule,
         MatButtonModule,
         MatTableModule,
         MatDividerModule,
         MatProgressSpinnerModule,
         MatInputModule,
         MatCardModule,
         MatSlideToggleModule,
         MatSelectModule,
         MatOptionModule} from '@angular/material';

// Prime ng 
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';





@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    AboutComponent,
    NotFoundComponent,
    RegistrationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatListModule,

    // Styles
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,

    //prime ng
    AccordionModule,
    ButtonModule,
    TableModule

  ],
  providers: [{ 
        provide: HTTP_INTERCEPTORS,
        useClass: AuthentificationHelperInterceptor, 
        multi: true
      }
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
