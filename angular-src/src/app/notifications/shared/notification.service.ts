import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  baseUrl: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = configService.baseUrl();
  }

  getHeaders(token: any) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  }

  getNotifications(): Observable<any[]> {
    return this.http.get(this.baseUrl + '/notifications').map((res: any[]) => res);
  }

  getNotificationById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/notifications/' + id).map((res: any) => res);
  }

  updateNotificationById(notificationId: string, object: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.put(this.baseUrl + '/notifications/' + notificationId, object, headers).map((res: any) => res);
  }

  createNewNotification(notification: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.post(this.baseUrl + '/notifications', notification, headers).map((res: any) => res);
  }

  deleteNotificationById(notificationId: string) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.delete(this.baseUrl + '/notifications/' + notificationId, headers).map((res: any) => res);
  }
}
