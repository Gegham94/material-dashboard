import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Notification } from '../interfaces/notification.interface';
import { Observable } from 'rxjs';
import { NotificationsInterface, NotificationsUnread } from '../interfaces/notifications';
import { ResponseDTO } from '../interfaces/responseData.interface';
import {ApiResponse} from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  public changeStatus(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/change-notification-status?id=${id}`);
  }

  public getNotifications(): Observable<ResponseDTO<NotificationsInterface[]>> {
    return this.http.get<ResponseDTO<NotificationsInterface[]>>(`${this.API_URL}/get-notifications`);
  }

  public markAsRead() {
    return this.http.post(`${this.API_URL}/mark-as-read`, '');
  }

  public delete(id: number) {
    return this.http.delete(`${this.API_URL}/notification/remove/${id}`);
  }

  public unread(): Observable<NotificationsUnread> {
    return this.http.get<NotificationsUnread>(`${this.API_URL}/get-unread-notifications-count`);
  }

  public getNotificationList() {
    return this.http.get<ResponseDTO<NotificationsInterface[]>>(`${this.API_URL}/get-last-notifications`);
  }
}
