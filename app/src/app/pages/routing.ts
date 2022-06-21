import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'companies',
    loadChildren: () => import('../pages/admin/companies/companies.module').then(m => m.CompaniesModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('../pages/admin/packages/packages.module').then(m => m.PackagesModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../pages/admin/users/users.module').then(m => m.UsersModule)
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
