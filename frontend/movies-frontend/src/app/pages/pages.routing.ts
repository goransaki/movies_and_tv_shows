import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {PagesComponent} from './pages.component';
import {AuthGuard} from '../services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          breadcrumb: 'Home',
        },
        canActivate: [AuthGuard]
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
