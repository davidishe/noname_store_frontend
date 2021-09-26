import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProduct } from 'src/app/shared/models/products/product';
import { environment } from 'src/environments/environment';
import { IPagination, Pagination } from 'src/app/shared/models/pagination';
import { map } from 'rxjs/operators';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { of } from 'rxjs';

@Injectable()

export class ShopService {

  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();

  constructor(private http: HttpClient) {}

  getAllProducts(useCache?: boolean) {

    this.getShopParams();

    // if nocache scenaro used delete products from this.products
    if (useCache === false) {
      this.products = [];
    }

    // check if cache scenario is activated
    if (useCache === true && this.products.length > 0) {

      const pageReceived = Math.ceil(this.products.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber < pageReceived) {

        if (this.shopParams.pageNumber === 0) {
          this.pagination.data =
            this.products.slice(this.shopParams.pageNumber, this.shopParams.pageSize);
        } else {
          this.pagination.data =
            this.products.slice((this.shopParams.pageNumber * this.shopParams.pageSize),
              (this.shopParams.pageNumber * this.shopParams.pageSize) + this.shopParams.pageSize);
        }

        return of(this.pagination);
      }
    }

    // if nocache scenaro used user params in query
    const params = this.calculateParams();

    return this.http.get<IPagination>(this.baseUrl + 'products/all/', {observe: 'response', params})
      .pipe(
        map(response => {
          this.products = [...this.products, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
        })
      );

  }

  getProductsForAdmin(useCache?: boolean) {

    this.getShopParams();

    const params = this.calculateParams();

    return this.http.get<IPagination>(this.baseUrl + 'products/all/admin', {observe: 'response', params})
      .pipe(
        map(response => {
          this.products = [...this.products, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
        })
      );

  }

  calculateParams(): HttpParams {
    let params = new HttpParams();

    if (this.shopParams.regionIdSelected !== 0) {
      params = params.append('regionId', this.shopParams.regionIdSelected.toString());
    }
    if (this.shopParams.typeIdSelected !== 0) {
      params = params.append('typeId', this.shopParams.typeIdSelected.toString());
    }
    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sortSelected);
    params = params.append('pageIndex', (this.shopParams.pageNumber).toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    return params;
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProductById(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product);
    }
    return this.http.get(this.baseUrl + 'products/product/?id=' + id);
  }

  getProductByGuId(guId: number) {
    const product = this.products.find(p => p.guId === guId);
    if (product) {
      return of(product);
    }
    return this.http.get(this.baseUrl + 'products/getproductid/?guId=' + guId);
  }

}
