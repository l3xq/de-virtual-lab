import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LabService {
  baseUrl: string;
  constructor(private http: HttpService) {
  }

  getLabs(): Observable<any[]> {
    return this.http.get('/labs');
  }

  getLabById(id: string): Observable<any> {
    return this.http.get('/labs/' + id);
  }

  updateLabById(labId: string, object: any) {
    return this.http.put('/labs/' + labId, object);
  }

  createNewLab(lab: any) {
    return this.http.post('/labs', lab);
  }

  deleteLabById(labId: string) {
    return this.http.delete('/labs/' + labId);
  }
}
