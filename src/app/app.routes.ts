import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about').then((m) => m.About),
      },
      {
        path: 'hero',
        loadComponent: () => import('./features/hero/hero').then((m) => m.Hero),
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/inventory/inventory').then((m) => m.Inventory),
      },
      {
        path: 'journal',
        loadComponent: () => import('./features/journal/journal').then((m) => m.Journal),
      },
      {
        path: 'tavern',
        loadComponent: () => import('./features/tavern/tavern').then((m) => m.Tavern),
      },
    ],
  },
];
