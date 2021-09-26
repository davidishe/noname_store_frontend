import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProductFormComponent } from './base/product-form/product-form.component';


const routes: Routes = [
  { path: '', component: AdminComponent},

  // список пользователей и управление правами
  { path: 'users', component: UsersComponent, data: {breadcrumb: {alias: 'productDetails'}} },

  // спиок продуктов и управление продуктами
  { path: 'products', component: BaseComponent, data: {breadcrumb: {alias: 'products'}} },
  { path: 'products/add/:id', component: ProductFormComponent, data: {breadcrumb: {alias: 'productDetails'}} },
  { path: 'products/add', component: ProductFormComponent, data: {breadcrumb: {alias: 'productDetails'}} },


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
