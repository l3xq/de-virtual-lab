import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {

  baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = configService.baseUrl();
  }

  isAuthenticated() {
    return localStorage.getItem('access_token');
  }

  authorization(credentials: any): Observable<any> {
    return this.http.post(this.baseUrl + '/authenticate', credentials);
  }

}
