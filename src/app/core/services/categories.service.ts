import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CategoriesDto } from '../interfaces/categories.interface';
import { Categories } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // GET
  getCategories(){
    return this.http.get<CategoriesDto>(`${this.API_URL}/categories`);
  }

  // GET BY ID
  getCategoryById(id: string){
    return this.http.get<Categories>(`${this.API_URL}/${id}`);
  }

  // POST
  createCategory(body: any){
    return this.http.post(`${this.API_URL}/categories/create`, body);
  }

  // POST
  updateCategory(body: any){
    return this.http.post(`${this.API_URL}/categories/update`, body);
  }

  // DELETE
  deleteCategory(ids: any){
    return this.http.delete(`${this.API_URL}/delete`, ids);
  }
}
