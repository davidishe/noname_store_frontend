import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { CheckoutSuccesComponent } from './checkout-succes/checkout-succes.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';

const routes = [
  {path: '', component: CheckoutComponent},
  {path: 'pay', component: CheckoutPaymentComponent},
  {path: ':id', component: CheckoutSuccesComponent, data: {breadcrumb: 'Спасибо'}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
