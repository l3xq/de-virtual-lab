import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from '../admin/shared/admin.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private adminService: AdminService
    ) { }

    canActivate() {
        if (this.adminService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/admins']);
        return false;
    }
}
