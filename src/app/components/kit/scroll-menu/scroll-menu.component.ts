import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user/user';
import { AccountService } from '../../layouts/account/account.service';

@Component({
  selector: 'app-scroll-menu',
  templateUrl: './scroll-menu.component.html',
  styleUrls: ['./scroll-menu.component.scss']
})
export class ScrollMenuComponent implements OnInit, AfterViewInit {

  currentUser$: Observable<IUser>;

  constructor(
    public accountService: AccountService,
  ) { }

  @HostListener('window:pointermove', ['$event'])
  onDocumentMousewheelEvent(event): void {
    this.setUserNavMenu();
  }


  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngAfterViewInit(): void {
    this.setUserNavMenu();
  }
  
  setUserNavMenu(): void {
    const userAcc = document.getElementById('userinfo');
    const topMenu = document.getElementById('top_menu');

    // topMenu.style.position = 'absolute';
    const userAccLeft = userAcc.offsetLeft;
    const left = (userAccLeft - 60) + 'px';
    topMenu.style.left = left;
  }

  logout() {
    this.accountService.logout();
  }

}
