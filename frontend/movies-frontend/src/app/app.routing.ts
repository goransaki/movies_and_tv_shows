import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AuthGuard} from './services/auth.guard';
import {LoginGuard} from './services/login.service';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {path: 'login', canActivate: [LoginGuard], loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  useHash: false
});
