import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRouting } from './admin-routing';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent
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
