import { Routes } from '@angular/router';
import { heroLevelGuard } from './core/guards/hero-level-guard';
import { itemResolver } from './features/inventory/resolvers/item.resolver';

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
        canActivate: [heroLevelGuard],
        loadComponent: () => import('./features/hero/hero').then((m) => m.Hero),
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/inventory/inventory').then((m) => m.Inventory),
        children: [
          { path: '', loadComponent: () => import('./features/inventory/inventory-list/inventory-list').then((m) => m.InventoryList) },
          { 
            path: ':id',
            resolve: { item: itemResolver }, 
            loadComponent: () => import('./features/inventory/inventory-detail/inventory-detail').then((m) => m.InventoryDetail) }
        ]
      },
      {
        path: 'journal',
        loadComponent: () => import('./features/journal/journal').then((m) => m.Journal),
      },
      {
        path: 'tavern',
        loadComponent: () => import('./features/tavern/tavern').then((m) => m.Tavern),
      },
      {
        path: 'chest',
        loadComponent: () => import('./features/chest/chest').then((m) => m.Chest),
      },
      {
        path: 'gallery',
        loadComponent: () => import('./features/gallery/gallery').then((m) => m.Gallery),
      }
    ],
  },
];
