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

  constructor(private fb: FormBuilder,
    private examService: ExamService,
    private adminService: AdminService,
    private router: Router,
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
      this.lesson = lesson.data[0];
      this.form.patchValue(this.lesson);
    });
  }

  download() {
    const byteCharacters = atob(this.lesson.file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: this.lesson.mime });
    saveAs(file, this.lesson.name);
  }

  // Upload file
  uploadFile(event) { // called each time file input changes
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

  submit() {
    const lessonData = new Lesson(this.form.value);
    this.lesson.title = lessonData.title;
    this.lesson.exam_id = this.examId;
    if (this.lessonId !== 'new') {
      this.examService.updateLessonById(this.lessonId, this.lesson).subscribe(lesson => { });
    } else {
      this.examService.createNewLesson(this.lesson).subscribe(lesson => { });
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
