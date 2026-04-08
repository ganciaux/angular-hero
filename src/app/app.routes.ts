import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./layout/layout').then(m => m.Layout),
  children: [
    {
      path: '',
      loadComponent: () => import('./features/home/home').then(m => m.Home),
    }, {
      path: 'about',
      loadComponent: () => import('./features/about/about').then(m => m.About),
    }
  ]
}];
