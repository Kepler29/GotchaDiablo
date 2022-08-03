import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () => import('../pages/admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('../pages/admin/packages/packages.module').then(m => m.PackagesModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('../pages/admin/gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import('../pages/admin/reservations/reservations.module').then(m => m.ReservationsModule)
  },
  {
    path: 'promotions',
    loadChildren: () => import('../pages/admin/promotions/promotions.module').then(m => m.PromotionsModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
