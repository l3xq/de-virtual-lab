import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../exams/shared/exam.service';
import { AdminService } from '../../shared/admin.service';
import { AlertsService } from '../../../notification/alerts.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  examId: string;
  periods: any[];
  students: any[];
  exam: any;
  showContent: boolean;

  constructor(private examService: ExamService,
    private adminService: AdminService,
    private router: Router,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.examId = params['examId'];
      this.fetchPeriods();
      this.fetchExam();
    });
  }

  fetchPeriods() {
    if (this.examId) {
      this.examService.getPeriodsByExamId(this.examId).subscribe((periods: any) => {
        this.periods = periods.data;
        this.periods.forEach(period => {
          this.examService.getStudentsByExamAndPeriod(this.examId, period.id).subscribe((students: any) => {
            period.students = students.data;
          });
        });
      });
      this.examService.getExamById(this.examId).subscribe(exam => {
        this.exam = exam.data[0];
      });
    }
    this.showContent = true;
  }

  fetchExam() {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam.data[0];
      this.showContent = true;
    });
  }

  ngOnInit() {
  }

  navigateToEditPeriod(itemId: string) {
    if (itemId) {
      this.router.navigate(['backoffice-exams-periods/', this.examId, itemId]);
    } else {
      this.router.navigate(['backoffice-exams-periods/', this.examId, 'new']);
    }
  }

  navigateToEditStudent(periodId, studentId) {
    this.router.navigate(['backoffice-exams-periods-students/', this.examId, periodId, studentId]);
  }

  deletePeriod(periodId: string) {
    this.showContent = false;
    setTimeout(() => {
      this.examService.deletePeriodById(periodId).subscribe(data => {
        this.alertsService.success('PERIOD_DELETED');
        this.fetchPeriods();
        this.showContent = true;
      });
    }, 1000);
  }

  deleteStudent(studentId: string) {
    this.showContent = false;
    setTimeout(() => {
      this.examService.deleteStudentById(studentId).subscribe(data => {
        this.alertsService.success('STUDENT_DELETED');
        this.fetchPeriods();
        this.showContent = true;
      });
    }, 1000);
  }

}


