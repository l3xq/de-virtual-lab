import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../exams/shared/exam.service';
import { AdminService } from '../../shared/admin.service';

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
  tokenId: number;
  showContent: boolean;

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
      this.fetchPeriods();
      this.fetchExam();
    });
  }

  fetchPeriods(){
      if (this.examId) {
        this.examService.getPeriodsByExamId(this.examId).subscribe(periods => {
          this.periods = periods;
          this.periods.forEach(period => {
            this.examService.getStudentsByExamAndPeriod(this.examId, period.id).subscribe(students => {
              period.students = students;
            });
          });
        });
        this.examService.getExamById(this.examId).subscribe(exam => {
          this.exam = exam;
        });
      }
  }

  fetchExam() {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam;
    });
  }

  ngOnInit() {
  }

  navigateToEditPeriod(itemId: string) {
    if (itemId)
      this.router.navigate(["backoffice/exams/periods/", this.examId, this.tokenId, itemId]);
    else
      this.router.navigate(["backoffice/exams/periods/", this.examId, this.tokenId, "new"]);
  }

  navigateToEditStudent(periodId, studentId) {
    this.router.navigate(['backoffice/exams/periods/students/',this.examId, this.tokenId, periodId, studentId]);
  }

  deletePeriod(periodId: string) {
    this.showContent = false;
    setTimeout(() => {      
      this.examService.deletePeriodById(periodId).subscribe(data => { 
      this.fetchPeriods();
      this.showContent = true;
      });      
    }, 1000); 
  }

  deleteStudent(studentId: string) {
    this.showContent = false;
    setTimeout(() => {      
      this.examService.deleteStudentById(studentId).subscribe(data => { 
      this.fetchPeriods();
      this.showContent = true;
      });      
    }, 1000); 
  }

}


