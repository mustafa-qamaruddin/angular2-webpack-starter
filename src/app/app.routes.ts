import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

/**
 * mQuBits
 */
import { RegisterComponent } from './mQuBits/components/users/register/register.component';
import { ProfileComponent } from './mQuBits/components/users/profile/profile.component';
import { LoginComponent } from './mQuBits/components/users/login/login.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'users/profile', component: ProfileComponent },
  { path: 'users/login', component: LoginComponent },
  { path: '**', component: NoContentComponent },
];
