import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/core/guards/auth.guard';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Магазин'} },

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },


  { path: 'shop', loadChildren: () => import('./components/content/shop/shop.module').then(mod => mod.ShopModule),
  data: {breadcrumb: 'Каталог'}},

  { path: 'basket', loadChildren: () => import('./components/content/basket/basket.module').then(mod => mod.BasketModule),
  data: {breadcrumb: 'Корзина'}},

  { path: 'checkout', loadChildren: () => import('./components/content/checkout/checkout.module').then(mod => mod.CheckoutModule),
  canActivate: [AuthGuard], data: {breadcrumb: 'Оформление заказа'}},

  { path: 'account', loadChildren: () => import('./components/layouts/account/account.module').then(mod => mod.AccountModule),
  data: {breadcrumb: {skip: true}}},


  { path: 'orders', loadChildren: () => import('./components/content/orders/orders.module').then(mod => mod.OrdersModule),
  canActivate: [AuthGuard]},


  { path: 'admin', loadChildren: () => import('./components/content/admin/admin.module').then(mod => mod.AdminModule),
  canActivate: [AuthGuard], data: {breadcrumb: 'Администратор'} }


];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
