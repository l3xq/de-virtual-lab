import { Component, OnInit } from '@angular/core';
import { Alert, NOTIFICATION_TYPE } from './alert.model';
import { AlertsService } from './alerts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {


  notification: Alert;
  notificationType = NOTIFICATION_TYPE;
  toHide = false;

  constructor(private notificationService: AlertsService) {
  }

  ngOnInit() {
    this.notification = {
      type: NOTIFICATION_TYPE.ERROR,
      message: 'Success'
    };

    this.notificationService.notifications.subscribe(notification => {
      this.toHide = false;
      this.notification = notification;
      setTimeout(() => {
        this.toHide = true;
      }, 3000);
    });

  }

}
