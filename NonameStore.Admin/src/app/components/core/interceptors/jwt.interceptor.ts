import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {





    const token = localStorage.getItem('garden-app-token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + token
        }
      });
      req.headers.append('Access-Control-Allow-Origin', '*');
      req.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      return next.handle(req);
    }
    req.headers.append('Access-Control-Allow-Origin', '*');
    req.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return next.handle(req);
  }
}
