import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationService } from './shared/notification.service';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [NotificationService],
  declarations: [NotificationComponent],
  exports: []
})
export class NotificationsModule { }
