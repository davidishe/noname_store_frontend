import { Component, HostListener, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/infrastructure/address.service';
import { IDaDataAdress } from 'src/app/shared/models/user/address';
import {Observable} from 'rxjs';
import {map, startWith, timeout} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dadata-address',
  templateUrl: './dadata-address.component.html',
  styleUrls: ['./dadata-address.component.scss']
})
export class DadataAddressComponent implements OnInit {

  addressForm: FormGroup;
  addressControl = new FormControl();
  addresses: string[] = ['ивановская', 'петровская', 'ивантеевская'];
  filteredOptions: Observable<string[]>;

  constructor(
    private addressService: AddressService
  ) { }


  ngOnInit() {

    // this.addressForm = new FormGroup({
    //   addressControl: new FormControl()
    // });

    this.filteredOptions = this.addressControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  // onAddressInputChange() {
    
  // }


  suggestAddress(address: string) {
    console.log(this.addressControl.value);
    this.addressService.getAddress(address).subscribe((response: IDaDataAdress) => {
      this.addresses = [];
      this.addresses = ['111111', '222222222', '333333'];

      // this.addresses = response.value;
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.addresses.filter(option => option.toLowerCase().includes(filterValue));
  }

}





