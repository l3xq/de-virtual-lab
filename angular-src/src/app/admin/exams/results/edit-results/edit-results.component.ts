export class Period {
  id: number;
  title: string;
  name: string;
  file: string;
  size: number;
  mime: string;
  exam_id: string;

  constructor(period?: Partial<Period>) {
    Object.assign(this, period);
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
      this.periodId = params['periodId'];

      this.showContent = true;
    });
  }

  ngOnInit() {
    if (this.periodId !== 'new') {
      this.getPeriod();
    } else {
      this.period = {
        title: '',
        name: '',
        mime: '',
        exam_id: null,
        file: '',
        size: 0
      };
    }
  }

  getPeriod() {
    this.examService.getPeriodById(this.periodId).subscribe(period => {
      this.period = period.data;
      this.form.patchValue(this.period);
      this.examService.getStudentsByExamAndPeriod(this.examId, this.periodId).subscribe((students: any) => {
        this.students = students.data;
      });
    });
  }

  uploadFile(event) { // called each time file input changes
    this.fileChanged = true;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.period.name = file.name;
      this.period.mime = file.type;
      this.period.size = file.size;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (someEvent: any) => { // called once readAsDataURL is completed
        const fileBase64 = someEvent.target.result;
        this.period.file = fileBase64.substring(this.period.mime.length + 13);
      };
    }
  }

  removeFile() {
    if (confirm(this.translate.instant('REALLY_SURE_REMOVE', { text: this.period.name }))) {
      this.fileChanged = true;
      this.period.file = '';
      this.period.name = '';
      this.period.mime = '';
      this.period.size = 0;
    }
  }

  download() {
    if (this.periodId !== 'new') {
      this.examService.getFullPeriodById(this.periodId).subscribe(fullPeriod => {
        const byteCharacters = atob(fullPeriod.data[0].file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new Blob([byteArray], { type: fullPeriod.data[0].mime });
        saveAs(file, fullPeriod.data[0].name);
      });
    }
  }


  submit() {
    const periodData = new Period(this.form.value);
    this.period.title = periodData.title;
    this.period.exam_id = this.examId;
    if (this.periodId !== 'new') {

      if (!this.fileChanged) {
        this.examService.getFullPeriodById(this.periodId).subscribe((period: any) => {
          this.period.name = period.data[0].name;
          this.period.file = period.data[0].file;
          this.period.size = period.data[0].size;
          this.period.mime = period.data[0].mime;
          this.examService.updatePeriodById(this.periodId, this.period).subscribe(dataPeriod => {
            this.alertsService.success('PERIOD_UPDATED');
          });
        });
      } else {
        this.examService.updatePeriodById(this.periodId, this.period).subscribe(dataPeriod => {
          this.alertsService.success('PERIOD_UPDATED');
        });
      }
    } else {
      this.examService.createNewPeriod(this.period).subscribe(period => {
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

  deleteStudent(student: any) {
    if (confirm(this.translate.instant('REALLY_SURE_DELETE', { text: student.firstName + ' ' + student.lastName }))) {
      this.showContent = false;
      setTimeout(() => {
        this.examService.deleteStudentById(student.id).subscribe(data => {
          this.alertsService.success('STUDENT_DELETED');
          this.getPeriod();
          this.showContent = true;
        });
      }, 1000);
    }
  }

  navigateToEditStudent(periodId, studentId) {
    this.router.navigate(['backoffice-exams-periods-students/', this.examId, periodId, studentId]);
  }

}
