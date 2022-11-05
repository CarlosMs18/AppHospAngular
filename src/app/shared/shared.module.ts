import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    BreadcumbsComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    SidebarComponent,
    HeaderComponent,
    BreadcumbsComponent
  ]
})
export class SharedModule { }
