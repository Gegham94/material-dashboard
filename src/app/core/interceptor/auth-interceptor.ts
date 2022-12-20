import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.api_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.api_token}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap((res: any) => {
          if (res?.body?.success === false) {
            this.authService.updateCurrentUserValue(null);
            return;
          }
        }
      ),
    );
  }
}
