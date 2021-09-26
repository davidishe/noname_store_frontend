import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../layouts/account/account.service';

@Injectable({
  providedIn: 'root'
})

export class OrderGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  canActivate(): boolean {
    if (this.accountService.logedIn()) {
      return true;
    }

    this.openSnackBar('😉 сначала авторизуйся');
    this.router.navigate(['login']);
    return false;

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
