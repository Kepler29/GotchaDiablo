import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPoliciesRoutingModule } from './privacy-policies-routing.module';
import { PrivacyPoliciesComponent } from './privacy-policies.component';


@NgModule({
  declarations: [
    PrivacyPoliciesComponent
  ],
  imports: [
    CommonModule,
    PrivacyPoliciesRoutingModule
  ]
})
export class PrivacyPoliciesModule { }
