import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Exam } from './exam.model';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExamService {
  baseUrl: string;
  constructor(private http: HttpService) {
  }

  getExams(): Observable<Exam[]> {
    return this.http.get('/exams');
  }

  getExamById(id: string): Observable<any> {
    return this.http.get('/exams/' + id);
  }

  getPeriodsByExamId(id): Observable<any[]> {
    return this.http.get('/exams/' + id + '/periods');
  }

  getStudentsByExamAndPeriod(examId: string, periodId: string): Observable<any[]> {
    return this.http.get('/exams/' + examId + '/students_periodId=' + periodId);
  }

  getLessonsByExamId(examId: string): Observable<any[]> {
    return this.http.get('/exams/' + examId + '/lessons');
  }

  deleteExamById(examId: string): Observable<any[]> {
    return this.http.delete('/exams/' + examId);
  }

  createNewExam(exam: any): Observable<any[]> {
    return this.http.post('/exams', exam);
  }

  updateExamById(examId: string, object: any): Observable<any[]> {
    return this.http.put('/exams/' + examId, object);
  }

  deleteLessonByExamAndId(lessonId: string) {
    return this.http.delete('/lessons/' + lessonId);
  }

  deletePeriodById(periodId: string) {
    return this.http.delete('/periods/' + periodId);
  }

  getLessonById(lessonId: string) {
    return this.http.get('/lessons/' + lessonId);
  }

  getPeriodById(periodId: string) {
    return this.http.get('/periods/' + periodId);
  }

  getStudentById(studentId: string) {
    return this.http.get('/students/' + studentId);
  }

  updateLessonById(lessonId: string, object: any) {
    return this.http.put('/lessons/' + lessonId, object);
  }

  createNewLesson(lesson: any) {
    return this.http.post('/lessons', lesson);
  }

  updateStudentById(studentId: string, object: any) {
    return this.http.put('/students/' + studentId, object);
  }

  createNewStudent(student: any) {
    return this.http.post('/students', student);
  }

  updatePeriodById(periodId: string, object: any) {
    return this.http.put('/periods/' + periodId, object);
  }

  createNewPeriod(period: any) {
    return this.http.post('/periods', period);
  }

  deleteStudentById(studentId: string) {
    return this.http.delete('/students/' + studentId);
  }
}
