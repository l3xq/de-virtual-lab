import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { ExamsComponent } from './exams/exams.component';
import { BackNotificationsComponent } from './back-notifications/back-notifications.component';
import { BackLabComponent } from './back-lab/back-lab.component';
import { EditComponent } from './exams/edit/edit.component';
import { LessonsComponent } from './exams/lessons/lessons.component';
import { ResultsComponent } from './exams/results/results.component';
import { EditLessonsComponent } from './exams/lessons/edit-lessons/edit-lessons.component';
import { EditResultsComponent } from './exams/results/edit-results/edit-results.component';
import { EditStudentsComponent } from './exams/results/edit-students/edit-students.component';
import { EditNotificationsComponent } from './back-notifications/edit-notifications/edit-notifications.component';
import { EditLabComponent } from './back-lab/edit-lab/edit-lab.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: 'admins',
    component: AdminComponent
  },
  {
    path: 'backoffice',
    component: BackofficeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-exams',
    component: ExamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-exams/:examId',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-exams-lessons/:examId',
    component: LessonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-exams-results/:examId',
    component: ResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-exams-lessons/:examId/:lessonId',
    component: EditLessonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-exams-periods/:examId/:periodId',
    component: EditResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-exams-periods-students/:examId/:periodId/:studentId',
    component: EditStudentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-notifications',
    component: BackNotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-notifications/:notificationId',
    component: EditNotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-labs',
    component: BackLabComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backoffice-labs/:labId',
    component: EditLabComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
