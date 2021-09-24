import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './core/account/account.module';
import { UserAuthGuard } from './shared/guards/user-auth.guard';

const routes: Routes = [
  { path: 'account', loadChildren: () => AccountModule },
  { path: 'admin', loadChildren: () => AdminModule, canActivate: [UserAuthGuard] },
];

export const appRouting: ModuleWithProviders<any> = RouterModule.forRoot(routes, { enableTracing: false });

