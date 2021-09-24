import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRouting } from './admin-routing';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    adminRouting,
    CommonModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
