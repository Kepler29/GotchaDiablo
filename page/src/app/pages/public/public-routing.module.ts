import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { AuthGuard } from "../auth/services/auth.guard";

const routes: Routes = [
  { 
    path: '', 
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      },
      {
        path: 'paquetes',
        loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule)
      },
      {
        path: 'galeria',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: 'contacto',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'politicas-privacidad',
        loadChildren: () => import('./privacy-policies/privacy-policies.module').then(m => m.PrivacyPoliciesModule)
      },
      {
        path: 'perfil',
        canActivate: [AuthGuard],
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'reservaciones',
        canActivate: [AuthGuard],
        loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
