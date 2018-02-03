import { ExamComponent } from './exam/exam.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';
import { ExamLessonsComponent } from './exam-lessons/exam-lessons.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'exams',
    component: ExamComponent
  },
  {
    path: 'exam/results/:id',
    component: ExamResultsComponent
  },
  {
    path: 'exam/lessons/:id',
    component: ExamLessonsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
