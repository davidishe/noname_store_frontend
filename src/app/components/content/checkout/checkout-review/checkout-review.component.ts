import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { BasketService } from '../../basket/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBasket } from 'src/app/shared/models/basket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {

  @Input() basketItems: IProduct[];

  constructor(
    private basketService: BasketService,
    private snackBar: MatSnackBar,
    // private router: Router
  ) { }

  ngOnInit() {
  }

  createPaymentIntent() {
    return this.basketService.createPaymentIntent().subscribe((response: any) => {
        // this.router.navigateByUrl(basket.confirmationUrl);
    }, error => {
      console.log(error);
    });
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
