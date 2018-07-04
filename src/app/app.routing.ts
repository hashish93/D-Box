import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import {SideMenuComponent} from './side-menu/side-menu.component'
import {HomeComponent} from './home/home.component'
export const routes: Routes = [
  { path: 'side', component: SideMenuComponent },
  { path: '', component: HomeComponent }
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
