import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';

const routes: Routes = [
    {
      path: '',
      component: CompaniesComponent,
      children: [
        {
          path: 'list',
          loadChildren: () => import('./list/list.module').then(m => m.ListModule)
        },
        {
          path: 'create',
          loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
        },
        {
          path: 'edit/:company',
          loadChildren: () => import('./edit/edit.module').then(m => m.EditModule)
        },
        {
          path: '',
          redirectTo: 'list'
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
