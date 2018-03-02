export class Lesson {
  id: number;
  title: string;
  name: string;
  file: string;
  size: number;
  mime: string;
  exam_id: string;

  constructor(lesson?: Partial<Lesson>) {
    Object.assign(this, lesson);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ExamService } from '../../../../exams/shared/exam.service';
import { AdminService } from '../../../shared/admin.service';
import { AlertsService } from '../../../../notification/alerts.service';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-edit-lessons',
  templateUrl: './edit-lessons.component.html',
  styleUrls: ['./edit-lessons.component.scss']
})
export class EditLessonsComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();

  examId: string;
  lessonId: string;
  showContent: boolean;
  lesson: any;
  form: any;
  file: any;
  fileChanged = false;

  constructor(private fb: FormBuilder,
    private examService: ExamService,
    private adminService: AdminService,
    private router: Router,
    private alertsService: AlertsService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      title: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {

      this.examId = params['examId'];
      this.lessonId = params['lessonId'];

      this.showContent = true;
    });
  }

  ngOnInit() {
    if (this.lessonId !== 'new') {
      this.getLesson();
    } else {
      this.lesson = {
        title: '',
        name: '',
        file: '',
        size: null,
        mime: '',
        exam_id: null
      };
    }
  }

  getLesson() {
    this.examService.getLessonById(this.lessonId).subscribe(lesson => {
      this.lesson = lesson.data;
      this.form.patchValue(this.lesson);
    });
  }

  download() {
    if (this.lessonId !== 'new') {
      this.examService.getFullLessonById(this.lessonId).subscribe(fullLesson => {
        const byteCharacters = atob(fullLesson.data[0].file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new Blob([byteArray], { type: fullLesson.data[0].mime });
        saveAs(file, fullLesson.data[0].name);
      });
    }
  }

  // Upload file
  uploadFile(event) { // called each time file input changes
    this.fileChanged = true;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.lesson.name = file.name;
      this.lesson.mime = file.type;
      this.lesson.size = file.size;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (someEvent: any) => { // called once readAsDataURL is completed
        const fileBase64 = someEvent.target.result;
        this.lesson.file = fileBase64.substring(this.lesson.mime.length + 13);
      };
    }
  }

  removeFile() {
    if (confirm(this.translate.instant('REALLY_SURE_REMOVE', { text: this.lesson.name }))) {
      this.fileChanged = true;
      this.lesson.file = '';
      this.lesson.name = '';
      this.lesson.mime = '';
      this.lesson.size = 0;
    }
  }

  submit() {
    const lessonData = new Lesson(this.form.value);
    this.lesson.title = lessonData.title;
    this.lesson.exam_id = this.examId;
    if (this.lessonId !== 'new') {
      if (!this.fileChanged) {
        this.examService.getFullLessonById(this.lessonId).subscribe((lesson: any) => {
          this.lesson.name = lesson.data[0].name;
          this.lesson.file = lesson.data[0].file;
          this.lesson.size = lesson.data[0].size;
          this.lesson.mime = lesson.data[0].mime;
          this.examService.updateLessonById(this.lessonId, this.lesson).subscribe(data => {
            this.alertsService.success('LESSON_UPDATED');
          });
        });
      } else {
        this.examService.updateLessonById(this.lessonId, this.lesson).subscribe(data => {
          this.alertsService.success('LESSON_UPDATED');
        });
      }

    } else {
      this.examService.createNewLesson(this.lesson).subscribe(lesson => {
        this.alertsService.success('LESSON_CREATED');
      });
    }
    this.onSubmit.emit();
    this.form.reset();
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(['/backoffice-exams-lessons', this.examId]);
    }, 1000);
    this.showContent = false;
  }

}
