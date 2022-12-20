import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Notification } from '../interfaces/notification.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification> {
    return this.http.get<Notification>(`${this.API_URL}/get-notifications`);
  }
}
