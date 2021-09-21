import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  ERROR: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }


  get404error() {
    this.http.get(this.baseUrl + 'buggs/notfound').subscribe((response: any) => {
      console.log(response);
      this.ERROR = response.error.message;
    }, error => {
      console.log(error);
    });
  }

  get500error() {
    this.http.get(this.baseUrl + 'buggs/servererror').subscribe((response: any) => {
      console.log(response);
      this.ERROR = response.error.message;
    }, error => {
      console.log(error);
    });
  }

    get400error() {
    this.http.get(this.baseUrl + 'buggs/badrequest').subscribe((response: any) => {
      console.log(response);
      this.ERROR = response.error.message;
    }, error => {
      console.log(error);
    });
  }

  get400validationError() {
    this.http.get(this.baseUrl + 'buggs/badrequest/fofofofok').subscribe((response: any) => {
      console.log(response);
      this.ERROR = response.error.message;
    }, error => {
      console.log(error);
    });
  }

}
