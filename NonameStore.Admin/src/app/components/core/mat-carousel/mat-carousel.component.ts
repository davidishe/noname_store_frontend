import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-carousel',
  templateUrl: './mat-carousel.component.html',
  styleUrls: ['./mat-carousel.component.scss']
})
export class MatCarouselComponent implements OnInit {

  items: Array<any> = [];
  today: Date = new Date();
  width: number;

  constructor() { }

  ngOnInit(): void {
    this.initCarouselItems();
    this.width = window.innerWidth;
    this.calculateCarouselWidth();
  }

  @HostListener('window:resize') calculateCarouselWidth(): void {
    this.width = window.innerWidth;
  }


  initCarouselItems(): void {
    this.items = [
        { title: '11Стандартный товар', path: 'product_header_0.png', enrolledDate: this.today},
        { title: 'Набор товаров', path: 'product_header_1.png', enrolledDate: this.today},
        { title: 'Продукт', path: 'product_header_2.png', enrolledDate: this.today},
        { title: 'Товар в коробке', path: 'product_header_1.png', enrolledDate: this.today},
        { title: 'Стандартный товар', path: 'product_header_0.png', enrolledDate: this.today},
        { title: 'Набор товаров', path: 'product_header_1.png', enrolledDate: this.today},
        { title: 'Продукт', path: 'product_header_2.png', enrolledDate: this.today},
        { title: '0', path: 'product_header_1.png', enrolledDate: this.today},
        { title: '1', path: 'product_header_0.png', enrolledDate: this.today},
        // { title: '2', path: 'product_header_1.png', enrolledDate: this.today},
        // { title: '3', path: 'product_header_2.png', enrolledDate: this.today},
        // { title: 'Last', path: 'product_header_1.png', enrolledDate: this.today},
    ];

  }


}
