import { PublicUser } from './../interfaces/public-user.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResponseDTO } from '../interfaces/responseData.interface';

import { environment } from "src/environments/environment";
import { tap } from "rxjs";

const API_URL = environment.API_URL;
const headers = new HttpHeaders({ "Content-Type": "application/json" });

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  public editProfile(data: PublicUser) {
    return this.http
      .post<ResponseDTO<PublicUser>>(`${API_URL}/profile/edit`, data, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

}
