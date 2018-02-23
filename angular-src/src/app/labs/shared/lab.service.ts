import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LabService {
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

  getLabs(): Observable<any[]> {
    return this.http.get(this.baseUrl + '/labs').map((res: any[]) => res);
  }

  getLabById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/labs/' + id).map((res: any) => res);
  }

  updateLabById(labId: string, object: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.put(this.baseUrl + '/labs/' + labId, object, headers).map((res: any) => res);
  }

  createNewLab(lab: any) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.post(this.baseUrl + '/labs', lab, headers).map((res: any) => res);
  }

  deleteLabById(labId: string) {
    const headers: any = this.getHeaders(localStorage.getItem('access_token'));
    return this.http.delete(this.baseUrl + '/labs/' + labId, headers).map((res: any) => res);
  }
}
