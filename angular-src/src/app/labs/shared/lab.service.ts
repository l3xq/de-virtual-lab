import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LabService {
  baseUrl: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = configService.baseUrl();
  }

  getLabs(): Observable<any[]> {
    return this.http.get(this.baseUrl + '/labs').map((res: any[]) => res);
  }

  getLabById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/labs/' + id).map((res: any) => res);
  }

  updateLabById(labId: string, object: any) {
    return this.http.put(this.baseUrl + '/labs/' + labId, object).map((res: any) => res);
  }

  createNewLab(lab: any) {
    return this.http.post(this.baseUrl + '/labs', lab).map((res: any) => res);
  }

  deleteLabById(labId: string) {
    return this.http.delete(this.baseUrl + '/labs/' + labId).map((res: any) => res);
  }
}
