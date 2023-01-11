import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PublicUser } from '../interfaces/public-user.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private readonly currentUser$: BehaviorSubject<PublicUser | null> =
    new BehaviorSubject<PublicUser | null>(null);

  // Current User
  public set currentUser(user: PublicUser | null) {
    this.currentUser$.next(user);
  }

  public get currentUserObservable(): Observable<PublicUser | null> {
    return this.currentUser$.asObservable();
  }
}
