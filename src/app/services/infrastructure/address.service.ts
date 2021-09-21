import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDaDataAdress } from 'src/app/shared/models/user/address';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = environment.apiUrl;
  addresses: IDaDataAdress;

  constructor(private http: HttpClient) {}

  getAddress(address: string) {
    return this.http.get(this.baseUrl + 'address/suggest?address=' + address);
  }

}
