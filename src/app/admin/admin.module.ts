import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRouting } from './admin-routing';
import { AdmNavigationComponent } from './adm-navigation/adm-navigation.component';
import { AdmLoginComponent } from './adm-login/adm-login.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdmNavigationComponent,
    AdmLoginComponent
  ],
  imports: [
    adminRouting,
    CommonModule
  ],
  exports: [
    AdminComponent,
    AdmNavigationComponent
  ]
})
export class AdminModule { }
