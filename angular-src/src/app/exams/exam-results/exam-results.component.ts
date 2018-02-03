import { Component, OnInit } from '@angular/core';
import { Exam } from '../shared/exam.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.scss']
})
export class ExamResultsComponent implements OnInit {

  examId: string;
  periods: any[];
  students: any[];
  exam: any;

  constructor(private examService: ExamService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.examId = params['id'];
      if (this.examId) {
        this.examService.getPeriodsByExamId(this.examId).subscribe(periods => {
          this.periods = periods;
          this.periods.forEach(period => {
            this.examService.getStudentsByExamAndPeriod(this.examId, period.id).subscribe(students => {
              period.students = students;
            });
          });
        });
        this.examService.getExamById(this.examId).subscribe(exam => {
          this.exam = exam;
        });
      }
    });
  }

  ngOnInit() {
  }

}
