import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusyService } from 'src/app/services/infrastructure/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private busyService: BusyService,
    private snackBar: MatSnackBar,

  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyService.setLoadingStatus(true);

    if (req.method === 'POST' && req.url.includes('orders')) {
      return next.handle(req);
    }

    if (req.url.includes('suggest')) {
      console.log('intercept');
      this.busyService.setLoadingStatus(false);
      return next.handle(req);
    }

    if (req.url === 'api/account/auth/facebook') {
      return next.handle(req);
    }

    if (!req.url.includes('checkmail') && !req.url.includes('api/address/suggest') && !req.url.includes('api/account/auth/facebook')) {
      return next.handle(req).pipe(
        tap((event) => {
          if (event.type === HttpEventType.Response) {
            if (event.body) {
              this.busyService.setLoadingStatus(false);
            }
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            this.busyService.setLoadingStatus(false);
            console.log(err);
            this.openSnackBar('Произошла ошибка');

          } else {
            this.busyService.setLoadingStatus(false);
          }
          return of(err);
        })
      );
    } else {
      return next.handle(req);
    }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }


}
