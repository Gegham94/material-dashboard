import { ChangePasswordInterface } from './../interfaces/change-password.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { tap } from "rxjs";

const API_URL = environment.API_URL;
const headers = new HttpHeaders({ "Content-Type": "application/json" });

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) {}

  public changePassword(data: ChangePasswordInterface) {
    return this.http
      .post<any>(`${API_URL}/profile/change-password`, data, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

}
