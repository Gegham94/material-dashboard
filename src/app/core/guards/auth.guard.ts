import { PublicUser } from './../interfaces/public-user.interface';
import { GlobalService } from './../services/global.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  public currentUser: PublicUser;

  constructor(
    private router: Router,
    private readonly globalService: GlobalService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
    if (this.currentUser) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
