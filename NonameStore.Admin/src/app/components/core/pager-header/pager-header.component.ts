import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';

@Component({
  selector: 'app-pager-header',
  templateUrl: './pager-header.component.html',
  styleUrls: ['./pager-header.component.scss']
})
export class PagerHeaderComponent implements OnInit {
  @Input() products: IProduct[];
  @Input() totalCount: number;

  constructor() { }

  ngOnInit() {
  }

}
