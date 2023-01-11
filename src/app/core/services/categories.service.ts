import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from "rxjs";
import { Categories } from '../interfaces/categories.interface';
import { ResponseDTO } from '../interfaces/responseData.interface';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // GET
  getCategories(){
    return this.http.get<Categories[]>(`${this.API_URL}/categories`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  // GET BY ID
  getCategoryById(id: number): Observable<ResponseDTO<Categories>>{
    return this.http.get<ResponseDTO<Categories>>(`${this.API_URL}/category/${id}`);
  }

  // POST
  createCategory(body: any): Observable<ResponseDTO<any>>{
    return this.http.post<ResponseDTO<any>>(`${this.API_URL}/categories/create`, body);
  }

  // POST
  updateCategory(body: any){
    return this.http.post(`${this.API_URL}/categories/update`, body);
  }

  // DELETE
  deleteCategoryById(id: number): Observable<any>{
    return this.http.delete<any>(`${this.API_URL}/categories/delete/${id}`,{});
  }
}
