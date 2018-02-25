import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  baseUrl: string;
  constructor(private http: HttpService) {
  }

  getNotifications(): Observable<any[]> {
    return this.http.get('/notifications');
  }

  getNotificationById(id: string): Observable<any> {
    return this.http.get('/notifications/' + id);
  }

  updateNotificationById(notificationId: string, object: any) {
    return this.http.put('/notifications/' + notificationId, object);
  }

  createNewNotification(notification: any) {
    return this.http.post('/notifications', notification);
  }

  deleteNotificationById(notificationId: string) {
    return this.http.delete('/notifications/' + notificationId);
  }
}
