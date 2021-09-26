import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/orders/deliveryMethod';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutFormGroup: FormGroup;
  deliveryMethods: IDeliveryMethod[];


  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService
  ) {
  }

  ngOnInit() {
    this.getDeliveryMethods();
    this.getDeliveryMethodValues();
  }

  getDeliveryMethods() {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
  }

  setShipingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShipingPrice(deliveryMethod);
  }

  getDeliveryMethodValues() {
    const basket = this.basketService.getCurrentBasketValue();
    console.log(basket.deliveryMethodId);
    if (basket.deliveryMethodId !== null) {
      this.checkoutFormGroup.get('deliveryForm').get('deliveryMethod').patchValue(basket.deliveryMethodId.toString());
    }
  }

}
