import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, AfterViewChecked, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavService } from 'src/app/services/side-nav.service';
import { Subscription, Observable } from 'rxjs';
import { BasketService } from '../../content/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { AccountService } from '../account/account.service';
import { IUser } from 'src/app/shared/models/user/user';
import { BusyService } from 'src/app/services/infrastructure/busy.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  currentUser$: Observable<IUser>;

  visibility = true;
  username: string;
  sub: Subscription;
  basket$: Observable<IBasket>;
  status$: Observable<boolean>;
  scrollMenuVisibilitty: boolean = true;

  @HostListener('window:click', ['$event'])
  onCloseTopMenu(event): void {
    if (!event.target.className.includes('identity')) {
      this.scrollMenuVisibilitty = true;
    }
  }


  constructor(
    public sideNavService: SideNavService,
    public busyService: BusyService,
    private basketService: BasketService,
    public accountService: AccountService,
    private cdr: ChangeDetectorRef,

  ) {  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.status$ = this.busyService.status$;
    this.currentUser$ = this.accountService.currentUser$;
    
  }




  ngAfterViewInit() {
    // this.busyService.isLoading(true);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }


  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }


  toggle() {
    this.visibility = !this.visibility;
  }



}
