import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CoreModule } from '../../core/core.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutSuccesComponent } from './checkout-succes/checkout-succes.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutRbkComponent } from './checkout-rbk/checkout-rbk.component';
import { DadataAddressComponent } from '../../kit/dadata-address/dadata-address.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutSuccesComponent,
    CheckoutRbkComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CheckoutModule { }
