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
  
  token = Date.now();

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  doLogIn() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value['username'];
      const password = this.loginForm.value['password'];
      this.adminService.getCredentials().subscribe(credentials => {
        if (username === credentials.data[0].username && password === credentials.data[0].password) {
          this.adminService.updateToken(this.token).subscribe(data => {
            this.router.navigate(['/backoffice/', this.token ]); 
            // this.onLogin.emit();
            // this.loginForm.reset();
            this.showValidationErrors = false;
          });
                   
        }
        else {
          this.showValidationErrors = true;
        }
      });
    } else {
      this.showValidationErrors = true;
    }
  }
}
