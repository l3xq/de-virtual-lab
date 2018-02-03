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
    return this.http.get(this.baseUrl+ '/labs').map((res: any[]) => res);
  }
}