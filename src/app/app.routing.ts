import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import {SideMenuComponent} from './side-menu/side-menu.component'
import {HomeComponent} from './home/home.component'
import {VistorSignupComponent} from "./signup/visitor-signup/vistor-signup.component";
import {CreatorSignupComponent} from "./signup/creator-signup/creator-signup.component";
import {LoginComponent} from "./login/login.component";
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', redirectTo: 'register/visitor', pathMatch: 'full' },
  { path: 'register/visitor', component: VistorSignupComponent },
  { path: 'register/creator', component: CreatorSignupComponent },
  { path: 'register/creator', component: CreatorSignupComponent },
  { path: 'login', component: LoginComponent },
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
