import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserCardComponent } from './users-page/user-card/user-card.component';
import { UsersPageComponent } from './users-page/users-page/users-page.component';
import { CoreModule } from '../../core/core.module';
import { ProductFormComponent } from './base/product-form/product-form.component';



@NgModule({
  declarations: [
    BaseComponent,
    AdminComponent,
    UsersComponent,
    UserCardComponent,
    UsersPageComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
