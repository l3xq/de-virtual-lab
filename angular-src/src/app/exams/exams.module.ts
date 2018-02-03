import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsRoutingModule } from './exams-routing.module';
import { ExamComponent } from './exam/exam.component';
import { ExamService } from './shared/exam.service';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AccordionModule } from 'ngx-bootstrap';
import { ExamResultsComponent } from './exam-results/exam-results.component';
import { ExamLessonsComponent } from './exam-lessons/exam-lessons.component';

@NgModule({
  imports: [
    CommonModule,
    ExamsRoutingModule,
    SharedModule,
    CoreModule,
    AccordionModule.forRoot()
  ],
  providers: [ ExamService ],
  declarations: [ExamComponent, ExamResultsComponent, ExamLessonsComponent],
  exports: [AccordionModule]
})
export class ExamsModule { }
