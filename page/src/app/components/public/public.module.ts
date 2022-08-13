import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from "@angular/router";
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropdownMenuComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DropdownMenuComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class PublicComponentsModule { }
