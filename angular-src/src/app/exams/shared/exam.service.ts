import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from './exam.model';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExamService {
  baseUrl: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = configService.baseUrl();
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
    return this.http.delete(this.baseUrl + '/exams/' + examId).map((res: any) => res);
  }

  createNewExam(exam: any): Observable<any[]> {
    return this.http.post(this.baseUrl + '/exams', exam).map((res: any) => res);
  }

  updateExamById(examId: string, object: any): Observable<any[]> {
    return this.http.put(this.baseUrl + '/exams/' + examId, object).map((res: any) => res);
  }

  deleteLessonByExamAndId(lessonId: string) {
    return this.http.delete(this.baseUrl + '/lessons/' + lessonId).map((res: any) => res);
  }

  deletePeriodById(periodId: string) {
    return this.http.delete(this.baseUrl + '/periods/' + periodId).map((res: any) => res);
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
    return this.http.put(this.baseUrl + '/lessons/' + lessonId, object).map((res: any) => res);
  }

  createNewLesson(lesson: any) {
    return this.http.post(this.baseUrl + '/lessons', lesson).map((res: any) => res);
  }

  updateStudentById(studentId: string, object: any) {
    return this.http.put(this.baseUrl + '/students/' + studentId, object).map((res: any) => res);
  }

  createNewStudent(student: any) {
    return this.http.post(this.baseUrl + '/students', student).map((res: any) => res);
  }

  updatePeriodById(periodId: string, object: any) {
    return this.http.put(this.baseUrl + '/periods/' + periodId, object).map((res: any) => res);
  }

  createNewPeriod(period: any) {
    return this.http.post(this.baseUrl + '/periods', period).map((res: any) => res);
  }

  deleteStudentById(studentId: string) {
    return this.http.delete(this.baseUrl + '/students/' + studentId).map((res: any) => res);
  }
}
