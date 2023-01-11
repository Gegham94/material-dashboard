import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination } from '../interfaces/pagination';
import { ResponseDTO } from '../interfaces/responseData.interface';
import { Trainers } from '../interfaces/trainers';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }


  public getTrainers(data: Pagination): Observable<ResponseDTO<Trainers[]>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', data.page);
    queryParams = queryParams.append('limit', data.limit);
    return this.http.get<ResponseDTO<Trainers[]>>(`${this.API_URL}/trainer/list`, {params: queryParams});
  }

  public getTrainerById(id: number): Observable<ResponseDTO<Trainers>> {
    return this.http.get<ResponseDTO<Trainers>>(`${this.API_URL}/trainer/${id}`)
  }
}
