export class Exam {
  id: Number;
  name: string;

  constructor(exam?: Partial<Exam>) {
    Object.assign(this, exam);
  }
}
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ExamService } from '../../../exams/shared/exam.service';
import { AdminService } from '../../shared/admin.service';
import { AlertsService } from '../../../notification/alerts.service';

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
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      title: ['', Validators.required]
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
      this.form.patchValue(this.exam);
    });
  }

  submit() {
    const examData = new Exam(this.form.value);
    if (this.examId !== 'new') {
      this.examService.updateExamById(this.examId, examData).subscribe(exam => {
        this.alertsService.success('EXAM_UPDATED');
      });
    } else {
      this.examService.createNewExam(examData).subscribe(exam => {
        this.alertsService.success('EXAM_CREATED');
      });
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
