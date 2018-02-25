import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';

const MAX_VALUE = 10000;
const MIN_VALUE = 1;
const VARIABLE = 11;

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  showContent = false;

  constructor(private adminService: AdminService, private router: Router) {
      this.showContent = true;
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/admins']);
  }

  ngOnInit() {
  }

}
