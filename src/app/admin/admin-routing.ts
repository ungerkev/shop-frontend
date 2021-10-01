import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/products', component: ProductsComponent },
  { path: 'admin/customers', component: CustomersComponent },
];

export const adminRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);

