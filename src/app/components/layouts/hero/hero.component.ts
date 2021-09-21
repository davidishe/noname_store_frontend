import { Component, OnInit, ChangeDetectorRef, AfterViewInit, HostListener } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { ShopService } from 'src/app/services/products/shop.service';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { BusyService } from 'src/app/services/infrastructure/busy.service';
import { BasketService } from '../../content/basket/basket.service';
import { CarouselConfig } from 'ng-carousel-cdk/lib/carousel-config';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit {


  userId = +localStorage.getItem('userId');
  products: IProduct[];
  shopParams = new ShopParams();



  constructor(
    public basketService: BasketService,
    private shopService: ShopService,
    public busyService: BusyService,
    private cdr: ChangeDetectorRef
  ) {  }


  ngOnInit(): void {


    this.getAllProdcutsForMainPage();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    // this.busyService.isLoading(true);
  }




  getAllProdcutsForMainPage(): void {
    this.shopService.getAllProducts().subscribe((response: any) => {
      this.products = response.data;

      for (const p of this.products) {
        if (this.basketService.isProductInBasket(p.id)) {
          p.isSelected = true;
        }
      }



    }, error => {
      console.log(error);
    });
  }




  addItemToBasket(product: IProduct) {
    this.basketService.addItemToBasket(product, 1);
    product.isSelected = true;
  }

  removeItemFromBasket(product: IProduct) {
    this.basketService.removeItemFromBasket(product);
    product.isSelected = false;
  }


}
