import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { IsUserAuthenticatedGuard } from 'src/app/shared/guards/is-user-authenticated.guard';
import { AccountComponent } from '../account/account.component';

const routes: Routes = [
  { path: 'login', component: AccountComponent, canActivate: [IsUserAuthenticatedGuard] },
  { path: 'admin', component: AdminComponent },
];

export const navigationRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);

