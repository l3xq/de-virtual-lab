import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notifications/shared/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin/shared/admin.service';

@Component({
  selector: 'app-back-notifications',
  templateUrl: './back-notifications.component.html',
  styleUrls: ['./back-notifications.component.scss']
})
export class BackNotificationsComponent implements OnInit {

  notifications: any[];
  selectedItem: any;
  today: number = Date.now();

  tokenId: any;
  notificationId: any;
  showContent: boolean;

  constructor(private notificationService: NotificationService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.activatedRoute.params.subscribe(params => {

      this.tokenId = Number(params['id']);
      this.notificationId = params['notificationId'];

      this.adminService.getToken().subscribe(authObject => {
        // tslint:disable-next-line:triple-equals
        if (!(this.tokenId && this.tokenId == authObject.data[0].token_id)) {
          this.router.navigate(['/admins/']);
        } else {
          this.showContent = true;
        }
      });
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
    this.router.navigate(['backoffice/notifications/', this.tokenId, 'new']);
  }

  editNotification(notificationId) {
    this.router.navigate(['backoffice/notifications/', this.tokenId, notificationId]);
  }

  deleteNotification(notificationId: string) {
    this.showContent = false;
    setTimeout(() => {
      this.notificationService.deleteNotificationById(notificationId).subscribe(data => {
        this.fetchNotifications();
        this.showContent = true;
      });
    }, 1000);
  }

}
