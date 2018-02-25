import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Alert, NOTIFICATION_TYPE } from './alert.model';

@Injectable()
export class AlertsService {

  private notificationSubject = new BehaviorSubject<Alert>(null);
  public notifications = this.notificationSubject.asObservable();

  constructor() { }

  private notify(note: Alert) {
    this.notificationSubject.next(note);
  }

  success(message: string) {
    const note: Alert = {
      type: NOTIFICATION_TYPE.SUCCESS,
      message: message
    };

    this.notify(note);
  }


  warning(message: string) {
    const note: Alert = {
      type: NOTIFICATION_TYPE.WARNING,
      message: message
    };

    this.notify(note);
  }

  error(message: string) {
    const note: Alert = {
      type: NOTIFICATION_TYPE.ERROR,
      message: message
    };

    this.notify(note);
  }

}
