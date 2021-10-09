import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRouting } from './admin-routing';
import { AdmNavigationComponent } from './adm-navigation/adm-navigation.component';
import { AdmLoginComponent } from './adm-login/adm-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdmNavigationComponent,
    AdmLoginComponent,
    DashboardComponent,
    ProductsComponent,
    CustomersComponent,
    CategoriesComponent,
  ],
    imports: [
        adminRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  exports: [
    AdminComponent,
    AdmNavigationComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AdminModule { }
