import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { WidgetsModule } from "../../../../_metronic/partials";
import { InlineSVGModule } from "ng-inline-svg";


@NgModule({
  declarations: [
    ListComponent
  ],
    imports: [
        CommonModule,
        ListRoutingModule,
        WidgetsModule,
        InlineSVGModule
    ]
})
export class ListModule { }
