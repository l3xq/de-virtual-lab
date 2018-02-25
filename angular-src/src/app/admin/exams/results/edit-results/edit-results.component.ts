import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ExamService } from '../../../../exams/shared/exam.service';
import { AdminService } from '../../../shared/admin.service';
import { AlertsService } from '../../../../notification/alerts.service';

@Component({
  selector: 'app-edit-results',
  templateUrl: './edit-results.component.html',
  styleUrls: ['./edit-results.component.scss']
})
export class EditResultsComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<any>();
  examId: string;
  periodId: string;
  showContent: boolean;
  period: any;
  form: any;
  file: any;
  students: any;

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
      this.periodId = params['periodId'];

      this.showContent = true;
    });
  }

  ngOnInit() {
    if (this.periodId !== 'new') {
      this.getPeriod();
    }
  }

  getPeriod() {
    this.examService.getPeriodById(this.periodId).subscribe(period => {
      this.period = period.data[0];
      this.form.value['title'] = period.name;
      this.examService.getStudentsByExamAndPeriod(this.examId, this.periodId).subscribe((students: any) => {
        this.students = students.data;
      });
    });
  }

  submit() {
    const title = this.form.value['title'];
    const object = {
      name: title,
      exam_id: this.examId
    };
    if (this.periodId !== 'new') {
      this.examService.updatePeriodById(this.periodId, object).subscribe(period => {
        this.alertsService.success('PERIOD_UPDATED');
      });
    } else {
      this.examService.createNewPeriod(object).subscribe(period => {
        this.alertsService.success('PERIOD_CREATED');
      });
    }
    this.onSubmit.emit();
    this.form.reset();
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(['/backoffice-exams-results', this.examId]);
    }, 1000);
    this.showContent = false;
  }

  deleteStudent(studentId: string) {
    this.showContent = false;
    setTimeout(() => {
      this.examService.deleteStudentById(studentId).subscribe(data => {
        this.alertsService.success('STUDENT_DELETED');
        this.getPeriod();
        this.showContent = true;
      });
    }, 1000);
  }

  navigateToEditStudent(periodId, studentId) {
    this.router.navigate(['backoffice-exams-periods-students/', this.examId, periodId, studentId]);
  }

}
