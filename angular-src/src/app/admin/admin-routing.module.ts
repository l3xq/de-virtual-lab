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

const routes: Routes = [
  {
    path: 'admins',
    component: AdminComponent
  },
  {
    path: 'backoffice',
    component: AdminComponent
  },
  {
    path: 'backoffice/:id',
    component: BackofficeComponent
  },
  {
    path: 'backoffice/exams/:id',
    component: ExamsComponent
  },
  {
    path: 'backoffice/exams/:examId/:id',
    component: EditComponent
  },
  {
    path: 'backoffice/exams/lessons/:examId/:id',
    component: LessonsComponent
  },
  {
    path: 'backoffice/exams/results/:examId/:id',
    component: ResultsComponent
  },
  {
    path: 'backoffice/exams/lessons/:examId/:id/:lessonId',
    component: EditLessonsComponent
  },
  {
    path: 'backoffice/exams/periods/:examId/:id/:periodId',
    component: EditResultsComponent
  },
  {
    path: 'backoffice/exams/periods/students/:examId/:id/:periodId/:studentId',
    component: EditStudentsComponent
  },
  {
    path: 'backoffice/notifications/:id',
    component: BackNotificationsComponent
  },
  {
    path: 'backoffice/notifications/:id/:notificationId',
    component: EditNotificationsComponent
  },
  {
    path: 'backoffice/labs/:id',
    component: BackLabComponent
  },
  {
    path: 'backoffice/labs/:id/:labId',
    component: EditLabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
