import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../interfaces/responseData.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IBasket } from '../interfaces/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  public getCourses(): Observable<ResponseDTO<IBasket[]>> {
    return this.http.get<ResponseDTO<IBasket[]>>(`${this.API_URL}/admin/basket/list`)
  }
}
