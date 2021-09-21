import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export class BusyService {


  private statusSource = new BehaviorSubject(null);
  status$ = this.statusSource.asObservable();

  constructor() {
  }


  setLoadingStatus(status: boolean) {
    this.statusSource.next(status);
  }

}
