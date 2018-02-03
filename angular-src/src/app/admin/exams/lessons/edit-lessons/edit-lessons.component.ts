import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ExamService } from '../../../../exams/shared/exam.service';
import { AdminService } from '../../../shared/admin.service';

declare var $ :any;

@Component({
  selector: 'app-edit-lessons',
  templateUrl: './edit-lessons.component.html',
  styleUrls: ['./edit-lessons.component.scss']
})
export class EditLessonsComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();

  tokenId: number;
  examId: string;
  lessonId: string;
  showContent: boolean;
  lesson: any;
  form: any;
  file: any;

  constructor(private fb: FormBuilder, private examService: ExamService, private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      title: ['', Validators.required],
      path: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {

      this.tokenId = Number(params['id']);
      this.examId = params['examId'];
      this.lessonId = params['lessonId'];

      this.adminService.getToken().subscribe(authObject => {
        if (!(this.tokenId && this.tokenId === authObject.tokenId)) {
          this.router.navigate(['/admins/']);
        } else {
          this.showContent = true;
        }
      });
    });
  }

  ngOnInit() {
    if (this.lessonId != 'new') {
      this.getLesson();
    }
  }

  getLesson() {
    this.examService.getLessonById(this.lessonId).subscribe(lesson => {
      this.lesson = lesson;
      this.form.value['title'] = lesson.title;
    });
  }

  submit() {
    const title = this.form.value['title'];
    const path = "";
    $('input[type=file]').change(function () {
      // const path = this.files[0].mozFullPath;
      // console.log(this.files[0].mozFullPath);
  });
    let object = {
      title: title,
      path: path,
      examId: this.examId
    }
    if (this.lessonId != 'new') {
      this.examService.updateLessonById(this.lessonId, object).subscribe(lesson => { });
    } else {
      this.examService.createNewLesson(object).subscribe(lesson => { });
    }
    this.onSubmit.emit();
    this.form.reset();
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(['/backoffice/exams/lessons',this.examId, this.tokenId]);
    }, 1000);
    this.showContent = false;
  }

}
