import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  constructor(private httpClient:HttpClient) { }
  public getCourse(id: number): Observable<any> {
    return this.httpClient.get(`${API_URL}/admin/course/${id}`);
  }
  public approveCourse(id: number,status:number,text?):Observable<any>{
    return this.httpClient.post(`${API_URL}/update-status/${id}`,{
      status: status,
      declined_reason :text
    })
  }
}
