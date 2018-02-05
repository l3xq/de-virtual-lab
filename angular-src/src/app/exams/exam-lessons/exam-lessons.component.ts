import { Component, OnInit } from '@angular/core';
import { Exam } from '../shared/exam.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-exam-lessons',
  templateUrl: './exam-lessons.component.html',
  styleUrls: ['./exam-lessons.component.scss']
})
export class ExamLessonsComponent implements OnInit {

  private id: any;
  private exam: any;
  private lessons: any[];

  constructor(private examService: ExamService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.examService.getLessonsByExamId(this.id).subscribe((lessons: any) => {
          this.lessons = lessons.data;
        });
      }
    });
    this.examService.getExamById(this.id).subscribe(exam => {
      this.exam = exam.data[0];
    });
  }

  ngOnInit() {
  }

}
