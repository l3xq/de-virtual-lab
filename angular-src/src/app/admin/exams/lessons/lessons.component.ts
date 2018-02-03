import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../exams/shared/exam.service';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  tokenId: number;
  examId: string;
  showContent: boolean;
  exam: any;
  lessons: any[];

  constructor(private examService: ExamService, private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {

      this.tokenId = Number(params['id']);
      this.examId = params['examId'];

      this.adminService.getToken().subscribe(authObject => {
        if (!(this.tokenId && this.tokenId === authObject.tokenId)) {
          this.router.navigate(['/admins/']);
        } else {
          this.showContent = true;
        }
      });
      this.fetchLessons();
      this.fetchExam();
    });
  }

  fetchLessons(){
    this.examService.getLessonsByExamId(this.examId).subscribe(lessons => {
      this.lessons = lessons;
    });
  }

  fetchExam() {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam;
    });
  }

  navigateToEditLesson(itemId: string) {
    if (itemId)
      this.router.navigate(["backoffice/exams/lessons/", this.examId, this.tokenId, itemId]);
    else
      this.router.navigate(["backoffice/exams/lessons/", this.examId, this.tokenId, "new"]);
  }

  deleteLesson(lessonId: string) {
    this.showContent = false;
    setTimeout(() => {      
      this.examService.deleteLessonByExamAndId(lessonId).subscribe(data => { 
      this.fetchLessons();
      this.showContent = true;
      });      
    }, 1000); 
  }

  ngOnInit() {
  }
  

}
