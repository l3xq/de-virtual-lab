import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  baseUrl: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = configService.baseUrl();
  }

  getNotifications(): Observable<any[]> {
    return this.http.get(this.baseUrl + '/notifications').map((res: any[]) => res);
  }

  getNotificationById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/notifications/' + id).map((res: any) => res);
  }

  updateNotificationById(notificationId: string, object: any) {
    return this.http.put(this.baseUrl + '/notifications/' + notificationId, object).map((res: any) => res);
  }

  createNewNotification(notification: any) {
    return this.http.post(this.baseUrl + '/notifications', notification).map((res: any) => res);
  }

  deleteNotificationById(notificationId: string) {
    return this.http.delete(this.baseUrl + '/notifications/' + notificationId).map((res: any) => res);
  }
}
