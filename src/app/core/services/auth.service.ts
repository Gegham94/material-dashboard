import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { ResponseDTO } from '../interfaces/responseData.interface';
import { Login, User } from '../interfaces/login.interface';
import { UserType } from '../enums/user-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
    ) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('currentUser') as string),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public updateCurrentUserValue(value: User | null): void {
    this.currentUserSubject.next(value);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  login(body: Login) {
    return this.http.post<ResponseDTO<User>>(`${this.API_URL}/login`, body)
      .pipe(map((response: ResponseDTO<User>) => {
        if (response.success === true) {
          if (response.data.role_id === UserType.ADMINISTRATOR || response.data.role_id === UserType.MODERATOR) {
            const data = {
              id: response.data.id,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              email: response.data.email,
              role_id: response.data.role_id,
              company_name: response.data.company_name,
              tax_identity_number: response.data.tax_identity_number,
              api_token: response.data.api_token
            };
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(response.data);
            return response;
          } else {
            return {
              success: false,
              data: null,
              errors: this.translateService.instant('auth.login.incorrect-login'),
            }
          }
        }
        // return response;
      }),
    );
  }

  logout() {
    return this.http.post<ResponseDTO<[]>>(`${this.API_URL}/logout`, {}).pipe(
      map((response: ResponseDTO<[]>) => {
        if (response && response.success === true) {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
        return response;
      }),
    );
  }
}
