import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PublicUser } from "../interfaces/public-user.interface";
import { map } from "rxjs";
import { DeleteUser } from "../interfaces/delete.interface";
import { FilterDTO } from "../interfaces/filterDTO.interface";
import { Filter } from "../interfaces/filter.interface";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  // GET FILTERED USERS
  public getUsers(
    selectedItemsArray: Filter[],
    currentPage: number = 1
  ) {
    let params = new HttpParams().set("page", currentPage!);
    let roleIdList = [];
    if (selectedItemsArray.length !== 0) {
      selectedItemsArray.forEach((elem) => {
        if (elem.key === 'search_text' && elem.value !== '') params = params.append(elem.key, elem.value.trim());
        if (elem.key === 'role_id') roleIdList.push(elem.value);
      });
      if (roleIdList.length > 0) params = params.append('role_id', roleIdList.join(','));
    }
    return this.http
      .get<FilterDTO<PublicUser[]>>(`${this.API_URL}/user/list`, { params })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  // DELETE USER
  public deleteUser(userId: number) {
    return this.http
      .delete<DeleteUser<PublicUser>>(
        `${this.API_URL}/user/${userId}/delete`,
        {}
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
