import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { UserAuthGuard } from 'src/app/shared/guards/user-auth.guard';
import { IsUserAuthenticatedGuard } from 'src/app/shared/guards/is-user-authenticated.guard';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: AccountComponent, canActivate: [UserAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [IsUserAuthenticatedGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
];

export const accountRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);

