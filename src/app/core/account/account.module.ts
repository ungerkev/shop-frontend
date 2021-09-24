import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { accountRouting } from './account.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    accountRouting,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
