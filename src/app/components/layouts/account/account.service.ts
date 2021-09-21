import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/shared/models/user/user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAddress } from 'src/app/shared/models/user/address';
import { ExternalAuthResult } from 'src/app/shared/models/user/externalAuthResult';

@Injectable({providedIn: 'root'})

export class AccountService {

  baseUrl = environment.authUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();
  redirectUrl = environment.redirectUrl;


  userId: number;
  decodedToken: any;

  currentUser: IUser = {
    email: ''
  };


  constructor(
    public http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(values: any) {
    return this.http.post<any>(this.baseUrl + 'login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<any>(this.baseUrl + 'register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.currentUserSource.next(user);
          this.router.navigateByUrl('/shop');
        }
      }, err => {
        console.log(err);
      })
    );
  }

  logout() {
    localStorage.removeItem('garden-app-token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
    this.openSnackBar('до новой встречи ))');
  }

  checkEmailExists(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email);
  }

  loadCurrentUser() {
    return this.http.get(this.baseUrl + 'current').pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.currentUserSource.next(user);
          const isAdmin = this.checkAdminRights();
          console.log(isAdmin);
          
        }
      })
    );
  }

  checkAdminRights(): boolean {
    const user = this.getCurrentUserValue();
    if (user && user.roles) {
      for (let i = 0; i < user.roles.length; i++) {
      const role = user.roles[i];
      if (role === 'Admin') {
        return true;
      }
    }
    }
    return false;
  }

  getCurrentUserValue() {
    return this.currentUserSource.value;
  }

  getFacebookAccessToken(code: string) {
    return this.http.get(this.baseUrl + 'facebook/tokenget?code=' + code);
  }

  getGoogleAccessToken(code: string) {
    return this.http.get(this.baseUrl + 'google/tokenget?code=' + code);
  }

  signInFacebook() {
    // const redirectUrl = 'https://localhost:4200/account';
    const clientId = '359920132083502';
    window.location.href = 'https://www.facebook.com/v8.0/dialog/oauth?client_id=' + clientId + '&redirect_uri=' + this.redirectUrl;
  }

  signInGoogle() {
    // const redirectUrl = 'https://localhost:4200/account';
    const clientId = '263769089352-26v7o8794c42njl3u591acssfsuo0th3.apps.googleusercontent.com';
    const state = '123123123123123123123';
    const googleBaseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const googleParams = '?scope=openid%20profile%20email&access_type=offline&include_granted_scopes=true&response_type=code&state=';
    const googleUrl = googleBaseUrl + googleParams + state + '&redirect_uri=' + this.redirectUrl +  '&client_id=' + clientId;
    window.location.href = googleUrl;

    // scope=openid%%20email

  }


  authorize(user: any) {
    return this.http.post<any>(this.baseUrl + 'register', user)
      .pipe(
        map((response: any) => {
        if (response) {
          console.log(response);
          this.login(user);
        }
      })
    );
  }

  logedIn() {
    this.userId = + localStorage.getItem('userId');
    return true;
  }

  authenticateWithFacebook(authToken: string) {
    return this.http.post(this.baseUrl + 'auth/facebook?accessToken=' + authToken, null).pipe(
      map((res: ExternalAuthResult) => {
        localStorage.setItem('garden-app-token', res.token);
        this.currentUserSource.next(res.user);
        this.router.navigateByUrl('/shop');
        return res;
      })
    );
  }

  authenticateWithGoogle(authToken: string) {
    return this.http.post(this.baseUrl + 'google/auth?accessToken=' + authToken, null).pipe(
      map((res: any) => {
        localStorage.setItem('garden-app-token', res.token);
        this.currentUserSource.next(res.user);
        this.router.navigateByUrl('/shop');
        return res;
      })
    );
  }

  checkEmailNotTaken(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

  getUserAddress() {
    return this.http.get(this.baseUrl + 'address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'address', address);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }


}

