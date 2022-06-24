import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
