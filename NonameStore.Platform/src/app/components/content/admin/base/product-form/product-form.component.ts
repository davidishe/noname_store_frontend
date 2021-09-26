import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct, IProductToCreate } from 'src/app/shared/models/products/product';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from 'src/app/services/products/shop.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  isAdding: boolean;
  isUpdating: boolean;
  formLandingItems: FormGroup;
  title: string;

  product: IProductToCreate;
  products: IProduct[];
  productId: number;


  constructor(
    private breadcrumbService: BreadcrumbService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) { }

  ngOnInit() {

    this.breadcrumbService.set('@productDetails', '');

    this.onFormInit();
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.productId > 0) {
      this.isUpdating = true;
      this.getProductById(this.productId);
    } else {
      this.isAdding = true;
    }

  }

  onFormInit() {
    this.formLandingItems = new FormGroup({
      inputProductTitle: new FormControl(null),
      inputProductPrice: new FormControl(null),
      inputProductRegion: new FormControl(null),
      inputProductType: new FormControl(null),
      inputQuantity: new FormControl(null),
      inputDescription: new FormControl(null)
    });
  }

  getProductById(productId: number) {
      this.shopService.getProductById(productId).subscribe((response: any) => {
          this.product = response;
          this.goToUpdate(this.product);
      }
    );
  }

  addProduct() {
    this.title = 'Новый продукт';
    if (this.formLandingItems.invalid) {
      console.log(this.formLandingItems.controls.inputLogin.errors);
      return;
    } else {
      this.product = {
        name: this.formLandingItems.controls.inputProductTitle.value,
        price: this.formLandingItems.controls.inputProductPrice.value,
        pictureUrl: '',
        description: this.formLandingItems.controls.inputDescription.value,
        productTypeId: this.formLandingItems.controls.inputProductType.value,
        productRegionId: this.formLandingItems.controls.inputProductRegion.value,
        quantity: this.formLandingItems.controls.inputQuantity.value,
      };

      this.adminService.createProduct(this.product).subscribe((product: IProduct) => {
        this.openSnackBar('🤗 запись добавлена');
        // this.products.push(product);
        // this.products.sort((a, b) => {
        // const dateA = new Date(a.enrolledDate).getTime();
        // const dateB = new Date(b.enrolledDate).getTime();
        // return dateB - dateA;
        // });
        this.router.navigate(['admin/products']);

      }, error => {
        console.log(error);
        this.openSnackBar('🙁 что-то пошло не так!');
      });

    }
  }

  onProductUpdate(product: IProductToCreate) {
    this.product.name = this.formLandingItems.controls.inputProductTitle.value;
    this.product.quantity = this.formLandingItems.controls.inputQuantity.value;
    this.product.description = this.formLandingItems.controls.inputDescription.value;
    this.product.price = this.formLandingItems.controls.inputProductPrice.value;
    this.product.productRegionId = this.formLandingItems.controls.inputProductRegion.value;
    this.product.productTypeId = this.formLandingItems.controls.inputProductType.value;

    this.adminService.updateProduct(this.product).subscribe((response: any) => {
      this.isUpdating = false;
      this.router.navigate(['admin/products']);
    });
  }

  goToUpdate(product: IProductToCreate) {
    this.formLandingItems.reset();
    this.product = product;
    this.isUpdating = true;
    this.title = 'Обновление продукта';

    this.formLandingItems.controls.inputProductTitle.patchValue(product.name);
    this.formLandingItems.controls.inputQuantity.patchValue(product.quantity);
    this.formLandingItems.controls.inputDescription.patchValue(product.description);
    this.formLandingItems.controls.inputProductPrice.patchValue(product.price);
    this.formLandingItems.get('inputProductType').setValue(product.productTypeId.toString());
    this.formLandingItems.get('inputProductRegion').setValue (this.product.productTypeId.toString());
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
