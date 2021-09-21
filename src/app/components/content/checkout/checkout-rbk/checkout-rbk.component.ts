import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { IBasket } from 'src/app/shared/models/basket';
import { PaymentMethod } from 'src/app/shared/models/orders/paymentMethod';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-rbk',
  templateUrl: './checkout-rbk.component.html',
  styleUrls: ['./checkout-rbk.component.scss']
})
export class CheckoutRbkComponent implements OnInit {

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
      window.location.href = basket.confirmationUrl;
    }

    if (method === 'paymentCash') {
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
