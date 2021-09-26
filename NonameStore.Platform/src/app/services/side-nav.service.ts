import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

public opened?: boolean = false;

constructor() { }

toggle() {
  this.opened = !this.opened;
}

}
