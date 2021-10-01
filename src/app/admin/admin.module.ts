import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRouting } from './admin-routing';
import { AdmNavigationComponent } from './adm-navigation/adm-navigation.component';
import { AdmLoginComponent } from './adm-login/adm-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdmNavigationComponent,
    AdmLoginComponent,
    DashboardComponent,
    ProductsComponent,
    CustomersComponent
  ],
  imports: [
    adminRouting,
    CommonModule,
  ],
  exports: [
    AdminComponent,
    AdmNavigationComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AdminModule { }
