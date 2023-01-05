import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AccountComponent } from './account.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'vision-general',
        component: OverviewComponent,
      },
      {
        path: 'ajustes',
        component: SettingsComponent,
      },
      { path: '', redirectTo: 'vision-general', pathMatch: 'full' },
      { path: '**', redirectTo: 'vision-general', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
