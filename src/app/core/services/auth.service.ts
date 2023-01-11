import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

import { ResponseDTO } from '../interfaces/responseData.interface';
import { Login } from '../interfaces/login.interface';
import { PublicUser } from './../interfaces/public-user.interface';
import { UserType } from '../enums/user-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: PublicUser;

  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private readonly globalService: GlobalService,
  ) {
    this.globalService.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.globalService.currentUserObservable.subscribe((user) => {
      if (user) this.currentUser = user;
    })
  }

  public updateCurrentUserValue(value: PublicUser | null): void {
    this.globalService.currentUser = value;
  }

  login(body: Login) {
    return this.http.post<ResponseDTO<PublicUser>>(`${this.API_URL}/login`, body)
      .pipe(map((response: ResponseDTO<PublicUser>) => {
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
              avatar: response.data.avatar,
              api_token: response.data.api_token
            };
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.globalService.currentUser = response.data;
            return response;
          } else {
            return {
              success: false,
              data: null,
              errors: this.translateService.instant('auth.login.incorrect-login'),
            }
          }
        }
        return response;
      }),
    );
  }

  logout() {
    return this.http.post<ResponseDTO<[]>>(`${this.API_URL}/logout`, {}).pipe(
      map((response: ResponseDTO<[]>) => {
        if (response && response.success === true) {
          localStorage.removeItem('currentUser');
          this.globalService.currentUser = null;
        }
        return response;
      }),
    );
  }
}
