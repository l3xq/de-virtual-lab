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
    this.updateExam(1, {title: "asidhiasjjdsksj"});
  }

  fetchExams() {
    this.examService.getExams().subscribe((exams: any) => {
      this.exams = exams.data;
      console.log(this.exams);
    });
  }

  // delete after debug
  updateExam(id, object) {
    this.examService.updateExamById(id, object).subscribe((exams: any) => {
      this.exams = exams.data;
      console.log(this.exams);
    });
  }
}
