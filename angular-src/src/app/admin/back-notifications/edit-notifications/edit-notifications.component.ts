export class Notification {
  id: Number;
  title: String;
  text: String;
  time: Number;

  constructor(notification?: Partial<Notification>) {
    Object.assign(this, notification);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { NotificationService } from '../../../notifications/shared/notification.service';
import { AdminService } from '../../shared/admin.service';


@Component({
  selector: 'app-edit-notifications',
  templateUrl: './edit-notifications.component.html',
  styleUrls: ['./edit-notifications.component.scss']
})
export class EditNotificationsComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<any>();

  notificationId: string;
  showContent: boolean;
  notification: any;
  form: any;

  constructor(private fb: FormBuilder,
    private notificationsService: NotificationService,
    private adminService: AdminService, private router:
      Router, private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {

      this.notificationId = params['notificationId'];

      this.showContent = true;
    });
  }

  ngOnInit() {
    if (this.notificationId !== 'new') {
      this.getNotification();
    }
  }

  getNotification() {
    this.notificationsService.getNotificationById(this.notificationId).subscribe(notification => {
      this.notification = notification.data[0];
      this.form.patchValue(this.notification);
    });
  }

  submit() {
    const notificationData = new Notification(this.form.value);
    notificationData.time = Date.now();

    if (this.notificationId !== 'new') {
      this.notificationsService.updateNotificationById(this.notificationId, notificationData).subscribe(notification => { });
    } else {
      this.notificationsService.createNewNotification(notificationData).subscribe(notification => { });
    }
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(['/backoffice-notifications']);
    }, 1000);
    this.showContent = false;
  }

}
