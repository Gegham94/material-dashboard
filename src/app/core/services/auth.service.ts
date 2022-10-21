import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  API_URL = environment.API_URL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('currentUser') as string),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public updateCurrentUserValue(value: any): void {
    this.currentUserSubject.next(value);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject?.value;
  }

  login(body: any) {
    return this.http
      .post<any>(`${this.API_URL}/login`, body, {
        headers: this.headers,
      })
      .pipe(
        map((response: any) => {
          if (response && response.data.auth_key) {
            const data = {
              auth_key: response.data.auth_key,
              first_name: response.data.employee_information.first_name,
              last_name: response.data.employee_information.last_name,
              email: response.data.employee_information.email,
            };
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(response.data.employee_information);
          }
          return response;
        }),
      );
  }

  logout() {
    return this.http.post<any>(`${this.API_URL}/logout`, {}).pipe(
      map((response: any) => {
        if (response && response.success === true) {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
        return response;
      }),
    );
  }

  resetPassword(body: string) {
    return this.http.post<any>(`${this.API_URL}/reset-password`, body, {
      headers: this.headers,
    });
  }
}
