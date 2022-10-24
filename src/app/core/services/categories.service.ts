import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // GET
  getCategories(){
    return this.http.get(`${this.API_URL}`)
  }
  getCategoryById(id: any){
    return this.http.get(`${this.API_URL}`)
  }

  // PUT
  editCategory(body: any){
    return this.http.put(`${this.API_URL}`, body)
  }

  // POST
  createCategory(body: any){
    this.http.post(`${this.API_URL}`, body)
  }

  // DELETE
  deleteCategory(id: any){
    return this.http.get(`${this.API_URL}`)
  }
}
