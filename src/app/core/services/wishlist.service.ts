import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../interfaces/responseData.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IWishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  public getCourses(): Observable<ResponseDTO<IWishlist[]>> {
    
    return this.http.get<ResponseDTO<IWishlist[]>>(`${this.API_URL}/admin/wish/list`)
  }
}
