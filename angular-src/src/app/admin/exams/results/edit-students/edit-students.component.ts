export class Student {
  id: Number;
  firstName: String;
  lastname: Number;
  index: String;
  mark: String;
  unit: String;
  examId: String;
  periodId: String;

  constructor(student?: Partial<Student>) {
    Object.assign(this, student);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ExamService } from '../../../../exams/shared/exam.service';
import { AdminService } from '../../../shared/admin.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss']
})
export class EditStudentsComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<any>();

  tokenId: number;
  examId: string;
  periodId: string;
  showContent: boolean;
  student: any;
  form: any;
  studentId: any;

  constructor(private fb: FormBuilder, private examService: ExamService, private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      index: ['', Validators.required],
      mark: ['', Validators.required],
      unit: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe(params => {

      this.tokenId = Number(params['id']);
      this.examId = params['examId'];
      this.periodId = params['periodId'];
      this.studentId = params['studentId'];

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
    if (this.studentId != 'new') {
      this.getStudent();
    }
  }

  getStudent() {
    this.examService.getStudentById(this.studentId).subscribe(student => {
      this.student = student;
      this.form.patchValue(this.student);
    });
  }

  submit() {
    const studentData = new Student(this.form.value);
    studentData.examId = this.examId;
    studentData.periodId = this.periodId;
   
    if (this.studentId != 'new') {
      this.examService.updateStudentById(this.studentId, studentData).subscribe(student => { });
    } else {
      this.examService.createNewStudent(studentData).subscribe(student => { });
    }
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(["backoffice/exams/results/", this.examId, this.tokenId]);
    }, 1000);
    this.showContent = false;
  }
}
