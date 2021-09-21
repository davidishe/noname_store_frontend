import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/components/layouts/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {

  @Input() checkoutFormGroup: FormGroup;
  visible: boolean = true;

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

  saveUserAddress() {
    if (this.checkoutFormGroup.get('addressForm').touched
        && !this.checkoutFormGroup.get('addressForm').pristine
    ) {
      this.accountService.updateUserAddress(this.checkoutFormGroup.get('addressForm').value).subscribe(() => {
        this.openSnackBar('Адрес сохранен!');
        this.checkoutFormGroup.get('addressForm').markAsUntouched();
      },
      error => {
        console.log(error);
        this.openSnackBar('Не получилось!');
      });
    }

  }


}
