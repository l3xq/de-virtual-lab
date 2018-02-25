import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { AdminService } from '../shared/admin.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Output() onLogin = new EventEmitter<any>();
  loginForm: FormGroup;
  showValidationErrors = false;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.adminService.isAuthenticated()) {
      this.router.navigate(['/backoffice']);
    }
  }

  doLogIn() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value['username'];
      const password = this.loginForm.value['password'];
      this.adminService.authorization({ email: username, password: password }).subscribe((token: any) => {
        sessionStorage.setItem('access_token', token.token);
        this.router.navigate(['/backoffice']);
        this.showValidationErrors = false;
      });
    } else {
      this.showValidationErrors = true;
    }
  }
}
