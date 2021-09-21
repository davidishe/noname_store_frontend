import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProductType } from 'src/app/shared/models/type';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class TypesService {

  baseUrl = environment.apiUrl;
  types: IProductType[] = [];



  constructor(private http: HttpClient) { }

  GetAllTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return this.types;
      })
    );
  }

  Create(productType: IProductType) {
    return this.http.post(this.baseUrl + 'products/create-type', productType);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'get-item/?id=' + id);
  }

  Update(productType: IProductType) {
    return this.http.post(this.baseUrl + 'update-item', productType);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete-item/?id=' + id);
  }


}
