import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'home', component : HomeComponent },
  { path: 'login', component : LoginComponent },
  { path: 'registration', component : RegistrationComponent },
  { path: 'about', component : AboutComponent },
  { path: '', redirectTo: 'login',pathMatch: 'full' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
