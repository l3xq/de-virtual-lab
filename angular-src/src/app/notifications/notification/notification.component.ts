import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: any[];
  selectedItem: any;
  today: number = Date.now();

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  selectNotification(item: any) {
    this.selectedItem = item;
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe((notifications: any) => {
      console.log(notifications.data);
      this.selectedItem = notifications[0];
    });
  }

}
