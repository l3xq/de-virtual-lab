import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {

  baseUrl: string;

  constructor(private http: HttpService, private configService: ConfigService) {
    this.baseUrl = configService.baseUrl();
  }

  isAuthenticated() {
    return sessionStorage.getItem('access_token');
  }

  authorization(credentials: any): Observable<any> {
    return this.http.post('/authenticate', credentials);
  }

}
