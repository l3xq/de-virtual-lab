import { Component, OnInit } from '@angular/core';
import { Exam } from '../shared/exam.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../shared/exam.service';
import { saveAs } from 'file-saver';

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
        this.examService.getPeriodsByExamId(this.examId).subscribe((periods: any) => {
          this.periods = periods.data;
          this.periods.forEach(period => {
            this.examService.getStudentsByExamAndPeriod(this.examId, period.id).subscribe((students: any) => {
              period.students = students.data;
            });
          });
        });
        this.examService.getExamById(this.examId).subscribe(exam => {
          this.exam = exam.data[0];
        });
      }
    });
  }

  download(period: any) {
    this.examService.getFullPeriodById(period.id).subscribe(fullPeriod => {
      const byteCharacters = atob(fullPeriod.data[0].file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: fullPeriod.data[0].mime });
      saveAs(file, fullPeriod.data[0].name);
    });
  }

  ngOnInit() {
  }

}
