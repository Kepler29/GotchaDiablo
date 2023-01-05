import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsComponent } from './errors.component';

const routes: Routes = [
  { 
    path: '', 
    component: ErrorsComponent,
    children: [
      { 
        path: '404', 
        loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module)
      },
      { 
        path: '500', 
        loadChildren: () => import('./error500/error500.module').then(m => m.Error500Module) 
      },
      { 
        path: '', 
        redirectTo: '404', 
        pathMatch: 'full' 
      },
      { 
        path: '**', 
        redirectTo: '404', 
        pathMatch: 'full' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
