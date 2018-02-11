import { Component, OnInit } from '@angular/core';
import { Exam } from '../shared/exam.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../shared/exam.service';
import { saveAs } from 'file-saver';

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

  download(lesson: any) {
    const byteCharacters = atob(lesson.file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: lesson.mime });
    saveAs(file, lesson.name);
  }

  ngOnInit() {
  }

}
