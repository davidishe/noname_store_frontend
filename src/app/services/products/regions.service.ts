import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IProductRegion } from 'src/app/shared/models/region';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()

export class RegionsService {


  baseUrl = environment.apiUrl;
  regions: IProductRegion[] = [];

  constructor(private http: HttpClient) { }

  GetAllRegions() {
    if (this.regions.length > 0) {
      return of(this.regions);
    }
    return this.http.get<any>(this.baseUrl + 'products/regions').pipe(
      map(response => {
        this.regions = response;
        return response;
      })
    );
  }

  Create(productRegion: IProductRegion) {
    return this.http.post(this.baseUrl + 'products/create-region', productRegion);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'get-item/?id=' + id);
  }

  Update(productRegion: IProductRegion) {
    return this.http.post(this.baseUrl + 'update-item', productRegion);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete-item/?id=' + id);
  }

}
