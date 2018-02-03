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

  updateToken(token): Observable<any> {
    return this.http.put(this.baseUrl + '/authorization', { tokenId: token}).map((res: any) => res);
  }

  getToken(): Observable<any> {
    return this.http.get(this.baseUrl + '/authorization').map((res: any) => res);
  }

  getCredentials(): Observable<any> {
    return this.http.get(this.baseUrl + '/credentials').map((res: any) => res);
  }
}