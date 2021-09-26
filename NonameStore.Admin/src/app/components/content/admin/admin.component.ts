import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';


declare var FB: any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  // facebookAuthResult: FacebookAuthResult;
  isLogined: boolean;


  constructor(
    private breadcrumbService: BreadcrumbService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.set('@productDetails', 'Админ');

  }


  ngAfterViewInit(): void {

  }


}


