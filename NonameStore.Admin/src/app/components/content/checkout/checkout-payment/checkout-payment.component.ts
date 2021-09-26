import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { IBasket } from 'src/app/shared/models/basket';
import { MatAccordion } from '@angular/material/expansion';
import { MatStepper } from '@angular/material/stepper';
import { PaymentMethod } from 'src/app/shared/models/orders/paymentMethod';



@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit, OnDestroy {

  @Input() checkoutFormGroup: FormGroup;
  @Input() basket: IBasket;
  @Input() stepper: MatStepper;


  checkout: FormGroup;
  orderTotal: number;
  paymentMethod: PaymentMethod;

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService,
    private snackBar: MatSnackBar,
    // private router: Router,
) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy() {

  }

  moveToStep(index: number) {
    this.stepper.selectedIndex = index;
  }



  async createOrder(basket: IBasket, method: string) {

    // this.paymentMethod = PaymentMethod.paymentOnline;  // !!!!

    if (method === 'paymentOnline') {
      this.paymentMethod = PaymentMethod.paymentOnline;
    }

    if (method === 'paymentCash') {
      this.paymentMethod = PaymentMethod.paymentCash;
    }

    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).toPromise();

    if (method === 'paymentOnline') {
      this.basketService.deleteBasket(basket);
      window.location.href = basket.confirmationUrl;
    }

    if (method === 'paymentCash') {
      this.basketService.deleteBasket(basket);
      window.location.href = 'https://localhost:4200/orders';
    }

  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutFormGroup.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutFormGroup.get('addressForm').value,
      paymentMethod: this.paymentMethod
    };
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}

