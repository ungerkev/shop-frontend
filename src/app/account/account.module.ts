import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { accountRouting } from './account.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAddressModalComponent } from "../shared/components/new-address-modal/new-address-modal.component";
import { DeleteModalComponent } from "../shared/components/delete-modal/delete-modal.component";
import { EditAddressModalComponent } from "../shared/components/edit-address-modal/edit-address-modal.component";



@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    NewAddressModalComponent,
    DeleteModalComponent,
    EditAddressModalComponent
  ],
  imports: [
    accountRouting,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
