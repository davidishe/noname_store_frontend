import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IBasket } from 'src/app/shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';
import { AccountService } from '../../layouts/account/account.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  icons = ['local_shipping', 'location_on', 'local_offer', 'credit_card', 'assignment_turned_in'];
  stepnames = ['Способ доставки', 'Адрес', 'Подтверждение', 'Оплата', 'Спасибо за заказ'];
  nextBtnNames = ['Выбрать', 'Продолжить', 'Подтвердить', 'Оплатить', ''];
  @ViewChild('appStepper') stepper: MatStepper;


  checkoutFormGroup: FormGroup;
  basket$: Observable<IBasket>;

  constructor(
    private fb: FormBuilder,
    private basketService: BasketService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.basket$ = this.basketService.basket$;
  }

  createCheckoutForm() {
    this.checkoutFormGroup = new FormGroup({
      addressForm: new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        house: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required])
      }),
      deliveryForm: new FormGroup({
        deliveryMethod: new FormControl(null, [Validators.required])
      }),
      paymentForm: new FormGroup({
        nameOnCard: new FormControl(null, [Validators.required])
      }),
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        this.checkoutFormGroup.get('addressForm').patchValue(address);
      }
    });
  }



}
