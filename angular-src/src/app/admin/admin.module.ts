import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './shared/admin.service';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AdminComponent } from './admin/admin.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { ExamsComponent } from './exams/exams.component';
import { ExamsModule } from '../exams/exams.module';
import { EditComponent } from './exams/edit/edit.component';
import { BackNotificationsComponent } from './back-notifications/back-notifications.component';
import { BackLabComponent } from './back-lab/back-lab.component';
import { LessonsComponent } from './exams/lessons/lessons.component';
import { ResultsComponent } from './exams/results/results.component';
import { EditResultsComponent } from './exams/results/edit-results/edit-results.component';
import { EditLessonsComponent } from './exams/lessons/edit-lessons/edit-lessons.component';
import { FilePickerModule } from 'angular-file-picker';
import { EditStudentsComponent } from './exams/results/edit-students/edit-students.component';
import { EditNotificationsComponent } from './back-notifications/edit-notifications/edit-notifications.component';
import { EditLabComponent } from './back-lab/edit-lab/edit-lab.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FilePickerModule,
    CoreModule,
    ExamsModule
  ],
  providers: [AdminService],
  declarations: [
    AdminComponent,
    BackofficeComponent,
    ExamsComponent,
    EditComponent,
    BackNotificationsComponent,
    BackLabComponent,
    LessonsComponent,
    ResultsComponent,
    EditResultsComponent,
    EditLessonsComponent,
    EditStudentsComponent,
    EditNotificationsComponent,
    EditLabComponent
  ],
  exports: [],

})
export class AdminModule { }
