import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notifications/shared/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin/shared/admin.service';
import { AlertsService } from '../../notification/alerts.service';

@Component({
  selector: 'app-back-notifications',
  templateUrl: './back-notifications.component.html',
  styleUrls: ['./back-notifications.component.scss']
})
export class BackNotificationsComponent implements OnInit {

  notifications: any[];
  selectedItem: any;
  today: number = Date.now();

  notificationId: any;
  showContent: boolean;

  constructor(private notificationService: NotificationService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertsService,
    private router: Router) {

    this.activatedRoute.params.subscribe(params => {

      this.notificationId = params['notificationId'];

      this.showContent = true;
      this.fetchNotifications();
    });
  }

  ngOnInit() {
  }

  selectNotification(item: any) {
    this.selectedItem = item;
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe((notifications: any) => {
      this.notifications = notifications.data;
      this.notifications.sort(function (a, b) {
        return b.time - a.time;
      });
      this.selectedItem = notifications.data[0];
    });
  }

  addNotification() {
    this.router.navigate(['backoffice-notifications/', 'new']);
  }

  editNotification(notificationId) {
    this.router.navigate(['backoffice-notifications/', notificationId]);
  }

  deleteNotification(notificationId: string) {
    this.showContent = false;
    setTimeout(() => {
      this.notificationService.deleteNotificationById(notificationId).subscribe(data => {
        this.alertService.success('NOTIFICATION_DELETED');
        this.fetchNotifications();
        this.showContent = true;
      });
    }, 1000);
  }

}
