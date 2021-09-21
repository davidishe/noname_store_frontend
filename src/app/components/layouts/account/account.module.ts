import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../../core/core.module';
import { AccountComponent } from './account.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AccountComponent],
  imports: [
    CommonModule,
    CoreModule,
    AccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
