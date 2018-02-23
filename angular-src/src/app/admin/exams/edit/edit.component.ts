import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ExamService } from '../../../exams/shared/exam.service';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();

  examId: string;
  showContent: boolean;
  exam: any;
  form: any;

  constructor(private fb: FormBuilder,
    private examService: ExamService,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      name: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {

      this.examId = params['examId'];

      this.showContent = true;
    });
  }

  ngOnInit() {
    if (this.examId !== 'new') {
      this.getExam();
    }
  }

  getExam() {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam.data[0];
      this.form.value['name'] = exam.title;
    });
  }

  submit() {
    const name = this.form.value['name'];
    const object = {
      title: name
    };
    if (this.examId !== 'new') {
      this.examService.updateExamById(this.examId, object).subscribe(exam => { });
    } else {
      this.examService.createNewExam(object).subscribe(exam => { });
    }
    this.onSubmit.emit();
    this.form.reset();
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(['/backoffice-exams']);
    }, 1000);
    this.showContent = false;
  }

}
