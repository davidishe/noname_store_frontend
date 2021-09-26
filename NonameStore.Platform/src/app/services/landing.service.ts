import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../shared/models/products/product';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LandingService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetAllProdcutsForLanding() {
    return this.http.get<any>(this.baseUrl + 'landing/get-items/');
  }



}
