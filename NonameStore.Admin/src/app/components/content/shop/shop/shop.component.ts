import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { Subscription } from 'rxjs';
import { ShopService } from 'src/app/services/products/shop.service';
import { IPagination } from 'src/app/shared/models/pagination';
import { TypesService } from 'src/app/services/products/types.service';
import { RegionsService } from 'src/app/services/products/regions.service';
import { IProductType } from 'src/app/shared/models/type';
import { IProductRegion } from 'src/app/shared/models/region';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BasketService } from '../../basket/basket.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit, OnDestroy, AfterViewInit {

  products: IProduct[];
  types: IProductType[];
  regions: IProductRegion[];

  pageEvent: PageEvent;
  decimalPipe = new DecimalPipe(navigator.language);

  shopParams = new ShopParams();
  totalCount: number;
  sub: Subscription;
  pageSizeOptions = [this.shopParams.pageSize, 10, 15];

  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;


  constructor(
    private shopService: ShopService,
    private typesService: TypesService,
    private regionsService: RegionsService,
    private basketService: BasketService

  ) {
    this.shopParams = shopService.getShopParams();
  }



  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
      const shopParams = this.shopService.getShopParams();
      shopParams.pageNumber = this.paginator.pageIndex;
      shopParams.pageSize = this.paginator.pageSize;
      this.shopService.setShopParams(shopParams);
      this.getAllProducts(false);
    });
    }
  }

  ngOnInit() {
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (page > 0) {
        const start = (page) * pageSize;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
      }

      if (page === 0) {
        const start = 1;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
      }


    };

    this.getAllProducts(false);
    this.getAllRegions();
    this.getAllTypes();
    this.translateMatPaginator();

  }

  getAllProducts(useCache: boolean) {
    this.sub = this.shopService.getAllProducts(useCache).subscribe((response: IPagination) => {
      this.products = response.data;
      this.totalCount = response.count;
      this.paginator.pageSize = response.pageSize;
      this.shopParams.pageSize = this.paginator.pageSize;

      for (const p of this.products) {
        if (this.basketService.isProductInBasket(p.id)) {
          p.isSelected = true;
        }
      }

    }, error => {
      console.log(error);
    });
  }

  translateMatPaginator() {
      this.paginator._intl.itemsPerPageLabel = 'Продуктов на странице ';
  }

  handlePage(e: any) {

    console.log(this.paginator.pageSize);
    this.shopParams.pageNumber = 0;
    this.shopParams.pageSize = this.paginator.pageSize;

    this.shopService.setShopParams(this.shopParams);
    this.getAllProducts(false);
  }

  onRegionSelected(regionId: number) {
    const params = this.shopService.getShopParams();
    if (regionId !== params.regionIdSelected) {
      params.regionIdSelected = regionId;
    } else {
      params.regionIdSelected = 0;
    }
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getAllProducts(false);
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    if (typeId !== params.typeIdSelected) {
      params.typeIdSelected = typeId;
    } else {
      params.typeIdSelected = 0;
    }
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getAllProducts(false);
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sortSelected = sort;
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getAllProducts(false);
  }

  onSearch() {

    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getAllProducts(false);
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.searchTerm.nativeElement.value = '';

    const params = new ShopParams();
    params.search = undefined;
    this.shopService.setShopParams(params);
    console.log(this.searchTerm.nativeElement.value);
    this.getAllProducts(false);
    this.shopParams = this.shopService.getShopParams();

  }

  getAllTypes() {
    this.sub = this.typesService.GetAllTypes().subscribe((response) => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

  getAllRegions() {
    this.sub = this.regionsService.GetAllRegions().subscribe((response) => {
      this.regions = response;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // addItemToBasket(product: IProduct) {
  //   this.basketService.addItemToBasket(product, 1);
  //   product.isSelected = true;
  // }

  // removeItemFromBasket(product: IProduct) {
  //   this.basketService.removeItemFromBasket(product);
  //   product.isSelected = false;
  // }

}
