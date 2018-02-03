import { Component, OnInit } from '@angular/core';
import { Exam } from '../shared/exam.model';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  exams: Exam[];

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.fetchExams();
  }

  fetchExams() {
    this.examService.getExams().subscribe((exams: any) => {
      this.exams = exams.data;
      console.log(this.exams);
    });
  }
}
