import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertsService } from '../notification/alerts.service';

@Injectable()
export class HttpService {
    baseUrl: string;
    // tslint:disable-next-line:max-line-length
    constructor(private http: HttpClient, private configService: ConfigService, private router: Router, private alertService: AlertsService) {
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

    get(path: string) {
        return this.http.get(this.baseUrl + path).map((res: any) => res).catch((error: any) =>
            Observable.throw(this.catchError(error) || '401 Unauthorized'));
    }

    put(path: string, object: any) {
        const headers: any = this.getHeaders(sessionStorage.getItem('access_token'));
        return this.http.put(this.baseUrl + path, object, headers).map((res: any) => res).catch((error: any) =>
        Observable.throw(this.catchError(error) || '401 Unauthorized'));
    }

    post(path: string, object: any) {
        const headers: any = this.getHeaders(sessionStorage.getItem('access_token'));
        return this.http.post(this.baseUrl + path, object, headers).map((res: any) => res);
    }

    delete(path: string) {
        const headers: any = this.getHeaders(sessionStorage.getItem('access_token'));
        return this.http.delete(this.baseUrl + path, headers).map((res: any) => res);
    }


    catchError(error: any) {
        if (error.status === 401 || error.status === 403) {
          sessionStorage.removeItem('access_token');
          this.router.navigate(['/backoffice']);
          this.alertService.error('UNAUTHORIZED');
        //   location.reload();
        }
        return error.error;
      }
}
