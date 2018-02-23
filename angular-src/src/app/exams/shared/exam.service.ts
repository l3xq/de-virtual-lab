import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exam } from './exam.model';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExamService {
  baseUrl: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = configService.baseUrl();
  }

  getHeaders(token: any) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  }

  getExams(): Observable<Exam[]> {
    return this.http.get(this.baseUrl + '/exams').map((res: Exam[]) => res);
  }

  getExamById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/exams/' + id).map((res: any) => res);
  }

  getPeriodsByExamId(id): Observable<any[]> {
    return this.http.get(this.baseUrl + '/exams/' + id + '/periods').map((res: any) => res);
  }

  getStudentsByExamAndPeriod(examId: string, periodId: string): Observable<any[]> {
    return this.http.get(this.baseUrl + '/exams/' + examId + '/students_periodId=' + periodId).map((res: any) => res);
  }

  getLessonsByExamId(examId: string): Observable<any[]> {
    return this.http.get(this.baseUrl + '/exams/' + examId + '/lessons').map((res: any) => res);
  }

  deleteExamById(examId: string): Observable<any[]> {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.delete(this.baseUrl + '/exams/' + examId, headers).map((res: any) => res);
  }

  createNewExam(exam: any): Observable<any[]> {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.post(this.baseUrl + '/exams', exam, headers).map((res: any) => res);
  }

  updateExamById(examId: string, object: any): Observable<any[]> {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.put(this.baseUrl + '/exams/' + examId, object, headers).map((res: any) => res);
  }

  deleteLessonByExamAndId(lessonId: string) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.delete(this.baseUrl + '/lessons/' + lessonId, headers).map((res: any) => res);
  }

  deletePeriodById(periodId: string) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.delete(this.baseUrl + '/periods/' + periodId, headers).map((res: any) => res);
  }

  getLessonById(lessonId: string) {
    return this.http.get(this.baseUrl + '/lessons/' + lessonId).map((res: any) => res);
  }

  getPeriodById(periodId: string) {
    return this.http.get(this.baseUrl + '/periods/' + periodId).map((res: any) => res);
  }

  getStudentById(studentId: string) {
    return this.http.get(this.baseUrl + '/students/' + studentId).map((res: any) => res);
  }

  updateLessonById(lessonId: string, object: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.put(this.baseUrl + '/lessons/' + lessonId, object, headers).map((res: any) => res);
  }

  createNewLesson(lesson: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.post(this.baseUrl + '/lessons', lesson, headers).map((res: any) => res);
  }

  updateStudentById(studentId: string, object: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.put(this.baseUrl + '/students/' + studentId, object, headers).map((res: any) => res);
  }

  createNewStudent(student: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.post(this.baseUrl + '/students', student, headers).map((res: any) => res);
  }

  updatePeriodById(periodId: string, object: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.put(this.baseUrl + '/periods/' + periodId, object, headers).map((res: any) => res);
  }

  createNewPeriod(period: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.post(this.baseUrl + '/periods', period, headers).map((res: any) => res);
  }

  deleteStudentById(studentId: string) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.delete(this.baseUrl + '/students/' + studentId, headers).map((res: any) => res);
  }
}
