import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  display: string = null;
  title: string = null;

  private tabIndexSource = new BehaviorSubject<number>(null);
  tabIndex$ = this.tabIndexSource.asObservable();

  constructor() { }



  toogle(value: number) {
    console.log('toogle');
    this.tabIndexSource.next(value);
  }

  setIndex(event: any) {
    console.log(event);
    this.tabIndexSource.next(event);
  }


}
