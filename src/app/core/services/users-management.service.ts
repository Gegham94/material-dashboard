import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AdminModerator } from "../interfaces/admin-moderator.interface";

import { environment } from "src/environments/environment";
import { ResponseDTO } from "../interfaces/responseData.interface";
import { tap } from "rxjs";

const API_URL = environment.API_URL;
const headers = new HttpHeaders({ "Content-Type": "application/json" });

@Injectable({
  providedIn: "root",
})
export class UsersManagementService {
  constructor(private http: HttpClient) {}

  public createUser(data: AdminModerator) {
    return this.http
      .post<ResponseDTO<AdminModerator>>(`${API_URL}/user/create`, data, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
}
