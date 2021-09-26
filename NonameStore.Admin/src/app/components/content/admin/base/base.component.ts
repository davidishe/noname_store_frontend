import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IProduct, IProductToCreate } from 'src/app/shared/models/products/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ShopService } from 'src/app/services/products/shop.service';
import { Subscription } from 'rxjs';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPagination } from 'src/app/shared/models/pagination';
import { DecimalPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { IProductType } from 'src/app/shared/models/type';
import { IProductRegion } from 'src/app/shared/models/region';
import { TypesService } from 'src/app/services/products/types.service';
import { RegionsService } from 'src/app/services/products/regions.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {



  product: IProductToCreate;
  products: IProduct[];

  progress: boolean;
  pageEvent: PageEvent;

  formData = new FormData();


  types: IProductType[];
  regions: IProductRegion[];

  displayedColumns: string[] = [ 'productImage', 'productTitle', 'productPrice'];

  isLoading: boolean;
  isNoPicture: boolean;
  noProducts: boolean;

  decimalPipe = new DecimalPipe(navigator.language);

  shopParams = new ShopParams();
  totalCount: number;
  paginatorSub: Subscription;
  getAllSub: Subscription;
  sub: Subscription;

  pageSizeOptions = [this.shopParams.pageSize, 10, 15];
  baseUrl = environment.apiUrl;


  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private shopService: ShopService,
    private typesService: TypesService,
    private regionsService: RegionsService,
    private breadcrumbService: BreadcrumbService,
  ) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@products', 'Продукты');

    this.getAllProducts(false);
    this.getAllRegions();
    this.getAllTypes();
    this.translateMatPaginator();
  }

  ngAfterViewInit(): void {

    if (this.paginator) {
      this.paginatorSub = this.paginator.page.subscribe(() => {
        const shopParams = this.shopService.getShopParams();
        shopParams.pageNumber = this.paginator.pageIndex;
        shopParams.pageSize = this.paginator.pageSize;
        this.shopService.setShopParams(shopParams);
        this.getAllProducts(true);
    });
    }
  }

  initPaginatorParameters(): void {
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
  }

  getAllProducts(useCache: boolean): void {
    this.isLoading = true;

    this.getAllSub = this.shopService.getProductsForAdmin(useCache).subscribe((response: IPagination) => {
      this.products = response.data;
      this.totalCount = response.count;
      this.shopParams.pageSize = response.pageSize;

      this.isLoading = false;
      if (this.totalCount === 0) {
        this.noProducts = true;
      } else {
        this.noProducts = false;
      }

    }, error => {
      console.log(error);
    });
  }

  translateMatPaginator() {
      this.paginator._intl.itemsPerPageLabel = 'Продуктов на странице ';
  }

  onImageUpload(files, product) {

    if (files.length === 0) { return; }
    this.products.filter(z => z.id === product.id)[0].pictureUrl = '';
    const fileToUpload = files[0] as File;
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.progress = true;

    this.adminService.addProductPhoto(product, this.formData).subscribe((res: IProduct) => {
      this.products.filter(z => z.id === product.id)[0].pictureUrl = res.pictureUrl;
      this.progress = false;
      this.formData.delete('file');
      files = [];

    });
  }

  onProductIsSale(product: IProduct) {
    if (!product.pictureUrl) {
      this.openSnackBar('Сначала добавь картинку');
    } else {
    this.adminService.setProductIsSale(product.id.toString()).subscribe((response: any) => {
      if (response === 205) {
        this.products.filter(z => z.id === product.id)[0].isSale = !this.products.filter(z => z.id === product.id)[0].isSale;
      }
    });
    }
  }

  // handlePage(e: any) {
    
  //   this.shopParams.pageNumber = 0;
  //   this.shopParams.pageSize = this.paginator.pageSize;
  //   this.shopService.setShopParams(this.shopParams);
  //   this.getAllProducts(false);
  // }

  onProductDelete(productId: any) {
    this.products = this.products.filter(z => z.id !== productId);

    this.adminService.deleteProduct(productId).subscribe(response => {
      console.log(response);
      if (response !== 202) {
        this.openSnackBar('Ошибка при удалении');
      }

      if (this.products.length === 0) {
        this.getAllProducts(false);
      }
    });
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

  ngOnDestroy(): void {
    this.getAllSub.unsubscribe();
    this.paginatorSub.unsubscribe();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
